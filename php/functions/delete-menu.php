<?php
include('../common/config.php');

$date = $_POST['date'];
$sql_del_menu = "DELETE FROM `lunch_menu` WHERE `date` = '$date'";
$result = mysqli_query($mysqlConnection, $sql_del_menu);

echo(json_encode($result));