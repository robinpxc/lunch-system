<?php
include('../common/session.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $pwdHasher = new PasswordHash(8, false);
    $id = $_POST['id'];
    $fullname = mysqli_real_escape_string($mysqlConnection, $_POST['fullname']);
    $password = mysqli_real_escape_string($mysqlConnection, $pwdHasher->HashPassword($_POST['password']));
    $role = $_POST['role'];
    $workgroup = $_POST['workgroup'];
    $nickname = mysqli_real_escape_string($mysqlConnection, $_POST['nickname']);
    
    if($password === "") {
        $update_sql = "UPDATE `user_info` SET `fullname` = '$fullname', `nick_name` = '$nickname', `role` = '$role', `workgroup` = '$workgroup' WHERE `user_info`.`id` = '$id'";
    } else {
        $update_sql = "UPDATE `user_info` SET `fullname` = '$fullname', `nick_name` = '$nickname', `password` = '$password', `role` = '$role', `workgroup` = '$workgroup' WHERE `user_info`.`id` = '$id'";
    }

    // $result = mysqli_query($mysqlConnection, $update_sql);

    if(mysqli_query($mysqlConnection, $update_sql)) {
        echo("<script>alert('修改成功！');</script>");
    } else {
        echo("<script>alert('修改失败！');</script>");
    }
} 