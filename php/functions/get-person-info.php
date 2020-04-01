<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
// Get user profile from database
  $uid = $_POST["uid"];
  $sql = "SELECT * FROM user_info WHERE id = '$uid'";
  $result = mysqli_query($mysqlConnection, $sql);
  $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

  $userId = $row['id'];
  $userFullName = $row['fullname'];
  $userNickName = $row['nick_name'];
  $userRole = $row['role'];
  $userWorkgroup = $row['workgroup'];
}