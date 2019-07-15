<!doctype html>
<?php
   include("./php/common/config.php");
   session_start();

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
       // username and password sent from form
       $myloginname = mysqli_real_escape_string($mysqlConnection, $_POST['login_name']);
       $mypassword = mysqli_real_escape_string($mysqlConnection, $_POST['password']);

       //TODO: Add something to encrypt password

       $sql = "SELECT * FROM user_info WHERE name = '$myloginname' AND password = '$mypassword'";
       $result = mysqli_query($mysqlConnection, $sql);
       $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
       $active = $row['active'];

       $count = mysqli_num_rows($result);

       // If result matched $myusername and $mypassword, table row must be 1 row
       if($count == 1)
       {
          //session_register("myloginname");
          $_SESSION['login_user'] = $myloginname;
          header("location: ./php/user_main.php");
       }
       else { echo"<script>alert('Your login name or password is invalid!')</script>"; }
   }
?>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="assets/icons/rice_32x32.ico">

    <title>中午饭吃啥咩？</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="third-party/bootstrap-4.3.1-dist/css/bootstrap.min.css">

    <!-- Custom styles-->
    <link href="css/main.css" rel="stylesheet">
  </head>

  <body class="text-center">
    <form class="form-signin" action="" method="post">
      <div class="title-container mb-4">
        <img class="food_icon" src="assets/images/food.png" alt="Left food icon" description="Food icon left">
        <h1 class="h3 font-weight-normal">中午吃啥?</h1>
        <img class="food_icon" src="assets/images/food-inverse.png" alt="Right food icon" description="Food icon right">
      </div>

      <div class="title-info-container">
        <p>吃饭是一件轻松愉快的事</p>
      </div>

      <label for="inputUsername" class="sr-only">Username</label>
      <input type="text" class="form-control" name='login_name' placeholder="编号(ID)/姓名" required maxlength="45">
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" class="form-control mb-3" name='password' placeholder="吃饭密码" required maxlength="16">
      <!-- <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> 记住我
        </label>
      </div> -->
      <button class="btn btn-lg btn-primary btn-block" type="submit" value="submit">
        <img src="assets/icons/donut_32x32.png" alt="Donut icon" description="Login button icon">&nbsp;进入系统
      </button>

      <div class="quotes">
        <div class="mt-4 mb-1 text-muted">
          <embed src="assets/svgs/food01.svg" type="image/svg+xml" />
          <p>李团长说过：打仗归打仗，饭还是要吃的</p>
        </div>
        <div class="mb-1 text-muted">
          <embed src="assets/svgs/food02.svg" type="image/svg+xml" />
          <p>王者以民为天，而民以食为天</p>
        </div>
        <div class="mb-1 text-muted">
          <embed src="assets/svgs/food03.svg" type="image/svg+xml" />
          <p>让食物成为你的药品，药品应该是你的食物</p>
        </div>
        <div class="mb-1 text-muted">
          <embed src="assets/svgs/food04.svg" type="image/svg+xml" />
          <p>食之过饱，心灵无法容忍躯体；食不果腹，躯体同样无法支撑心灵</p>
        </div>
      </div>

    </form>
  </body>
</html>
