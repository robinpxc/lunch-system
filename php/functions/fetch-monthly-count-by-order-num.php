<?php
  include('../common/session.php');
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $year = $_POST['year'];
    $month = $_POST['month'];
    $resultArray = array(-1, 0, 0, 0, 0, 0);
    for($i = 1; $i <= 5; $i++) {
      $sql = "SELECT COUNT(`menu_collection`.`menu_number`) FROM `menu_collection` WHERE `menu_collection`.`menu_number` = '$i' AND YEAR(`menu_collection`.`date`) = '$year' AND MONTH(`menu_collection`.`date`) = '$month'";
      if($result = mysqli_query($mysqlConnection, $sql)) {
        while ($row = $result->fetch_row()) {
          $resultArray[$i] = $row;
        }
      }
    }
    echo json_encode($resultArray);
  }
