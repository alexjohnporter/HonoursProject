<?php
include '../core/dbinfo.php';
include '../functions/sanitize.php';
$q = sanitizeForm(isset($_GET['q']) ? $_GET['q'] : null);

    $stmt = $dbh->prepare('SELECT * FROM reviews WHERE itemID = '.$q.';');
    $stmt->execute();
    $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
    // convert to json
    $json = json_encode($result);
    echo $json;
    $dbh = null; // Closing connection after success
?>
