<?php
include('../common/session.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $date = $_POST['order-date'];
  $type = $_POST['check-type'];
  $user_id = $_SESSION['lunch_user_session'];
  $sql_order_status = "SELECT * FROM `menu_collection` WHERE `date` = '$date' AND `user_id` = '$user_id'";
  $result = mysqli_query($mysqlConnection, $sql_order_status);

  if($type == "order-status") {
    echo(json_encode(mysqli_num_rows($result) == 0 ? "no-order" : "order-exist"));
  } else if($type == "order-content") {
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    echo(json_encode($row));
  }
}





