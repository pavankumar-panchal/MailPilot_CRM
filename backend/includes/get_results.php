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

$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "CRM";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

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

// Pagination parameters
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 100; // default 100 rows per page
$offset = ($page - 1) * $limit;

// Optional: search filter
$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';
$where = '';
if ($search !== '') {
    $where = "WHERE raw_emailid LIKE '%$search%' OR sp_account LIKE '%$search%' OR sp_domain LIKE '%$search%'";
}

// Get total count for pagination
$countResult = $conn->query("SELECT COUNT(*) as total FROM emails $where");
$total = $countResult ? (int) $countResult->fetch_assoc()['total'] : 0;

// Fetch paginated data
$sql = "SELECT id, raw_emailid AS email, sp_account, sp_domain, domain_verified, domain_status, validation_response 
        FROM emails $where ORDER BY id ASC LIMIT $limit OFFSET $offset";
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