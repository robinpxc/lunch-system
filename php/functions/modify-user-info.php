<?php
include '../common/session.php';

$pwdHasher = new PasswordHash(8, false);

$id = $_POST["id"];
$fullname = mysqli_real_escape_string($mysqlConnection, $_POST["username"]);
$nickname = mysqli_real_escape_string($mysqlConnection, $_POST['nickname']);
$password = mysqli_real_escape_string($mysqlConnection, $pwdHasher->HashPassword($_POST["password"]));
$role = $_POST["role"];
$workgroup = $_POST["workgroup"];


echo 1;
