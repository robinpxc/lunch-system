<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $date = $_POST['date'];
  $menuArray = json_decode($_POST['menu-list']);  
    
  if($menuArray != null) {
    if(isMenuExist($date)) {
      echo json_encode("TODO UPDATE MENU");
    } else {
      //createMenu($date, $menuArray);
      echo json_encode("666");
      //echo();
    }
    //echo "success";
  } else {
    echo json_encode("failre");
  }
}

function isMenuExist($date) {
  include('../Common/config.php');
  $sql_check_menu = "SELECT * FROM `lunch-menu` WHERE `lunch-menu`.`date` = '$date'";
  $result = mysqli_query($mysqlConnection, $sql_check_menu);
  $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
  return $row;
}

function createMenu($date, $menu) {
  include('../Common/config.php');
  $sql_create_menu = "INSERT INTO `lunch-menu` (`date`,`menu-list`) VALUES('$date', '$menu')";
  $result = mysqli_query($mysqlConnection, $sql_create_menu);
  //return $result;
}

function updateMenu() {
  
}
