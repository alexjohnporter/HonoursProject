<?php
include '../core/dbinfo.php';
include '../functions/sanitize.php';

Header('Content-Type: application/json; charset=UTF8');
$name = sanitizeForm(isset($_POST['reviewer-name']) ? $_POST['reviewer-name'] : "");
$email = sanitizeForm(isset($_POST['reviewer-email']) ? $_POST['reviewer-email'] : "");
$comment = sanitizeForm(isset($_POST['review-comment']) ? $_POST['review-comment'] : "");
$ip = sanitizeForm(isset($_POST['reviewer-ip']) ? $_POST['reviewer-ip'] : "");
$itemID = sanitizeForm(isset($_POST['review-item-id']) ? $_POST['review-item-id'] : "");


//ensure all data is collected
$checkEmail = filter_var($email, FILTER_VALIDATE_EMAIL);
$checkIP = filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4);
if ($checkIP){
    $ip = ip2long($ip);
}
if(!$checkEmail || !$checkIP){
    $response_array['status'] = '3';
    echo json_encode($response_array);
    return false;
}else {

    if (!empty($name) && !empty($email) && !empty($comment) && !empty($ip) && !empty($itemID)) {
        try {
            $dbh = new PDO("mysql:host=localhost;dbname=$database", $username, $password);
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // SQL errors will not be silent

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
        function checkReviewExists($dbh, $ip, $itemID)
        {
            $stmt = $dbh->prepare("SELECT reviewID FROM reviews WHERE reviewIP = :ip AND itemID=:itemID");
            $stmt->bindParam(':ip', $ip);
            $stmt->bindParam(':itemID', $itemID);
            $stmt->execute();
            $result = $stmt->rowCount();
            if ($result > 0) {
                return false;
            } else {
                return true;
            }
        }

        $reviewExists = checkReviewExists($dbh, $ip, $itemID);

        if (!$reviewExists) {
            $response_array['status'] = '0';
            echo json_encode($response_array);

        } else {

            $stmt = $dbh->prepare("INSERT INTO reviews (reviewIP, reviewerName, reviewerEmail, reviewComment,itemID) VALUES (:ip, :name, :email, :comment, :itemID);");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':comment', $comment);
            $stmt->bindParam(':ip', $ip);
            $stmt->bindParam(':itemID', $itemID);
            $stmt->execute();
            $dbh = null;
            $response_array['status'] = '1';
            echo json_encode($response_array);

        }
    } else {
        $response_array['status'] = '2';
        // echo 'No data collected';
        echo json_encode($response_array);

    }
}






