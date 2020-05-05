<?php
include('../common/session.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $userId = $_POST["user-id"];
  $date = $_POST["date"];
  $count = $_POST["count"];
  $sql = "";
  if($count == "" || $count == null) {
    $sql = "SELECT `menu_collection`.`count` FROM `menu_collection` WHERE `menu_collection`.`user_id` = '$userId' AND `menu_collection`.`date`='$date'";
    $result = mysqli_query($mysqlConnection, $sql);
    if(isset($result)) {
      $row = $result->fetch_row();
      print_r(json_encode($row));
    }
  } else {
    $sql = "UPDATE `menu_collection` SET `menu_collection`.`count` = '$count' WHERE `menu_collection`.`user_id` = '$userId' AND `menu_collection`.`date`='$date'";
    $result = mysqli_query($mysqlConnection, $sql);
    if(isset($result)) {
      print_r(json_encode($result));
    }
  }
}