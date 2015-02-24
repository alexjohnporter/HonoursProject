<?php
include '../core/dbinfo.php';
include '../functions/sanitize.php';

$headerTxt = sanitizeForm(isset($_POST['hdr-txt-update']) ? $_POST['hdr-txt-update'] : null);
$author = sanitizeForm(isset($_POST['author-update']) ? $_POST['author-update'] : null);
$fb = sanitizeForm(isset($_POST['fb-update']) ? $_POST['fb-update'] : null);
$twit = sanitizeForm(isset($_POST['twit-update']) ? $_POST['twit-update'] : null);
$headerID  = sanitizeForm(isset($_POST['header-id']) ? $_POST['header-id'] : null);

if (!empty($headerTxt) || !empty($author) || !empty($headerID) || !empty($fb) || !empty($twit)) {

    $stmt = $dbh->prepare("UPDATE header SET
    hdrTxt = :hdrTxt,
    author = :author,
    fbIcon = :fb,
    twitIcon = :twit
    WHERE hdrID= :hdrID");
    $stmt->bindParam(':hdrTxt', $headerTxt);
    $stmt->bindParam(':author', $author);
    $stmt->bindParam(':fb', $fb);
    $stmt->bindParam(':twit', $twit);
    $stmt->bindParam(':hdrID', $headerID);
    $result = $stmt->execute();
    if ($result === true) {
    $update_status['status'] = true;

    } else {
    $update_status['status'] = false;

    }
    echo json_encode($update_status);
    $dbh = null; // Closing connection after success
} else {
$update_status['status'] = false;
$errorMessage['message'] = 'No data';
echo json_encode($errorMessage);
echo json_encode($update_status);
}

