<?php
   define('DB_SERVER', 'localhost');
   define('DB_USERNAME', 'root');
   define('DB_PASSWORD', 'xcb123');
   define('DB_DATABASE', 'user_db');
   $mysqlConnection = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
   mysqli_set_charset($mysqlConnection, "utf8");

   session_start();
?>
