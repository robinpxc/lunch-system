<?php
include('../Common/config.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $date = $_POST['date'];
  $menuArray = json_decode($_POST['menu-list']);  
    
  if($menuArray != null) {
    if(isMenuExist($date)) {
      echo json_encode(updateMenu(json_encode($menuArray)));
    } else {
      echo json_encode(createMenu($date, json_encode($menuArray)));
    }
  } else {
    echo json_encode("failure");
  }
}

function isMenuExist($date) {
  global $mysqlConnection;
  $sql_check_menu = "SELECT * FROM `lunch-menu` WHERE `lunch-menu`.`date` = '$date'";
  $result = mysqli_query($mysqlConnection, $sql_check_menu);
  $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
  return $row;
}

function createMenu($date, $menu_list) {
  global $mysqlConnection;
  $sql_create_menu = "INSERT INTO `lunch-menu` (`date`,`menu-list`) VALUES('$date', '$menu_list')";
  $result = mysqli_query($mysqlConnection, $sql_create_menu);
  return $result;
}

function updateMenu($menu_list) {
  global $mysqlConnection;
  $sql_update_menu = "UPDATE `lunch-menu` SET `menu-list` = '$menu_list'";
  $result = mysqli_query($mysqlConnection, $sql_update_menu);
  return $result;
}
