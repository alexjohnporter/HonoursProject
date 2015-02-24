<?php
$username="root";
$password="";
$database="museums";
try {
    $dbh = new PDO("mysql:host=localhost;dbname=$database", $username, $password);
    //$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // SQL errors will not be silent

} catch (PDOException $e) {
    $dbh = null; // Closing connection if some error has occurred
    $errorMessage['data'] = 'failed';
    echo json_encode($errorMessage);
    die();
}
