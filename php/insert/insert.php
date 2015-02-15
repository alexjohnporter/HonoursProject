<?php
include '../core/dbinfo.php';
include '../functions/sanitize.php';

$itemName = sanitizeForm(isset($_POST['item-name-insert']) ? $_POST['item-name-insert'] : null);
$itemTxt = sanitizeForm(isset($_POST['item-txt-insert']) ? $_POST['item-txt-insert'] : null);
$addOne = sanitizeForm(isset($_POST['first-line-insert']) ? $_POST['first-line-insert'] : null);
$addTwo = sanitizeForm(isset($_POST['second-line-insert']) ? $_POST['second-line-insert'] : null);
$postcode = sanitizeForm(isset($_POST['postcode-insert']) ? $_POST['postcode-insert'] :null);
$itemImg  = sanitizeForm(isset($_POST['item-img-insert']) ? $_POST['item-img-insert'] :null);
$timeID = sanitizeForm(isset($_POST['insert-time-id']) ? $_POST['insert-time-id'] :null);


    if( !empty($itemName) || !empty($itemTxt) || !empty($addOne) ||!empty($itemID) || !empty($addTwo) || !empty($postcode) || !empty($itemImg) || !empty($timeID)) {
        try {
            $dbh = new PDO("mysql:host=localhost;dbname=$database", $username, $password); // Connecting, selecting database
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // SQL errors will not be silent

                $stmt = $dbh->prepare(" INSERT INTO items (itemName,itemTxt,AddressOne,AddressTwo,Postcode,itemImg, timeID) VALUES (:itemName,:itemTxt,:a1,:a2,:pc,:img,:timeID)");
                $stmt->bindParam(':itemName', $itemName);
                $stmt->bindParam(':itemTxt', $itemTxt);
                $stmt->bindParam(':a1', $addOne);
                $stmt->bindParam(':a2', $addTwo);
                $stmt->bindParam(':pc', $postcode);
                $stmt->bindParam(':img', $itemImg);
                $stmt->bindParam(':timeID', $timeID);
                $result = $stmt->execute();
                if($result === true){
                    $insert_status['status'] = true;

                }else{
                    $insert_status['status'] = false;

                }
                 echo json_encode($insert_status);
            $dbh = null; // Closing connection after success
        }


        catch (PDOException $e) {
            $dbh = null; // Closing connection if some error has occured
            $errorMessage['data'] = 'failed';
            echo json_encode($errorMessage);
            print "Error!: " . $e->getMessage() . "<br/>"; // WARNING - error messages are potential security weakness on production sites
            print "PHP Line Number: " . $e->getLine() . "<br/>";
            print "PHP File: " . $e->getFile() . "<br/>";
            die();
        }
    }else{
        $insert_status['status'] = false;
        $errorMessage['message'] = 'No data';
        echo json_encode($errorMessage);
        echo json_encode($insert_status);
    }



