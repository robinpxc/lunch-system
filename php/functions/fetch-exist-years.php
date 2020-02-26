<?php
include('../common/session.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $sql = "SELECT DISTINCT YEAR(`menu_collection`.`date`) FROM `menu_collection`";
  $result = mysqli_query($mysqlConnection, $sql);
  $resultArray = array();
  while ($row = $result->fetch_row()) {
    array_push($resultArray, $row );
  }
  echo json_encode($resultArray);
}
