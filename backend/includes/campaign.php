<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/../config/db.php';

// Handle preflight (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

// Helper: get input data for POST/PUT
function getInputData() {
    $input = file_get_contents('php://input');
    return json_decode($input, true) ?? [];
}

try {
    // GET /api/master/campaigns or /api/master/campaigns?id=1
    if ($method === 'GET') {
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT * FROM campaign_master WHERE campaign_id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            if ($row) {
                echo json_encode($row);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Campaign not found']);
            }
            exit;
        } else {
            $result = $conn->query("SELECT * FROM campaign_master ORDER BY campaign_id DESC");
            $campaigns = [];
            while ($row = $result->fetch_assoc()) {
                // Add preview (first 30 words)
                $words = preg_split('/\s+/', $row['mail_body']);
                $preview = implode(' ', array_slice($words, 0, 30));
                if (count($words) > 30) $preview .= '...';
                $row['mail_body_preview'] = $preview;
                $campaigns[] = $row;
            }
            echo json_encode($campaigns);
            exit;
        }
    }

    // POST /api/master/campaigns
    if ($method === 'POST') {
        $data = getInputData();
        $description = $conn->real_escape_string($data['description'] ?? '');
        $mail_subject = $conn->real_escape_string($data['mail_subject'] ?? '');
        $mail_body = $conn->real_escape_string($data['mail_body'] ?? '');

        if (!$description || !$mail_subject || !$mail_body) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'All fields are required.']);
            exit;
        }

        $sql = "INSERT INTO campaign_master (description, mail_subject, mail_body) VALUES ('$description', '$mail_subject', '$mail_body')";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Campaign added successfully!']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Error adding campaign: ' . $conn->error]);
        }
        exit;
    }

    // PUT /api/master/campaigns?id=1
    if ($method === 'PUT') {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Campaign ID is required.']);
            exit;
        }
        $id = intval($_GET['id']);
        $data = getInputData();
        $description = $conn->real_escape_string($data['description'] ?? '');
        $mail_subject = $conn->real_escape_string($data['mail_subject'] ?? '');
        $mail_body = $conn->real_escape_string($data['mail_body'] ?? '');

        if (!$description || !$mail_subject || !$mail_body) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'All fields are required.']);
            exit;
        }

        $sql = "UPDATE campaign_master SET description='$description', mail_subject='$mail_subject', mail_body='$mail_body' WHERE campaign_id=$id";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Campaign updated successfully!']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Error updating campaign: ' . $conn->error]);
        }
        exit;
    }

    // DELETE /api/master/campaigns?id=1
    if ($method === 'DELETE') {
        if (!isset($_GET['id'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Campaign ID is required.']);
            exit;
        }
        $id = intval($_GET['id']);
        $sql = "DELETE FROM campaign_master WHERE campaign_id=$id";
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Campaign deleted successfully!']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Error deleting campaign: ' . $conn->error]);
        }
        exit;
    }

    // If method not handled
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}