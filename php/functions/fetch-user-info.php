<?php
include('../common/session.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $uid = $_POST['userId'];
  $sql = "SELECT * FROM `user_info` WHERE `user_info`.`id` = '$uid'";
  $result = mysqli_query($mysqlConnection, $sql);
  $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

  echo(json_encode($row));
}