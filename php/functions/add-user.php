<?php
include('../common/session.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
    echo json_encode("nickname-exist");
  } else {
    $insert_sql = "INSERT INTO `user_info` (`nick_name`, `fullname`, `password`, `role`, `workgroup`) VALUES ('$nickname', '$fullname', '$password', '$role', '$workgroup')";
    mysqli_query($mysqlConnection, $insert_sql);
    echo json_encode("success");
  }
}

