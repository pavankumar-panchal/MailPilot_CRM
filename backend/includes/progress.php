<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
require_once __DIR__ . '/../config/db.php';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Check if any emails are in progress (not fully processed)
    $inProgressResult = $conn->query("SELECT COUNT(*) as cnt FROM emails WHERE domain_verified = 0 OR (domain_processed = 0 AND (domain_status IS NULL OR domain_status = ''))");
    $inProgress = $inProgressResult->fetch_assoc()['cnt'] ?? 0;

    if ($inProgress == 0) {
        echo json_encode([
            "stage" => "idle",
            "message" => "No verification in progress"
        ]);
        exit;
    }

    // Step 1: Domain progress
    $domainTotalResult = $conn->query("SELECT COUNT(*) as total FROM emails");
    $domainTotal = $domainTotalResult->fetch_assoc()['total'] ?? 0;

    $domainProcessedResult = $conn->query("SELECT COUNT(*) as processed FROM emails WHERE domain_verified = 1");
    $domainProcessed = $domainProcessedResult->fetch_assoc()['processed'] ?? 0;

    if ($domainProcessed < $domainTotal) {
        $percent = $domainTotal > 0 ? round(($domainProcessed / $domainTotal) * 100) : 0;

        echo json_encode([
            "stage" => "domain",
            "total" => (int) $domainTotal,
            "processed" => (int) $domainProcessed,
            "percent" => $percent,
            "message" => "Domain verification in progress"
        ]);
        exit;
    }

    // Step 2: SMTP progress
    $smtpTotalResult = $conn->query("SELECT COUNT(*) as total FROM emails");
    $smtpTotal = $smtpTotalResult->fetch_assoc()['total'] ?? 0;

    $smtpProcessedResult = $conn->query("SELECT COUNT(*) as processed FROM emails WHERE domain_processed = 1 OR domain_status=0");
    $smtpProcessed = $smtpProcessedResult->fetch_assoc()['processed'] ?? 0;

    $percent = $smtpTotal > 0 ? round(($smtpProcessed / $smtpTotal) * 100) : 0;

    echo json_encode([
        "stage" => "smtp",
        "total" => (int) $smtpTotal,
        "processed" => (int) $smtpProcessed,
        "percent" => $percent,
        "message" => "SMTP verification in progress"
    ]);
} catch (Exception $e) {
    echo json_encode([
        "error" => "Query failed",
        "details" => $e->getMessage()
    ]);
}
