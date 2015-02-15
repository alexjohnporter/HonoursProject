<?php
include '../core/dbinfo.php';
include '../functions/sanitize.php';
$q = sanitizeForm(isset($_GET['q']) ? $_GET['q'] : null);

try {
    $dbh = new PDO("mysql:host=localhost;dbname=$database", $username, $password); // Connecting, selecting database
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // SQL errors will not be silent
    $stmt = $dbh->prepare('SELECT * FROM reviews WHERE itemID = '.$q.';');
    $stmt->execute();
    $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
    // convert to json
    $json = json_encode($result);
    echo $json;
    $dbh = null; // Closing connection after success
}


catch (PDOException $e) {
    $dbh = null; // Closing connection if some error has occured
    print "Error!: " . $e->getMessage() . "<br/>"; // WARNING - error messages are potential security weakness on production sites
    print "PHP Line Number: " . $e->getLine() . "<br/>";
    print "PHP File: " . $e->getFile() . "<br/>";
    die();
}

?>
