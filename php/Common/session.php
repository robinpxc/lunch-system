<?php
   include('config.php');
   session_start();
   
   $user_check = $_SESSION['lunch_user_session'];
   
   $ses_sql = mysqli_query($mysqlConnection,"SELECT name FROM user_info WHERE name = '$user_check' ");
   
   $row = mysqli_fetch_array($ses_sql, MYSQLI_ASSOC);
   
   $login_session = $row['name'];
   
   if(!isset($_SESSION['lunch_user_session'])){
      header("location:login.php");
   }
?>