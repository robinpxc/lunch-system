<?php
include('common/session.php');

$user_id = $_GET["user_id"];
$delete_sql =  "DELETE FROM user_info WHERE id = '$user_id'";
$delete_result = mysqli_query($mysqlConnection, $delete_sql);
echo "<script>window.location.href='admin_user_management.php'</script>";
?>