<?php
include('../common/session.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $sql = "SELECT * FROM `user_info` WHERE `user_info`.`status` = 'A'";
  if($result = mysqli_query($mysqlConnection, $sql)) {
    $resultArray = array();
    while ($row = $result->fetch_row()) {
      array_push($resultArray, $row );
    }
    echo json_encode($resultArray);
  }
}
