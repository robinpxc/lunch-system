<?php
include('../common/session.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $user_id = $_POST["userId"];
  $sql_mark_del = "UPDATE `user_info` SET `user_info`.`status` = 'D' WHERE `user_info`.`id` = '$user_id'";
  if($delete_result = mysqli_query($mysqlConnection, $sql_mark_del)) {
    echo json_encode("success");
  } else {
    echo json_encode("fail");
  }
}
?>