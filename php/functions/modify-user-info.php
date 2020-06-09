<?php
include('../common/session.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pwdHasher = new PasswordHash(8, false);
    $id = $_POST['id'];
    $fullname = mysqli_real_escape_string($mysqlConnection, $_POST['fullname']);
    $passwordOri = $_POST['password'];
    $password = mysqli_real_escape_string($mysqlConnection, $pwdHasher->HashPassword($passwordOri));
    $role = $_POST['role'];
    $workgroup = $_POST['workgroup'];
    $nickname = mysqli_real_escape_string($mysqlConnection, $_POST['nickname']);
    
    if($passwordOri == "" || $passwordOri == null) {
        $update_sql = "UPDATE `user_info` SET `fullname` = '$fullname', `nick_name` = '$nickname', `role` = '$role', `workgroup` = '$workgroup' WHERE `user_info`.`id` = '$id'";
    } else {
        $update_sql = "UPDATE `user_info` SET `fullname` = '$fullname', `nick_name` = '$nickname', `password` = '$password', `role` = '$role', `workgroup` = '$workgroup' WHERE `user_info`.`id` = '$id'";
    }

    if(mysqli_query($mysqlConnection, $update_sql)) {
        echo("success");
    } else {
        echo("error");
    }
} 