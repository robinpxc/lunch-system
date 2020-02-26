<?php
include('../common/session.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $date = $_POST['date'];
  $sql_fetch_menu = "SELECT `lunch_menu`.`menu-list` FROM `lunch_menu` WHERE `lunch_menu`.`date` = '$date'";
  $result = mysqli_query($mysqlConnection, $sql_fetch_menu);
  $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
  print_r($row['menu-list']) ;
}




