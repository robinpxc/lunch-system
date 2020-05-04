<?php
include('../common/session.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $sql = "SELECT * FROM `menu_price`";
  $result = mysqli_query($mysqlConnection, $sql);
  $resultArray = array();
  while($row = mysqli_fetch_row($result)) {
    array_push($resultArray, $row);
  }
  print_r(json_encode($resultArray));
}