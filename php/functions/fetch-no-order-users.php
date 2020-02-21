<?php
include('../common/session.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $date = $_POST['date'];
  $sql = "SELECT `id`,`fullname`,`workgroup` FROM `user_info` WHERE `user_info`.`id` NOT IN (SELECT `user_id` FROM `menu_collection` WHERE `menu_collection`.`date` = '$date') ORDER BY `user_info`.`workgroup`";
  if($result = mysqli_query($mysqlConnection, $sql)) {
    $resultArray = array();
    while ($row = $result->fetch_row()) {
      array_push($resultArray, $row );
//      for($i = 0; $i < count($resultArray); $i++ ) {
//        for($j = 0; $j < count($resultArray); $j++ ) {
//          $resultArray[$i][$j] = strval($resultArray[$i][$j]);
//        }
//      }
    }
    echo json_encode($resultArray);
  }
}