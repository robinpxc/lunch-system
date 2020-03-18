<?php
include('../common/config.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // username and password sent from form
  $myLoginInfo = mysqli_real_escape_string($mysqlConnection, $_POST['login-info']);
  $myLoginPwd = mysqli_real_escape_string($mysqlConnection, $_POST['login-pwd']);
  $sql = "SELECT * FROM `user_info` WHERE (`id` = '$myLoginInfo' OR `nick_name` = '$myLoginInfo')";
  $result = mysqli_query($mysqlConnection, $sql);
  if (isset($result)) {
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    if (isset($row)) {
      $userId = $row['id'];
      $userPassword = $row['password'];
      $userStatus = $row['status'];

      if ($userStatus == "A") {
        $pwdHasher = new PasswordHash(8, FALSE);
        // If result matched $myUsername and $myLoginPwd, table row must be 1 row
        if ($pwdHasher->CheckPassword($myLoginPwd, $userPassword)) {
          $_SESSION['lunch_user_session'] = $userId;
          echo(json_encode("status-success"));
          //header("location: user-main.php");
        } else {
          echo(json_encode("status-failed"));
          //echo "<script>alert('密码错误！')</script>";
        }
      } else if ($userStatus == "D") {
        echo(json_encode("status-deleted"));
        //echo "<script>alert('账户已删除，请联系804小潘(85252796/15268571882)')</script>";
      }
    } else {
      echo(json_encode("status-not-exist"));
      //echo "<script>alert('账户不存在，请联系804小潘(85252796/15268571882)')</script>";
    }
  }
}
