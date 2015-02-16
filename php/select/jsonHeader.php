<?php
include '../core/dbinfo.php';
	$stmt= $dbh->prepare('SELECT * FROM header');
	$stmt->execute();
	$result = $stmt->fetchAll( PDO::FETCH_ASSOC );
        // convert to json
    $json = json_encode($result);
		 //echo '{"item":'.$json.'}';
		 echo $json;
	$dbh = null; // Closing connection after success

?>

