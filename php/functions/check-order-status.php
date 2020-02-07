<?php
include('../common/session.php');

$date = mysqli_real_escape_string($mysqlConnection, $_POST['order-date']);

$user_id = $_SESSION['lunch_user_session'];

$sql_order_status = "SELECT * FROM `menu_collection` WHERE `date` = '$date' AND `user_id` = '$user_id'";
$result = mysqli_query($mysqlConnection, $sql_order_status);

echo json_encode(mysqli_num_rows($result) === 0 ? "no-order" : "order-exist");
