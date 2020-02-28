<?php
include('../common/session.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $year = $_POST['year'];
  $sql = "SELECT DISTINCT MONTH(`menu_collection`.`date`) FROM `menu_collection` WHERE YEAR(`menu_collection`.`date`) = '$year'";
  $result = mysqli_query($mysqlConnection, $sql);
  $resultArray = array();
  while ($row = $result->fetch_row()) {
    array_push($resultArray, $row);
  }
  echo json_encode($resultArray);
}
