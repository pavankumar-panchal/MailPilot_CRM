<?php
require_once __DIR__ . '/../db.php';
$result = $conn->query("SELECT id, name, daily_limit, hourly_limit FROM smtp_servers WHERE is_active = 1");
$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);