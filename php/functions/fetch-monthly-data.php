<?php
include('../common/session.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $year = $_POST['year'];
  $month = $_POST['month'];
  $sql = "SELECT `user_info`.`fullname`, `user_info`.`id`, `user_info`.`workgroup`, COUNT(`menu_collection`.`user_id`) FROM `user_info`, `menu_collection` WHERE YEAR(`menu_collection`.`date`) = '$year' AND MONTH(`menu_collection`.`date`) = '$month' AND `menu_collection`.`user_id` = `user_info`.`id` AND `menu_collection`.`menu_number` < 8 GROUP BY `user_info`.`id`";
  if($result = mysqli_query($mysqlConnection, $sql)) {
    $resultArray = array();
    while ($row = $result->fetch_row()) {
      array_push($resultArray, $row);
    }
    echo json_encode($resultArray);
  }
}

