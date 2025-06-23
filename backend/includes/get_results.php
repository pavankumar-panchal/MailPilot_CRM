<?php
ini_set('memory_limit', '1024M');
ini_set('max_execution_time', 300);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/db.php';


// Handle DELETE request to delete an email by id
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Parse raw input for DELETE (since PHP doesn't populate $_DELETE)
    parse_str(file_get_contents("php://input"), $deleteVars);
    $id = isset($deleteVars['id']) ? intval($deleteVars['id']) : 0;
    if ($id > 0) {
        $stmt = $conn->prepare("DELETE FROM emails WHERE id = ?");
        $stmt->bind_param("i", $id);
        $success = $stmt->execute();
        $stmt->close();
        echo json_encode([
            "success" => $success,
            "message" => $success ? "Email deleted." : "Delete failed."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid ID."
        ]);
    }
    exit;
}

// Export CSV if requested
if (isset($_GET['export'])) {
    $type = $_GET['export'];
    $status = ($type === 'valid') ? 1 : 0;
    // Fetch all columns for export
    $result = $conn->query("SELECT raw_emailid FROM emails WHERE domain_status = $status");

    // Dynamically get column names
    $fields = [];
    if ($result && $result->field_count > 0) {
        while ($fieldinfo = $result->fetch_field()) {
            $fields[] = $fieldinfo->name;
        }
    }

    // Set CSV headers
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="' . $type . '_emails.csv"');
    $out = fopen('php://output', 'w');
    fputcsv($out, $fields);

    // Output all rows
    while ($row = $result->fetch_assoc()) {
        fputcsv($out, array_values($row));
    }
    fclose($out);
    exit;
}

// Add this export for "Connection Timeout" (Connection refused) results

if (isset($_GET['export']) && $_GET['export'] === 'connection_timeout') {
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="connection_timeout_emails.csv"');

    require_once 'db.php'; // adjust path if needed

    $sql = "SELECT * FROM `emails` WHERE validation_response='Connection failed: Connection refused'";
    $result = $conn->query($sql);

    // Output CSV header
    echo "id,email,validation_response\n";

    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Adjust fields as needed
            echo "{$row['id']},{$row['email']},\"{$row['validation_response']}\"\n";
        }
    }
    exit;
}

// Retry failed logic
if (isset($_GET['retry_failed']) && $_GET['retry_failed'] == '1') {
    try {
        $sql = "SELECT id, raw_emailid AS email, sp_account, sp_domain, domain_verified, domain_status, validation_response 
                FROM emails WHERE domain_status = 2 ORDER BY id ASC";
        $result = $conn->query($sql);

        $emails = [];
        while ($row = $result->fetch_assoc()) {
            $row['domain_verified'] = (bool) $row['domain_verified'];
            $row['domain_status'] = (int) $row['domain_status'];
            $emails[] = $row;
        }

        echo json_encode([
            "status" => "success",
            "message" => count($emails) . " retry failed emails found.",
            "data" => $emails,
            "total" => count($emails)
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to fetch retry failed emails: " . $e->getMessage(),
            "data" => [],
            "total" => 0
        ]);
    }
    exit;
}

// Pagination parameters
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 100; // default 100 rows per page
$offset = ($page - 1) * $limit;

// Optional: filter by csv_list_id
$csv_list_id = isset($_GET['csv_list_id']) ? intval($_GET['csv_list_id']) : 0;

// Optional: search filter
$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';
$whereParts = [];

if ($csv_list_id > 0) {
    $whereParts[] = "csv_list_id = $csv_list_id";
}
if ($search !== '') {
    $whereParts[] = "(raw_emailid LIKE '%$search%' OR sp_account LIKE '%$search%' OR sp_domain LIKE '%$search%')";
}
$where = '';
if (count($whereParts) > 0) {
    $where = 'WHERE ' . implode(' AND ', $whereParts);
}

// Always use pagination for both main and child tables
$sql = "SELECT id, raw_emailid AS email, sp_account, sp_domain, domain_verified, domain_status, validation_response 
        FROM emails $where ORDER BY id ASC LIMIT $limit OFFSET $offset";
// Get total count for pagination/search/child
$countResult = $conn->query("SELECT COUNT(*) as cnt FROM emails $where");
$total = $countResult ? (int) $countResult->fetch_assoc()['cnt'] : 0;

$result = $conn->query($sql);

$emails = [];
while ($row = $result->fetch_assoc()) {
    $row['domain_verified'] = (bool) $row['domain_verified'];
    $row['domain_status'] = (int) $row['domain_status'];
    $emails[] = $row;
}

echo json_encode([
    "data" => $emails,
    "total" => $total,
    "page" => $page,
    "limit" => $limit
]);