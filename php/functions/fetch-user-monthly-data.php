<?php
  include('../common/session.php');
  
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $year = $_POST["year"];
    $month = $_POST["month"];
    $userId = $_POST["user-id"];

    $sql = "SELECT `menu_collection`.`date`, `menu_collection`.`menu_number`,  `menu_collection`.`count` FROM  `menu_collection` WHERE YEAR( `menu_collection`.`date`) = '$year' AND MONTH( `menu_collection`.`date`)  = '$month' AND  `menu_collection`.`user_id` = '$userId'";

    if ($result = mysqli_query($mysqlConnection, $sql)) {
      $resultArray = array();
      while ($row = $result->fetch_row()) {
        array_push($resultArray, $row);
      }
      print_r(json_encode($resultArray));
    }
  }

