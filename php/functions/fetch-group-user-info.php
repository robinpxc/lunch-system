<?php
include('../common/session.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $groupType = $_POST["group-type"];
  $sql = "";
  if($groupType == "all") {
    $sql = "SELECT `user_info`.`fullname`, `user_info`.`id`, `user_info`.`role`, `user_info`.`nick_name`, `user_info`.`workgroup` FROM `user_info` WHERE `user_info`.`status` = 'A' ORDER BY `user_info`.`id`";
  } else {
    $sql = "SELECT `user_info`.`fullname`, `user_info`.`id`, `user_info`.`role`, `user_info`.`nick_name`, `user_info`.`workgroup` FROM `user_info` WHERE `user_info`.`status` = 'A' AND `user_info`.`workgroup` = '$groupType' ORDER BY `user_info`.`id`";
  }

  if($result = mysqli_query($mysqlConnection, $sql)) {
    $resultArray = array();
    while ($row = $result->fetch_row()) {
      array_push($resultArray, $row );
    }
    echo json_encode($resultArray);
  }
}
