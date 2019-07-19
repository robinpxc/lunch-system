<?php
   include('config.php');
   
   $user_check = $_SESSION['lunch_user_session'];

   $ses_sql = mysqli_query($mysqlConnection,"SELECT id FROM user_info WHERE id = '$user_check'");
   $row = mysqli_fetch_array($ses_sql, MYSQLI_ASSOC);
   
   $login_session = $row['id'];
   
   if(!isset($_SESSION['lunch_user_session'])){
      header("location:login.php");
   }
?>