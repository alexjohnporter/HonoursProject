<?php
  include '../core/dbinfo.php';
  include '../functions/sanitize.php';
  $q = sanitizeForm(isset($_GET['q']) ? $_GET['q'] : null);


  if($q==null) {
      $stmt = $dbh->prepare('SELECT * FROM items;');
  }else{
      $stmt = $dbh->prepare('SELECT `items`.*,`timing`.* FROM items LEFT JOIN `timing` ON `items`.`timeID` = `timing`.`timeID` WHERE itemID = :itemID;');
      $stmt->bindParam(':itemID', $q);
  }
	$stmt->execute();
	$result = $stmt->fetchAll( PDO::FETCH_ASSOC );
        // convert to json
    $json = json_encode($result);
		
		 //echo '{"item":'.$json.'}';
		 echo $json;
	
	$dbh = null; // Closing connection after success
?>

