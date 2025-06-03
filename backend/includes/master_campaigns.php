<?php
require_once __DIR__ . '/../db.php';

$campaigns = [];
$result = $conn->query("
    SELECT cm.campaign_id, cm.description, cm.mail_subject,
        (SELECT COUNT(*) FROM emails WHERE domain_status = 1) AS valid_emails,
        (SELECT SUM(percentage) FROM campaign_distribution WHERE campaign_id = cm.campaign_id) AS distributed_percentage,
        cs.status as campaign_status,
        COALESCE(cs.total_emails, 0) as total_emails,
        COALESCE(cs.pending_emails, 0) as pending_emails,
        COALESCE(cs.sent_emails, 0) as sent_emails,
        COALESCE(cs.failed_emails, 0) as failed_emails
    FROM campaign_master cm
    LEFT JOIN campaign_status cs ON cm.campaign_id = cs.campaign_id
    ORDER BY cm.campaign_id DESC
");
while ($row = $result->fetch_assoc()) {
    $row['remaining_percentage'] = 100 - ($row['distributed_percentage'] ?? 0);
    // Get current distributions
    $stmt = $conn->prepare("SELECT cd.smtp_id, cd.percentage, ss.name, ss.daily_limit, ss.hourly_limit
        FROM campaign_distribution cd
        JOIN smtp_servers ss ON cd.smtp_id = ss.id
        WHERE cd.campaign_id = ?");
    $stmt->bind_param("i", $row['campaign_id']);
    $stmt->execute();
    $dists = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $row['current_distributions'] = $dists;
    $campaigns[] = $row;
}
echo json_encode($campaigns);