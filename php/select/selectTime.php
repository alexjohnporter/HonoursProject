<?php
include '../core/dbinfo.php';
include '../functions/sanitize.php';
$q = sanitizeForm(isset($_GET['q']) ? $_GET['q'] : null);

    if($q==null) {
        $stmt = $dbh->prepare('SELECT * FROM timing;');
    }else{
        $stmt = $dbh->prepare('SELECT * FROM timing  WHERE timeID = :timeID;');
        $stmt->bindParam(':timeID', $q);
    }
    $stmt->execute();
    $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
    // convert to json
    $json = json_encode($result);
    //echo '{"item":'.$json.'}';
    echo $json;

    $dbh = null; // Closing connection after success
