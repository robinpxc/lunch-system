<?php
include('../common/session.php');
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['date'];
    $user_id = $_POST['user-id'];
    $order_number = $_POST['order-number'];
    $order_status = $_POST['order-status'];
    $order_count = $_POST['order-count'];
    $order_sql = "";

    if($order_status == "ORDER_EXIST") {
      $order_sql = "UPDATE `menu_collection` SET `menu_collection`.`menu_number` = '$order_number', `menu_collection`.`count` = '$order_count' WHERE `date` = '$date' AND `user_id` = $user_id";
    } else if($order_status == "NOT_ORDER") {
      if($order_number == 8) {
        $order_count = 0;
      }
      $order_sql = "INSERT INTO `menu_collection`(`menu_collection`.`date`, `menu_collection`.`user_id`, `menu_collection`.`menu_number`, `menu_collection`.`count`) VALUES ('$date', '$user_id', '$order_number', '$order_count')";
    }
    $result = mysqli_query($mysqlConnection, $order_sql);
    print_r(json_encode($result));
  }