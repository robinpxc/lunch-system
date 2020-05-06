<?php
include('../common/session.php');
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['date'];
    $user_id = $_POST['user-id'];
    $order_number = $_POST['order-number'];
    $order_status = $_POST['order-status'];
    $order_count = 1;

    if($order_status == "ORDERED") {
      $order_sql = "UPDATE `menu_collection` SET `menu_collection`.`menu_number` = '$order_number' WHERE `date` = '$date' AND `user_id` = $user_id";
    } else if($order_status == "NOT_ORDER") {
      if($order_number == 6) {
        $order_count = 0;
      }
      $order_sql = "INSERT INTO `menu_collection`(`date`,`user_id`,`menu_number`, `count`) VALUES ('$date', '$user_id', '$order_number', '$order_count')";
    }
    echo(json_encode(mysqli_query($mysqlConnection, $order_sql)));
  }