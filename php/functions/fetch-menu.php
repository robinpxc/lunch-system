<?php
include('../Common/config.php');

echo json_encode(fetchMenuData());

function fetchMenuData() {
  global $mysqlConnection;
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['date'];
    $sql_fetch_menu = "SELECT `menu-list` FROM `lunch-menu` WHERE `date` = '$date'";
    $result = mysqli_query($mysqlConnection, $sql_fetch_menu);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    return $row['menu-list'];
  }
}
