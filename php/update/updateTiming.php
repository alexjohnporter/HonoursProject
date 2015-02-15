<?php
include '../core/dbinfo.php';
include '../functions/sanitize.php';

$mon = sanitizeForm(isset($_POST['mon']) ? $_POST['mon'] : null);
$monClose = sanitizeForm(isset($_POST['mon-close']) ? $_POST['mon-close'] : null);
$tues = sanitizeForm(isset($_POST['tues']) ? $_POST['tues'] : null);
$tuesClose = sanitizeForm(isset($_POST['tues-close']) ? $_POST['tues-close'] : null);
$wed = sanitizeForm(isset($_POST['wed']) ? $_POST['wed'] : null);
$wedClose = sanitizeForm(isset($_POST['wed-close']) ? $_POST['wed-close'] : null);
$thurs = sanitizeForm(isset($_POST['thurs']) ? $_POST['thurs'] : null);
$thursClose = sanitizeForm(isset($_POST['thurs-close']) ? $_POST['thurs-close'] : null);
$fri = sanitizeForm(isset($_POST['fri']) ? $_POST['fri'] : null);
$friClose = sanitizeForm(isset($_POST['fri-close']) ? $_POST['fri-close'] : null);
$sat = sanitizeForm(isset($_POST['sat']) ? $_POST['sat'] : null);
$satClose = sanitizeForm(isset($_POST['sat-close']) ? $_POST['sat-close'] : null);
$sun = sanitizeForm(isset($_POST['sun']) ? $_POST['sun'] : null);
$sunClose = sanitizeForm(isset($_POST['sun-close']) ? $_POST['sun-close'] : null);
$sunClose = sanitizeForm(isset($_POST['sun-close']) ? $_POST['sun-close'] : null);
$timeID = sanitizeForm(isset($_POST['time-id-update']) ? $_POST['time-id-update'] : null);

if (!empty($mon) || !empty($monClose)|| !empty($tues) || !empty($tuesClose)||!empty($wed) || !empty($wedClose)||!empty($thurs) || !empty($thursClose)||!empty($fri) || !empty($friClose)||!empty($sat) || !empty($satClose)|| !empty($sun) || !empty($sunClose) || !empty($timeID)) {
    try {
        $dbh = new PDO("mysql:host=localhost;dbname=$database", $username, $password); // Connecting, selecting database
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // SQL errors will not be silent
        $stmt = $dbh->prepare("UPDATE timing SET
                                        Mon = :mon,
                                        MonClose = :monClose,
                                        Tues = :tues,
                                        TuesClose = :tuesClose,
                                        Wed = :wed,
                                        WedClose = :wedClose,
                                        Thurs = :thurs,
                                        ThursClose = :thursClose,
                                        Fri = :fri,
                                        FriClose = :friClose,
                                        Sat = :sat,
                                        SatClose = :satClose,
                                        Sun = :sun,
                                        SunClose = :sunClose
                                        WHERE timeID= :timeID");
        $stmt->bindParam(':mon', $mon);
        $stmt->bindParam(':monClose', $monClose);
        $stmt->bindParam(':tues', $tues);
        $stmt->bindParam(':tuesClose', $tuesClose);
        $stmt->bindParam(':wed', $wed);
        $stmt->bindParam(':wedClose', $wedClose);
        $stmt->bindParam(':thurs', $thurs);
        $stmt->bindParam(':thursClose', $thursClose);
        $stmt->bindParam(':fri', $fri);
        $stmt->bindParam(':friClose', $friClose);
        $stmt->bindParam(':sat', $sat);
        $stmt->bindParam(':satClose', $satClose);
        $stmt->bindParam(':sun', $sun);
        $stmt->bindParam(':sunClose', $sunClose);
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