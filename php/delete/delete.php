<?php
include '../core/dbinfo.php';
include '../functions/sanitize.php';

$itemID = sanitizeForm(isset($_POST['delete-item']) ? $_POST['delete-item'] : null);

if (!empty($itemID)) {
        $stmt = $dbh->prepare("DELETE FROM items WHERE itemID = :itemID");
        $stmt->bindParam(':itemID', $itemID);
        $result = $stmt->execute();
        if ($result === true) {
            $delete_status['status'] = true;

        } else {
            $delete_status['status'] = false;

        }
        echo json_encode($delete_status);
        $dbh = null; // Closing connection after success

} else {
    $delete_status['status'] = false;
    $errorMessage['message'] = 'No data';
    echo json_encode($errorMessage);
    echo json_encode($delete_status);
}




