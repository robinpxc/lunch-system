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
        } else {
          echo(json_encode("status-failed"));
        }
      } else if ($userStatus == "D") {
        echo(json_encode("status-deleted"));
      }
    } else {
      echo(json_encode("status-not-exist"));
    }
  }
}
