<?php
include '../core/dbinfo.php';
include '../functions/sanitize.php';

$itemID = sanitizeForm(isset($_POST['delete-item']) ? $_POST['delete-item'] : null);

if (!empty($itemID)) {
    try {
        $dbh = new PDO("mysql:host=localhost;dbname=$database", $username, $password); // Connecting, selecting database
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // SQL errors will not be silent

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
    } catch (PDOException $e) {
        $dbh = null; // Closing connection if some error has occured
        $errorMessage['data'] = 'failed';
        echo json_encode($errorMessage);
        print "Error!: " . $e->getMessage() . "<br/>"; // WARNING - error messages are potential security weakness on production sites
        print "PHP Line Number: " . $e->getLine() . "<br/>";
        print "PHP File: " . $e->getFile() . "<br/>";
        die();
    }
} else {
    $delete_status['status'] = false;
    $errorMessage['message'] = 'No data';
    echo json_encode($errorMessage);
    echo json_encode($delete_status);
}




