<?php
include('../common/session.php');

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $menu_num = $_POST['order-number'];
    $date = $_POST['order-date'];
    $order_status = $_POST['order-status'];
    $user_id = $_SESSION['lunch_user_session'];

    if($order_status == "order-exit") {
      $order_sql = "UPDATE `menu_collection` SET `menu_number` = '$menu_num' WHERE `date` = '$date' AND `user_id` = $user_id";
    } else if($order_status == "no-order") {
      $order_sql = "INSERT INTO `menu_collection`(`date`,`user_id`,`menu_number`) VALUES ('$date', '$user_id', '$menu_num')";
    }
    echo(json_encode(mysqli_query($mysqlConnection, $order_sql)));
  }