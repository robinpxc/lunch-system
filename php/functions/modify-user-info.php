<?php
include '../common/session.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pwdHasher = new PasswordHash(8, false);

    $oldId = $_POST['oldid'];
    $id = $_POST['id'];
    // $fullname = mysqli_real_escape_string($mysqlConnection, $_POST['fullname']);
    // $nickname = mysqli_real_escape_string($mysqlConnection, $_POST['nickname']);
    

    $role = $_POST['role'];
    $workgroup = $_POST['workgroup'];

    // if(isset($_POST['password'])) {
    //     echo 1;
    // } else {
    //     echo 0;
    // }
    echo 123456;

} 