<?php
include('../common/session.php');

  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $menu_num = $_POST['order-number'];
    $date = $_POST['order-date'];
    $user_id = $_SESSION['lunch_user_session'];

    $order_sql = "INSERT INTO `menu_collection`(`date`,`user_id`,`menu_number`) VALUES ('$date', '$user_id', '$menu_num')";

    echo(json_encode(mysqli_query($mysqlConnection, $order_sql)));
  }


