<?php
include('../common/session.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $groupType = $_POST["group-type"];
  $sql = "";
  if($groupType == "all") {
    $sql = "SELECT * FROM `user_info` WHERE `user_info`.`status` = 'A' ORDER BY `user_info`.`id`";
  } else {
    $sql = "SELECT * FROM `user_info` WHERE `user_info`.`status` = 'A' AND `user_info`.`workgroup` = '$groupType' ORDER BY `user_info`.`id`";
  }

  if($result = mysqli_query($mysqlConnection, $sql)) {
    $resultArray = array();
    while ($row = $result->fetch_row()) {
      array_push($resultArray, $row );
    }
    echo json_encode($resultArray);
  }
}
