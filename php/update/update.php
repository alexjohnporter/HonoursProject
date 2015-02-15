<?php
include '../core/dbinfo.php';
include '../functions/sanitize.php';

$itemID = sanitizeForm(isset($_POST['item-id-edit']) ? $_POST['item-id-edit'] : null);
$itemName = sanitizeForm(isset($_POST['item-name-edit']) ? $_POST['item-name-edit'] : null);
$itemTxt = sanitizeForm(isset($_POST['item-txt-edit']) ? $_POST['item-txt-edit'] : null);
$addOne = sanitizeForm(isset($_POST['first-line-edit']) ? $_POST['first-line-edit'] : null);
$addTwo = sanitizeForm(isset($_POST['second-line-edit']) ? $_POST['second-line-edit'] : null);
$postcode = sanitizeForm(isset($_POST['postcode-edit']) ? $_POST['postcode-edit'] :null);
$itemImg  = sanitizeForm(isset($_POST['item-img-edit']) ? $_POST['item-img-edit'] :null);
$timeID = sanitizeForm(isset($_POST['edit-time-id']) ? $_POST['edit-time-id'] :null);

    if (!empty($itemID) || !empty($itemName) || !empty($itemTxt) || !empty($addOne) || !empty($itemID) || !empty($addTwo) || !empty($postcode) || !empty($itemImg) || !empty($timeID) ) {
        try {
            $dbh = new PDO("mysql:host=localhost;dbname=$database", $username, $password); // Connecting, selecting database
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // SQL errors will not be silent

            $stmt = $dbh->prepare("UPDATE items SET
            itemName = :itemName,
            itemTxt = :itemTxt,
            AddressOne = :a1,
            AddressTwo = :a2,
            Postcode = :pc,
            itemImg = :img,
            timeID = :timeID
            WHERE itemID= :itemID");
            $stmt->bindParam(':itemID', $itemID);
            $stmt->bindParam(':itemName', $itemName);
            $stmt->bindParam(':itemTxt', $itemTxt);
            $stmt->bindParam(':a1', $addOne);
            $stmt->bindParam(':a2', $addTwo);
            $stmt->bindParam(':pc', $postcode);
            $stmt->bindParam(':img', $itemImg);
            $stmt->bindParam(':timeID', $timeID);
            $result = $stmt->execute();
            if ($result === true) {
                $update_status['status'] = true;

            } else {
                $update_status['status'] = false;

            }
            echo json_encode($update_status);
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
        $update_status['status'] = false;
        $errorMessage['message'] = 'No data';
        echo json_encode($errorMessage);
        echo json_encode($update_status);
    }




