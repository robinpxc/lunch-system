<?php
include('../common/config.php');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $selected_date = mysqli_real_escape_string($mysqlConnection, $_POST['selected-date']);
  $sql_check_menu_status = "SELECT * FROM `lunch_menu` WHERE `date` = '$selected_date'";
  $result = mysqli_query($mysqlConnection, $sql_check_menu_status);

  $isMenuExist = mysqli_num_rows($result) == 0 ? "no-menu" : "menu-exist";

  echo(json_encode($isMenuExist));
}


