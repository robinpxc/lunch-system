<?php
require('PasswordHash.php');
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '(Xcblunch)98266');
define('DB_DATABASE', 'user_db');
define('DB_PORT', '3308');
$mysqlConnection = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE,DB_PORT);
mysqli_set_charset($mysqlConnection, "utf8");
session_start();
?>
