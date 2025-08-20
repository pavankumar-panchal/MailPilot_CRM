<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// --- Database connection ---
class EmailAPI {
    private $db;

    public function __construct() {
        $this->db = new mysqli("localhost", "root", "", "CRM");
        if ($this->db->connect_error) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "emails" => [],
                "message" => "Database connection failed: " . $this->db->connect_error
            ]);
            exit;
        }
        $this->db->set_charset("utf8mb4");
    }

    public function handleRequest() {
        $account_id = intval($_GET['account_id'] ?? 0);
        $type = $_GET['type'] ?? 'all';
        $page = max(1, intval($_GET['page'] ?? 1));
        $pageSize = min(100, max(1, intval($_GET['pageSize'] ?? 20)));
        $offset = ($page - 1) * $pageSize;

        if (!$account_id) {
            echo json_encode([
                "success" => false,
                "emails" => [],
                "message" => "Missing or invalid account_id."
            ]);
            return;
        }

        try {
            // Fetch SMTP server info
            $smtp = $this->getSmtpServer($account_id);
            if (!$smtp || empty($smtp['smtp_email']) || empty($smtp['smtp_password'])) {
                echo json_encode([
                    "success" => false,
                    "emails" => [],
                    "message" => "SMTP account not found or missing credentials."
                ]);
                return;
            }

            // Fetch new replies from Gmail using IMAP (with UID filtering)
            $processor = new EmailProcessor($this->db);
            $last_uid = $this->getLastUid($account_id);
            $new_last_uid = $processor->fetchReplies($smtp, $last_uid);
            if ($new_last_uid > $last_uid) {
                $this->updateLastUid($account_id, $new_last_uid);
            }

            // Get emails for frontend
            $emails = $this->getEmails($account_id, $type, $pageSize, $offset);

            echo json_encode([
                "success" => true,
                "emails" => $emails,
                "page" => $page,
                "pageSize" => $pageSize,
                "total" => $this->getTotalCount($account_id, $type),
                "smtp_info" => [
                    "email" => $smtp['smtp_email'],
                    "server_id" => $smtp['id']
                ],
                "message" => count($emails) > 0 ? "Fetched " . count($emails) . " messages." : "No messages found."
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "emails" => [],
                "message" => "Error: " . $e->getMessage()
            ]);
        }
    }

    private function getSmtpServer($account_id) {
        $stmt = $this->db->prepare("
            SELECT s.*, a.email AS smtp_email, a.password AS smtp_password
            FROM smtp_servers s
            LEFT JOIN smtp_accounts a ON a.smtp_server_id = s.id AND a.is_active = 1
            WHERE s.id = ? AND s.is_active = 1
            LIMIT 1
        ");
        $stmt->bind_param("i", $account_id);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        return $result;
    }

    private function getLastUid($account_id) {
        $stmt = $this->db->prepare("SELECT last_uid FROM smtp_servers WHERE id = ?");
        $stmt->bind_param("i", $account_id);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        return isset($result['last_uid']) ? intval($result['last_uid']) : 0;
    }

    private function updateLastUid($account_id, $uid) {
        $stmt = $this->db->prepare("UPDATE smtp_servers SET last_uid = ? WHERE id = ?");
        $stmt->bind_param("ii", $uid, $account_id);
        $stmt->execute();
        $stmt->close();
    }

    private function getEmails($account_id, $type, $limit, $offset) {
        $where = "smtp_server_id = ?";
        $params = [$account_id];
        $types = "i";

        switch ($type) {
            case 'unsubscribes':
                $where .= " AND is_unsubscribe = 1";
                break;
            case 'bounces':
                $where .= " AND is_bounce = 1";
                break;
            case 'all':
            default:
                break;
        }

        $query = "SELECT uid, from_email, from_name, subject, body, date_received, seen, is_unsubscribe, is_bounce 
                  FROM processed_emails WHERE $where ORDER BY date_received DESC LIMIT ? OFFSET ?";
        $stmt = $this->db->prepare($query);
        $params[] = $limit;
        $params[] = $offset;
        $types .= "ii";

        $stmt->bind_param($types, ...$params);
        $stmt->execute();
        $result = $stmt->get_result();
        $emails = [];
        while ($row = $result->fetch_assoc()) {
            $emails[] = [
                'uid' => $row['uid'],
                'from_email' => $row['from_email'],
                'from_name' => $row['from_name'],
                'subject' => $row['subject'],
                'body' => $row['body'],
                'date_received' => $row['date_received'],
                'date_formatted' => $this->formatDate($row['date_received']),
                'seen' => (bool)$row['seen'],
                'is_unsubscribe' => (bool)$row['is_unsubscribe'],
                'is_bounce' => (bool)$row['is_bounce']
            ];
        }
        $stmt->close();
        return $emails;
    }

    private function getTotalCount($account_id, $type) {
        $where = "smtp_server_id = ?";
        $params = [$account_id];
        $types = "i";

        switch ($type) {
            case 'unsubscribes':
                $where .= " AND is_unsubscribe = 1";
                break;
            case 'bounces':
                $where .= " AND is_bounce = 1";
                break;
            case 'all':
            default:
                break;
        }

        $query = "SELECT COUNT(*) as total FROM processed_emails WHERE $where";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param($types, ...$params);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        return (int)$result['total'];
    }

    private function formatDate($dateString) {
        if (empty($dateString)) return '';
        try {
            $date = new DateTime($dateString);
            $now = new DateTime();
            $diff = $now->diff($date);

            if ($diff->days === 0) {
                return $date->format('g:i A');
            } elseif ($diff->days === 1) {
                return 'Yesterday';
            } elseif ($diff->days < 7) {
                return $date->format('D');
            } else {
                return $date->format('M j');
            }
        } catch (Exception $e) {
            return $dateString;
        }
    }
}

// --- IMAP Email Processor ---
class EmailProcessor {
    private $db;
    public function __construct($db) {
        $this->db = $db;
    }

    // Only fetch and store emails with UID > last_uid
    public function fetchReplies($smtp, $last_uid = 0) {
        if (empty($smtp['smtp_email']) || empty($smtp['smtp_password'])) {
            throw new Exception("Missing email credentials for server {$smtp['id']}");
        }
        $host = 'imap.gmail.com';
        $port = 993;
        $protocol = 'imap';
        $encryption = 'ssl';
        $mailbox = "{" . $host . ":" . $port . "/" . $protocol . "/" . $encryption . "/novalidate-cert}INBOX";
        $inbox = @imap_open($mailbox, $smtp['smtp_email'], $smtp['smtp_password'], OP_READONLY, 1);
        if (!$inbox) {
            $errors = imap_errors();
            throw new Exception("IMAP connection failed: " . implode(", ", $errors ?: ["Unknown error"]));
        }
        $max_uid = $last_uid;
        try {
            $emails = imap_search($inbox, 'ALL', SE_UID);
            if ($emails) {
                foreach ($emails as $email_uid) {
                    if ($email_uid <= $last_uid) continue; // Only new emails
                    $overview = imap_fetch_overview($inbox, $email_uid, FT_UID)[0] ?? null;
                    $structure = imap_fetchstructure($inbox, $email_uid, FT_UID);

                    // Get the best body part (prefer HTML, fallback to plain text)
                    $body = $this->getBestBody($inbox, $email_uid, $structure);

                    $subject = $overview->subject ?? '';
                    $from_email = $overview->from ?? '';
                    $from_name = $overview->from ?? '';
                    $date_received = date('Y-m-d H:i:s', strtotime($overview->date ?? 'now'));

                    // Truncate body if too long
                    $maxBodyLength = 1000000; // 1MB
                    if (strlen($body) > $maxBodyLength) {
                        $body = substr($body, 0, $maxBodyLength) . "\n\n[TRUNCATED]";
                    }

                    // Insert into processed_emails
                    $stmt = $this->db->prepare("
                        INSERT IGNORE INTO processed_emails
                        (smtp_server_id, uid, from_email, from_name, subject, body, date_received, seen, is_unsubscribe, is_bounce)
                        VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0)
                    ");
                    $stmt->bind_param("iisssss", $smtp['id'], $email_uid, $from_email, $from_name, $subject, $body, $date_received);
                    $stmt->execute();
                    $stmt->close();

                    if ($email_uid > $max_uid) $max_uid = $email_uid;
                }
            }
        } finally {
            imap_close($inbox);
        }
        return $max_uid;
    }

    // Helper to get the best body part (plain text preferred, fallback to HTML)
    private function getBestBody($inbox, $email_uid, $structure) {
        $plain = '';
        $html = '';
        if (!isset($structure->parts)) {
            // Single part message
            if (strtolower($structure->subtype ?? '') === 'plain') {
                $plain = $this->decodeBody(imap_body($inbox, $email_uid, FT_UID), $structure->encoding ?? 0);
            } elseif (strtolower($structure->subtype ?? '') === 'html') {
                $html = $this->decodeBody(imap_body($inbox, $email_uid, FT_UID), $structure->encoding ?? 0);
            }
        } else {
            // Multipart message
            foreach ($structure->parts as $i => $part) {
                $partNum = $i + 1;
                $mimeType = strtolower($part->subtype ?? '');
                if ($mimeType === 'plain') {
                    $plain = $this->decodeBody(imap_fetchbody($inbox, $email_uid, $partNum, FT_UID), $part->encoding ?? 0);
                } elseif ($mimeType === 'html') {
                    $html = $this->decodeBody(imap_fetchbody($inbox, $email_uid, $partNum, FT_UID), $part->encoding ?? 0);
                }
            }
        }
        // Prefer plain text, fallback to HTML (with tags stripped)
        if (!empty($plain)) {
            return $plain;
        } elseif (!empty($html)) {
            return strip_tags($html);
        } else {
            return '';
        }
    }

    // Helper to decode body based on encoding
    private function decodeBody($body, $encoding) {
        switch ($encoding) {
            case 4: // quoted-printable
                return quoted_printable_decode($body);
            case 3: // base64
                return base64_decode($body);
            default:
                return $body;
        }
    }
}

// --- Handle the request ---
$api = new EmailAPI();
$api->handleRequest();