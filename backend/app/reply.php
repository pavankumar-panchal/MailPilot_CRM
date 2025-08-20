<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$db = new mysqli("localhost", "root", "", "CRM");
if ($db->connect_error) {
    echo json_encode(["success" => false, "message" => "DB connection failed"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

// Validate input
$to = trim($input['to'] ?? '');
$subject = trim($input['subject'] ?? '');
$body = trim($input['body'] ?? '');
$account_id = intval($input['account_id'] ?? 0);

if (empty($to) || empty($subject) || empty($body) || $account_id <= 0) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

// Get SMTP credentials
$stmt = $db->prepare("
    SELECT a.email, a.password, s.host, s.port, s.encryption 
    FROM smtp_accounts a
    JOIN smtp_servers s ON s.id = a.smtp_server_id
    WHERE s.id = ? AND a.is_active = 1 LIMIT 1
");
$stmt->bind_param("i", $account_id);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$result) {
    echo json_encode(["success" => false, "message" => "SMTP account not found"]);
    exit;
}

// Send email using PHPMailer
require_once __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $result['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $result['email'];
    $mail->Password = $result['password'];
    if (!empty($result['encryption'])) {
        $mail->SMTPSecure = $result['encryption']; // tls or ssl
    }
    $mail->Port = (int)$result['port'];
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($result['email'], "CRM Mailer"); // sender name optional
    $mail->addAddress($to);

    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->isHTML(true);

    $mail->send();

    // Log the sent email
    $stmt = $db->prepare("INSERT INTO sent_emails 
        (smtp_server_id, to_email, subject, body, date_sent) 
        VALUES (?, ?, ?, ?, NOW())");
    $stmt->bind_param("isss", $account_id, $to, $subject, $body);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true, "message" => "Email sent successfully"]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Mailer Error: " . $mail->ErrorInfo
    ]);
}
