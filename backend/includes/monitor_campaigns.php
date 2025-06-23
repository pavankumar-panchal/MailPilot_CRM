<?php
require_once __DIR__ . '/../config/db.php';


$result = $conn->query("
    SELECT cm.campaign_id, cm.description, 
        COALESCE(cs.status, 'pending') as campaign_status, 
        COALESCE(cs.total_emails, 0) as total_emails, 
        COALESCE(cs.pending_emails, 0) as pending_emails, 
        COALESCE(cs.sent_emails, 0) as sent_emails, 
        COALESCE(cs.failed_emails, 0) as failed_emails
    FROM campaign_master cm
    LEFT JOIN campaign_status cs ON cm.campaign_id = cs.campaign_id
    ORDER BY cm.campaign_id DESC
");
$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);