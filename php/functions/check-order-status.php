<?php
include('../common/session.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $date = $_POST['order-date'];
  $type = $_POST['check-type'];
  $user_id = $_POST['user-id'];
  if($user_id == "session") {
    $user_id = $_SESSION['lunch_user_session'];
  }
  $sql_order_status = "SELECT * FROM `menu_collection` WHERE `menu_collection`.`date` = '$date' AND `menu_collection`.`user_id` = '$user_id'";
  $result = mysqli_query($mysqlConnection, $sql_order_status);
  if (!$result) {
    printf("Error: %s\n", mysqli_error($mysqlConnection));
    exit();
  } else {
    if($type == "TYPE_ORDER_STATUS") {
      echo(json_encode(mysqli_num_rows($result) == 0 ? "NO_ORDER" : "ORDER_EXIST"));
    } else if($type == "TYPE_ORDER_CONTENT") {
      $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
      echo(json_encode($row));
    }
  }
}





