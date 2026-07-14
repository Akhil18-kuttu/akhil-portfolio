<?php
// contact.php
declare(strict_types=1);

// Make sure there is NO whitespace before <?php in this file.
// Turn on output buffering to avoid accidental output breaking JSON
ob_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

// Return JSON and prevent PHP from printing errors to the browser
header('Content-Type: application/json; charset=utf-8');
ini_set('display_errors', '0');
error_reporting(E_ALL);

// Helper to respond JSON and exit
function respond(array $payload, int $httpCode = 200): void {
    http_response_code($httpCode);
    if (ob_get_length()) { ob_clean(); }
    echo json_encode($payload);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['status' => 'error', 'message' => 'Invalid request method'], 405);
}

// Collect & sanitize input
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if ($name === '' || $email === '' || $message === '') {
    respond(['status' => 'error', 'message' => 'Please fill all required fields.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(['status' => 'error', 'message' => 'Invalid email address.']);
}

try {
    $mail = new PHPMailer(true);

    // Production: keep SMTPDebug = 0 so no debug text is printed
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'akhil.kuttus1333@gmail.com';          // <-- replace with your SMTP username
    $mail->Password   = 'imrq jzun xzdh msey';     // <-- replace with your App Password (Gmail) or SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // or 'ssl' with port 465
    $mail->Port       = 587;

    // Headers
    $mail->setFrom('akhil.kuttus1333@gmail.com', 'Portfolio Contact'); // must be the authenticated account in many providers
    $mail->addReplyTo($email, $name);
    $mail->addAddress('akhil.kuttus1333@gmail.com'); // your inbox where messages arrive

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'New message from portfolio contact form';
    $mail->Body    = "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>"
                   . "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>"
                   . "<p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>";

    $mail->send();
    respond(['status' => 'success', 'message' => 'Message sent successfully.']);
} catch (Exception $e) {
    // Log detailed error server-side; do not expose sensitive details to client
    $err = $mail->ErrorInfo ?? $e->getMessage();
    error_log('Contact form mail error: ' . $err);
    respond(['status' => 'error', 'message' => 'Failed to send message. Please try again later.']);
}
