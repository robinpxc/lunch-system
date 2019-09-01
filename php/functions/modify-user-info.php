<?php
include '../common/session.php';

$pwdHasher = new PasswordHash(8, false);

$oldId = $_POST['oldid'];
$id = $_POST["id"];
$fullname = mysqli_real_escape_string($mysqlConnection, $_POST['fullname']);
$nickname = mysqli_real_escape_string($mysqlConnection, $_POST['nickname']);
$password = mysqli_real_escape_string($mysqlConnection, $pwdHasher->HashPassword($_POST['password']));
$role = $_POST['role'];
$workgroup = $_POST['workgroup'];

$update_sql = "UPDATE `user_info` SET `id` = '$id', `fullname` = '$fullname', `nick_name` = '$nickname', `password` = '$password', `role` = '$role', `workgroup` = '$workgroup' WHERE `user_info`.`id` = '$oldid'";
$result = mysqli_query($mysqlConnection, $update_sql);

echo 1; 

