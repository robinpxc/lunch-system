<?php
include('../common/session.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $year = $_POST['year'];
  $month = $_POST['month'];
  $sql = "SELECT DISTINCT DAY(`menu_collection`.`date`) FROM `menu_collection` WHERE YEAR(`menu_collection`.`date`) = '$year' AND  MONTH(`menu_collection`.`date`) = '$month'";
  $result = mysqli_query($mysqlConnection, $sql);
  $resultArray = array();
  while ($row = $result->fetch_row()) {
    array_push($resultArray, $row);
  }
  echo json_encode($resultArray);
}
