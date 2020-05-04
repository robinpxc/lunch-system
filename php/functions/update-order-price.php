<?php
include('../common/session.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $price = $_POST["price"];
  $type = $_POST["type"];
  $sql = "UPDATE `menu_price` SET `menu_price`.`price`='$price' WHERE `menu_price`.`type`='$type'";
  $result = mysqli_query($mysqlConnection, $sql);

  print_r($result ? json_encode("success") : json_encode("failure"));
}