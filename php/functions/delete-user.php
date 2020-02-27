<?php
include('../common/session.php');

$user_id = $_GET["user_id"];
$sql_mark_del = "UPDATE `user_info` SET `user_info`.`status` = 'D' WHERE `user_info`.`id` = '$user_id'";
$delete_result = mysqli_query($mysqlConnection, $sql_mark_del);
echo "<script>window.location.href='../admin-user-management.php'</script>";
?>