<?php
    include('common/session.php');

    $today = date("Y-m-d");
    $check_menu_sql = "SELECT * from `menu` WHERE `date` = '$today'";
    $result = mysqli_query($mysqlConnection, $check_menu_sql);

    $isMenuExist = $result === true ? "menu-exist" : "no-menu";

