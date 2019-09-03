<?php
include '../common/session.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $pwdHasher = new PasswordHash(8, false);

    $oldid = $_POST['oldid'];
    $id = $_POST['id'];
    $fullname = mysqli_real_escape_string($mysqlConnection, $_POST['fullname']);
    $password = mysqli_real_escape_string($mysqlConnection, $_POST['password']);
    $role = $_POST['role'];
    $workgroup = $_POST['workgroup'];
    $nickname = mysqli_real_escape_string($mysqlConnection, $_POST['nickname']);
    
    if($password === "") {
        $update_sql = "UPDATE `user_info` SET `id` = '$id', `fullname` = '$fullname', `nick_name` = '$nickname', `role` = '$role', `workgroup` = '$workgroup' WHERE `user_info`.`id` = '$oldid'";
    } else {
        $update_sql = "UPDATE `user_info` SET `id` = '$id', `fullname` = '$fullname', `nick_name` = '$nickname', `role` = '$role', `workgroup` = '$workgroup' WHERE `user_info`.`id` = '$oldid'";
    }

    $result = mysqli_query($mysqlConnection, $update_sql);

    if($result === 0 || $result === 1) {
    }

    echo 1;
    
} 