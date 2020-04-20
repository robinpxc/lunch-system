<?php
include('../common/session.php');
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['date'];
    $user_id = $_POST['user-id'];
    $menu_num = $_POST['order-number'];
    $order_status = $_POST['order-status'];

    if($order_status == "ORDERED") {
      $order_sql = "UPDATE `menu_collection` SET `menu_number` = '$menu_num' WHERE `date` = '$date' AND `user_id` = $user_id";
    } else if($order_status == "NOT_ORDER") {
      $order_sql = "INSERT INTO `menu_collection`(`date`,`user_id`,`menu_number`) VALUES ('$date', '$user_id', '$menu_num')";
    }
    echo(json_encode(mysqli_query($mysqlConnection, $order_sql)));
  }