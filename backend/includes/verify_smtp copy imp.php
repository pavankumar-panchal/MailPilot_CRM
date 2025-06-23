<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
set_time_limit(0);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

// Database configuration
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "CRM";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Configuration
define('MAX_WORKERS', 100); // Adjust for your server
define('EMAILS_PER_WORKER', 1000);
define('WORKER_SCRIPT', __DIR__ . '/smtp_worker.php');
define('LOG_FILE', __DIR__ . '/../storage/smtp_parallel.log'); // Make sure this directory exists

set_time_limit(0);
ini_set('memory_limit', '512M');

// Create worker script if not exists
if (!file_exists(WORKER_SCRIPT)) {
    $worker_code = <<<'EOC'
<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "CRM";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");
if ($conn->connect_error) exit(1);

$start_id = $argv[1] ?? 0;
$end_id = $argv[2] ?? 0;

$query = "SELECT id, raw_emailid, sp_domain FROM emails WHERE id BETWEEN $start_id AND $end_id AND domain_status=1 AND domain_processed=0";
$result = $conn->query($query);

function log_worker($msg, $id_range = '') {
    $logfile = __DIR__ . "/../storage/smtp_worker.log";
    $ts = date('Y-m-d H:i:s');
    file_put_contents($logfile, "[$ts][$id_range] $msg\n", FILE_APPEND);
}

function verifyEmailViaSMTP($email, $domain) {
    $ip = false;
    $mxHost = null;

    // Try MX record first
    if (getmxrr($domain, $mxhosts) && !empty($mxhosts)) {
        $mxIp = @gethostbyname($mxhosts[0]);
        if ($mxIp !== $mxhosts[0] && filter_var($mxIp, FILTER_VALIDATE_IP)) {
            $ip = $mxIp;
            $mxHost = $mxhosts[0];
        }
    }

    // Fallback to A record if no MX
    if (!$ip) {
        $aRecord = @gethostbyname($domain);
        if ($aRecord !== $domain && filter_var($aRecord, FILTER_VALIDATE_IP)) {
            $ip = $aRecord;
            $mxHost = $domain;
        }
    }

    if (!$ip) {
        return [
            "status" => "invalid",
            "result" => 0,
            "response" => "No valid MX or A record found",
            "domain_status" => 0,
            "validation_status" => "invalid",
            "validation_response" => "No valid MX or A record found"
        ];
    }

    // SMTP check
    $port = 25;
    $timeout = 15;
    $smtp = @stream_socket_client("tcp://$ip:$port", $errno, $errstr, $timeout);
    if (!$smtp) {
        return [
            "status" => "invalid",
            "result" => 0,
            "response" => "Connection failed: $errstr",
            "domain_status" => 0,
            "validation_status" => "invalid",
            "validation_response" => "Connection failed: $errstr"
        ];
    }
    stream_set_timeout($smtp, $timeout);
    $response = fgets($smtp, 4096);
    if ($response === false || substr($response, 0, 3) != "220") {
        fclose($smtp);
        return [
            "status" => "invalid",
            "result" => 0,
            "response" => "SMTP server not ready or no response",
            "domain_status" => 0,
            "validation_status" => "invalid",
            "validation_response" => "SMTP server not ready or no response"
        ];
    }
    fputs($smtp, "EHLO server.relyon.co.in\r\n");
    $ehlo_ok = false;
    while ($line = fgets($smtp, 4096)) {
        if (substr($line, 3, 1) == " ") {
            $ehlo_ok = true;
            break;
        }
    }
    if (!$ehlo_ok) {
        fclose($smtp);
        return [
            "status" => "invalid",
            "result" => 0,
            "response" => "EHLO failed",
            "domain_status" => 0,
            "validation_status" => "invalid",
            "validation_response" => "EHLO failed"
        ];
    }
    fputs($smtp, "MAIL FROM:<info@relyon.co.in>\r\n");
    $mailfrom_resp = fgets($smtp, 4096);
    if ($mailfrom_resp === false) {
        fclose($smtp);
        return [
            "status" => "invalid",
            "result" => 0,
            "response" => "MAIL FROM failed",
            "domain_status" => 0,
            "validation_status" => "invalid",
            "validation_response" => "MAIL FROM failed"
        ];
    }
    fputs($smtp, "RCPT TO:<$email>\r\n");
    $rcpt_resp = fgets($smtp, 4096);
    $responseCode = $rcpt_resp !== false ? substr($rcpt_resp, 0, 3) : null;
    fputs($smtp, "QUIT\r\n");
    fclose($smtp);

    if ($responseCode == "250" || $responseCode == "251") {
        return [
            "status" => "valid",
            "result" => 1,
            "response" => $ip,
            "domain_status" => 1,
            "validation_status" => "valid",
            "validation_response" => $ip
        ];
    } elseif (in_array($responseCode, ["450", "451", "452"])) {
        return [
            "status" => "retryable",
            "result" => 2,
            "response" => $rcpt_resp,
            "domain_status" => 2,
            "validation_status" => "retryable",
            "validation_response" => $rcpt_resp
        ];
    } else {
        return [
            "status" => "invalid",
            "result" => 0,
            "response" => $rcpt_resp,
            "domain_status" => 0,
            "validation_status" => "invalid",
            "validation_response" => $rcpt_resp
        ];
    }
}

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $email = $row["raw_emailid"];
        $domain = $row["sp_domain"];
        $email_id = $row["id"];
        $verify = verifyEmailViaSMTP($email, $domain);

        // --- Sanitize validation_response for utf8mb4 ---
        if (isset($verify['validation_response'])) {
            // Convert to UTF-8, remove invalid bytes
            $verify['validation_response'] = mb_convert_encoding($verify['validation_response'], 'UTF-8', 'UTF-8');
            // Optionally, truncate to 1000 chars if you want to limit size
            $verify['validation_response'] = mb_substr($verify['validation_response'], 0, 1000, 'UTF-8');
        }

        $update = $conn->prepare("UPDATE emails SET 
            domain_status = ?, 
            domain_processed = 1, 
            validation_status = ?, 
            validation_response = ? 
            WHERE id = ?");
        if ($update) {
            $update->bind_param(
                "issi",
                $verify['domain_status'],
                $verify['validation_status'],
                $verify['validation_response'],
                $email_id
            );
            $update->execute();
            $update->close();
        }

        log_worker("Processed $email_id ($email): {$verify['status']} - {$verify['response']}", "$start_id-$end_id");
    }
} else {
    log_worker("Query failed: " . $conn->error, "$start_id-$end_id");
}
$conn->close();
EOC;
    file_put_contents(WORKER_SCRIPT, $worker_code);
}

// --- Logging ---
function write_log($msg)
{
    $ts = date('Y-m-d H:i:s');
    file_put_contents(LOG_FILE, "[$ts] $msg\n", FILE_APPEND);
}

// --- Get ID ranges for parallel processing ---
function get_id_ranges($conn, $batch_size)
{
    $ranges = [];
    $result = $conn->query("SELECT MIN(id) as min_id, MAX(id) as max_id, COUNT(*) as total FROM emails");
    $row = $result->fetch_assoc();
    if (!$row || $row['min_id'] === null || $row['max_id'] === null)
        return $ranges;

    $total = $row['total'];
    write_log("Total emails to process: $total");

    for ($i = $row['min_id']; $i <= $row['max_id']; $i += $batch_size) {
        $end = min($i + $batch_size - 1, $row['max_id']);
        $ranges[] = [
            'start' => $i,
            'end' => $end,
            'count' => $end - $i + 1
        ];
    }
    write_log("Total batches: " . count($ranges) . ", Batch size: $batch_size");
    return $ranges;
}

// --- Parallel SMTP processing ---
function process_in_parallel($conn)
{
    $batch_size = EMAILS_PER_WORKER;
    $ranges = get_id_ranges($conn, $batch_size);
    $total_batches = count($ranges);
    $processed = 0;
    $active_procs = [];
    $batch_idx = 0;

    write_log("Starting parallel SMTP processing with MAX_WORKERS=" . MAX_WORKERS);

    while ($batch_idx < $total_batches || count($active_procs) > 0) {
        // Start new workers if under limit
        while (count($active_procs) < MAX_WORKERS && $batch_idx < $total_batches) {
            $range = $ranges[$batch_idx];
            $cmd = "php " . escapeshellarg(WORKER_SCRIPT) . " {$range['start']} {$range['end']}";
            $descriptorspec = [0 => ["pipe", "r"], 1 => ["pipe", "w"], 2 => ["pipe", "w"]];
            $proc = proc_open($cmd, $descriptorspec, $pipes);
            if (is_resource($proc)) {
                $active_procs[] = [
                    'proc' => $proc,
                    'pipes' => $pipes,
                    'range' => $range
                ];
                write_log("Started worker for IDs {$range['start']} - {$range['end']} ({$range['count']} emails)");
            }
            $processed += $range['count'];
            $batch_idx++;
        }

        // Check for finished workers
        foreach ($active_procs as $key => $worker) {
            $status = proc_get_status($worker['proc']);
            if (!$status['running']) {
                // Read output and errors
                $stdout = stream_get_contents($worker['pipes'][1]);
                $stderr = stream_get_contents($worker['pipes'][2]);
                if (trim($stdout)) {
                    write_log("Worker [IDs {$worker['range']['start']}-{$worker['range']['end']}] OUTPUT: $stdout");
                }
                if (trim($stderr)) {
                    write_log("Worker [IDs {$worker['range']['start']}-{$worker['range']['end']}] ERROR: $stderr");
                }
                // Close pipes and remove from active list
                foreach ($worker['pipes'] as $pipe)
                    fclose($pipe);
                proc_close($worker['proc']);
                unset($active_procs[$key]);
            }
        }
        // Prevent busy waiting
        usleep(100000); // 0.1s
        $active_procs = array_values($active_procs); // reindex
    }

    // Log how many emails remain to process
    $result = $conn->query("SELECT COUNT(*) as remaining FROM emails WHERE validation_status IS NULL");
    $row = $result->fetch_assoc();
    $remaining = $row ? $row['remaining'] : 0;
    write_log("Processing complete. Remaining unprocessed emails: $remaining");

    return $processed;
}

// --- Main execution ---
try {
    // Update status before processing
    $conn->query("UPDATE csv_list SET status = 'running' WHERE status = 'pending'");

    $start_time = microtime(true);
    $processed = process_in_parallel($conn);
    $total_time = microtime(true) - $start_time;

    // Get verification stats
    $total = $conn->query("SELECT COUNT(*) as total FROM emails")->fetch_row()[0];
    $verified = $conn->query("SELECT COUNT(*) as verified FROM emails WHERE validation_status = 'valid'")->fetch_row()[0];

    echo json_encode([
        "status" => "success",
        "processed" => (int) $processed,
        "total_emails" => (int) $total,
        "verified_emails" => (int) $verified,
        "time_seconds" => round($total_time, 2),
        "rate_per_second" => round($processed / $total_time, 2),
        "message" => "Parallel SMTP processing completed"
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
} finally {
    $conn->close();
}
?>