<?php
include('../common/session.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $date = $_POST["date"];
  $sql = "SELECT * FROM `menu_confirm` WHERE `menu_confirm`.`date` = '$date'";
  $result = mysqli_query($mysqlConnection, $sql);
  $resultArray = array();
  while ($row = $result->fetch_row()) {
    array_push($resultArray, $row);
  }
  print_r(json_encode($resultArray));
}
