<?php
include('../common/session.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $date = $_POST['date'];
  $sql = "SELECT `user_info`.`fullname`, `user_info`.`id`, `menu_collection`.`menu_number`, `user_info`.`workgroup` FROM `user_info`, `menu_collection` WHERE `user_info`.`id` = `menu_collection`.`user_id` AND `menu_collection`.`date` = '$date'";
  if($result = mysqli_query($mysqlConnection, $sql)) {
    $resultArray = array();
    while ($row = $result->fetch_row()) {
      array_push($resultArray, $row );
    }
    echo json_encode($resultArray);
  }
}
