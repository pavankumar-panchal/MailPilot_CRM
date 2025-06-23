<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/../config/db.php';

// Get URI path after the script path
$fullPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$basePath = str_replace('\\', '/', $_SERVER['SCRIPT_NAME']);
$request = str_replace($basePath, '', $fullPath);

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($request) {
        case '/api/upload':
            require __DIR__ . './../public/email_processor.php';
            break;

        case '/api/results':
            require __DIR__ . '/../includes/get_results.php';
            break;

        case '/api/monitor/campaigns':
            if ($method === 'GET')
                require __DIR__ . '/../includes/monitor_campaigns.php';
            break;

        case '/api/master/campaigns':
            if ($method === 'GET')
                require __DIR__ . '/../includes/master_campaigns.php';
            if ($method === 'POST')
                require __DIR__ . '/../includes/master_campaign_actions.php';
            break;

        case '/api/master/smtps':
            // Accept all methods for SMTPs
            require __DIR__ . '/../includes/master_smtps.php';
            break;

        case '/api/master/distribute':
            if ($method === 'POST')
                require __DIR__ . '/../includes/master_distribute.php';
            break;

        case '/api/retry-failed':
            if ($method === 'POST') {
                file_get_contents('/../includes/retry_smtp.php');
                echo json_encode(['status' => 'success', 'message' => 'Retry process triggered.']);
            }
            break;


        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

// filepath: /opt/lampp/htdocs/Verify_email/backend/includes/get_results.php
require_once __DIR__ . '/../db.php';

// Optional: handle export requests
if (isset($_GET['export'])) {
    $type = $_GET['export'];
    $status = ($type === 'valid') ? 1 : 0;
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="' . $type . '_emails.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['email']);
    $result = $conn->query("SELECT email FROM emails WHERE domain_status = $status");
    while ($row = $result->fetch_assoc()) {
        fputcsv($out, [$row['email']]);
    }
    fclose($out);
    exit;
}

// Default: return all emails as JSON
$result = $conn->query("SELECT id, email, sp_account, sp_domain, verified, status, validation_response FROM emails ORDER BY id DESC");
$rows = [];
while ($row = $result->fetch_assoc()) {
    // Optionally cast verified to boolean
    $row['verified'] = (bool) $row['verified'];
    $rows[] = $row;
}
echo json_encode($rows);
