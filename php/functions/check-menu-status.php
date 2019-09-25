<?php
  include('config.php');

  $selected_date = mysqli_real_escape_string($mysqlConnection, $_POST['selected-date']);
  $sql_check_menu_status = "SELECT * FROM `lunch-menu` WHERE `date` = '$selected_date'";
  $result = mysqli_query($mysqlConnection, $sql_check_menu_status);
  $isMenuExist = $result === true ? "menu-exist" : "no-menu";

  echo(json_encode($isMenuExist));
  //echo json_encode("menu-exist");

