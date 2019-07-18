<?php
   include('config.php');
   session_start();
   
   $user_check = $_SESSION['login_user'];
   
   $ses_sql = mysqli_query($mysqlConnection,"SELECT name FROM user_info WHERE name = '$user_check' ");
   
   $row = mysqli_fetch_array($ses_sql, MYSQLI_ASSOC);
   
   $login_session = $row['name'];
   
   if(!isset($_SESSION['login_user'])){
      header("location:login.php");
   }
?>