<?php
  include('../common/session.php');
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $group = $_POST["group"];
    $sql = "SELECT COUNT(`user_info`.`id`) FROM `user_info` WHERE `user_info`.`workgroup` = '$group'";
    $result = mysqli_query($mysqlConnection, $sql);
    print_r(json_encode($result->fetch_row()));
  }
