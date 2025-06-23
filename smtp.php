<?php
// filepath: /opt/lampp/htdocs/email/includes/verify_smtp.php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");


$servername = "174.141.233.174";
$username = "email_id";
$password = "55y60jgW*";
$database = "email_id";


$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}
echo "✅ Connected successfully to remote DB!";



// Configuration
define('BATCH_SIZE', 100);

// --- DOMAIN VERIFICATION ---

function getDomainIP($domain) {
    if (getmxrr($domain, $mxhosts)) {
        $mxIp = @gethostbyname($mxhosts[0]);
        if ($mxIp !== $mxhosts[0]) {
            return $mxIp;
        }
    }
    $aRecord = @gethostbyname($domain);
    return ($aRecord !== $domain) ? $aRecord : false;
}

function processDomains($conn) {
    $processed = 0;
    $domains = $conn->query("SELECT id, sp_domain FROM emails WHERE domain_verified = 0 LIMIT " . BATCH_SIZE);
    
    while ($row = $domains->fetch_assoc()) {
        $domain = $row['sp_domain'];
        $ip = false;
        
        if (filter_var($domain, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME)) {
            $ip = getDomainIP($domain);
        }
        
        $status = $ip ? 1 : 0;
        $response = $ip ?: "Not valid domain";
        
        $update = $conn->prepare("UPDATE emails SET 
                     domain_verified = 1,
                     domain_status = ?,
                     validation_response = ?
                     WHERE id = ?");
        $update->bind_param("isi", $status, $response, $row['id']);
        $update->execute();
        $update->close();
        
        $processed++;
        
        // Small delay to prevent overloading
        usleep(100000); // 0.1 second
    }
    
    return $processed;
}

// --- SMTP VERIFICATION ---

function verifyEmailViaSMTP($email, $domain) {
    if (!getmxrr($domain, $mxhosts)) {
        return ["status" => "error", "message" => "No MX record found"];
    }
    
    $mxIP = gethostbyname($mxhosts[0]);
    $port = 25;
    $timeout = 30;
    
    $smtp = @stream_socket_client(
        "tcp://$mxIP:$port",
        $errno,
        $errstr,
        $timeout
    );
    
    if (!$smtp) {
        return ["status" => "error", "message" => "Connection failed: $errstr"];
    }
    
    stream_set_timeout($smtp, $timeout);
    $response = fgets($smtp, 4096);
    
    if (substr($response, 0, 3) != "220") {
        fclose($smtp);
        return ["status" => "error", "message" => "SMTP server not ready"];
    }
    
    fputs($smtp, "EHLO server.relyon.co.in\r\n");
    while ($line = fgets($smtp, 4096)) {
        if (substr($line, 3, 1) == " ") break;
    }
    
    fputs($smtp, "MAIL FROM:<info@relyon.co.in>\r\n");
    fgets($smtp, 4096);
    
    fputs($smtp, "RCPT TO:<$email>\r\n");
    $response = fgets($smtp, 4096);
    $result = (substr($response, 0, 3) == "250") ? 1 : 0;
    
    fputs($smtp, "QUIT\r\n");
    fclose($smtp);
    
    if ($result === 1) {
        return ["status" => "success", "result" => 1, "message" => $mxIP];
    } else {
        return ["status" => "success", "result" => 0, "message" => "Invalid response"];
    }
}

function processSmtp($conn) {
    $processed = 0;
    $emails = $conn->query("SELECT id, raw_emailid, sp_domain FROM emails WHERE domain_status=1 AND domain_processed=0 LIMIT " . BATCH_SIZE);
    
    while ($row = $emails->fetch_assoc()) {
        $email = $row['raw_emailid'];
        $domain = $row['sp_domain'];
        $verification = verifyEmailViaSMTP($email, $domain);
        
        if ($verification['status'] === 'success') {
            $status = $verification['result'];
            $message = $conn->real_escape_string($verification['message']);
        } else {
            $status = 0;
            $message = "Verification failed";
        }
        
        $update = $conn->prepare("UPDATE emails SET 
                     domain_status = ?,
                     validation_response = ?,
                     domain_processed = 1
                     WHERE id = ?");
        $update->bind_param("isi", $status, $message, $row['id']);
        $update->execute();
        $update->close();
        
        $processed++;
        
        // Small delay to prevent overloading
        usleep(200000); // 0.2 second for SMTP as it's more resource intensive
    }
    
    return $processed;
}

// --- UPDATE CSV LIST COUNTS ---
function updateCsvListCounts($conn) {
    $result = $conn->query("
        SELECT DISTINCT c.id
        FROM csv_list c
        JOIN emails e ON c.id = e.csv_list_id
    ");
    
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $campaignId = $row['id'];
            $stmt = $conn->prepare("
                SELECT 
                    COUNT(*) AS total_emails,
                    SUM(domain_status = 1) AS valid_count,
                    SUM(domain_status = 0) AS invalid_count
                FROM emails
                WHERE csv_list_id = ?
            ");
            $stmt->bind_param("i", $campaignId);
            $stmt->execute();
            $stmt->bind_result($total, $valid, $invalid);
            $stmt->fetch();
            $stmt->close();
            
            $valid = $valid ?? 0;
            $invalid = $invalid ?? 0;
            $total = $total ?? 0;
            
            $updateStmt = $conn->prepare("
                UPDATE csv_list 
                SET total_emails = ?, valid_count = ?, invalid_count = ?
                WHERE id = ?
            ");
            $updateStmt->bind_param("iiii", $total, $valid, $invalid, $campaignId);
            $updateStmt->execute();
            $updateStmt->close();
        }
    }
}

// --- MAIN EXECUTION ---
try {
    // 1. DOMAIN VERIFICATION
    $start = microtime(true);
    $domainProcessed = processDomains($conn);
    $domainTime = microtime(true) - $start;

    // 2. SMTP VERIFICATION (only if all domains are verified)
    $remainingDomains = $conn->query("SELECT COUNT(*) FROM emails WHERE domain_verified = 0")->fetch_row()[0];
    $smtpProcessed = 0;
    $smtpTime = 0;
    
    if ($remainingDomains == 0) {
        $startSmtp = microtime(true);
        $smtpProcessed = processSmtp($conn);
        $smtpTime = microtime(true) - $startSmtp;
    }

    // 3. UPDATE COUNTS
    updateCsvListCounts($conn);

    // 4. Set all running csv_list to completed after SMTP verification
    $conn->query("UPDATE csv_list SET status = 'completed' WHERE status = 'running'");

    // 5. RESPONSE
    $totalResult = $conn->query("SELECT COUNT(*) as total FROM emails");
    $total = $totalResult->fetch_assoc()['total'];

    echo json_encode([
        "status" => "success",
        "domain_processed" => $domainProcessed,
        "smtp_processed" => $smtpProcessed,
        "total" => $total,
        "domain_time_seconds" => round($domainTime, 2),
        "smtp_time_seconds" => round($smtpTime, 2)
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}

$conn->close();
?>