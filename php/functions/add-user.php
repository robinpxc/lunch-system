<?php
include('../common/session.php');

$pwdHasher = new PasswordHash(8, false);

$nickname = mysqli_real_escape_string($mysqlConnection, $_POST['nickname']);
$fullname = mysqli_real_escape_string($mysqlConnection, $_POST['username']);
$password = mysqli_real_escape_string($mysqlConnection, $pwdHasher->HashPassword($_POST['password']));
$role = $_POST['role'];
$workgroup = $_POST['workgroup'];

$sql_check_user_name = "SELECT * FROM `user_info` WHERE (`nick_name` = '$nickname' AND `id` <> '$login_session')";
$checkResult = mysqli_query($mysqlConnection, $sql_check_user_name);
$row = mysqli_fetch_array($checkResult, MYSQLI_ASSOC);

if ($row) {
    echo 2;
} else {
    $insert_sql = "INSERT INTO `user_info` (`id`, `nick_name`, `fullname`, `password`, `role`, `workgroup`) VALUES (NULL, '$nickname', '$fullname', '$password', '$role', '$workgroup')";
    $insertResult = mysqli_query($mysqlConnection, $insert_sql);
    echo 1;
}
