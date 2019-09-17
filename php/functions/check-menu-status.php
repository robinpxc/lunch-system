<?php
  include('config.php');
  $today = mysqli_real_escape_string($mysqlConnection, $_POST['today']);
  $sql_check_menu_status = "SELECT * FROM `lunch-menu` WHERE `date` = '$today'";

  echo(json_encode(mysqli_query($mysqlConnection, $sql_check_menu_status)));

