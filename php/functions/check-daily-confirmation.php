<?php
include('../common/config.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $type = $_POST['type'];
  $date = $_POST['date'];
  $group = $_POST['group'];
  $status = $_POST['status'];
  $sql = "";

  if($type == "CHECK") {
    $sql = "SELECT `menu_confirm`.`confirm_status` FROM `menu_confirm` WHERE `menu_confirm`.`date` = '$date' AND `menu_confirm`.`group` = '$group'";
  } else if($type == "UPDATE") {
    $sql = "UPDATE `menu_confirm` SET `menu_confirm`.`confirm_status` = '$status' WHERE `menu_confirm`.`date` = '$date' AND `menu_confirm`.`group` = '$group'";
  }

  if($sql != "") {
    $result = mysqli_query($mysqlConnection, $sql);
    if($type == "CHECK") {
      $row = $result->fetch_row();
      if($result->num_rows == 0) {
        print_r(json_encode("not-confirmed"));
      } else {
        print_r(json_encode($row));
      }
    } else if($type == "UPDATE") {
      print_r(json_encode($result));
    }
  }
}