<!DOCTYPE html>
<?php
  include('common/session.php');
  
  // Connect database
  echo $login_session;
  $sql = "SELECT * FROM user_info WHERE id = '$login_session'";
  $result = mysqli_query($mysqlConnection, $sql);
  $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

  $userId = $row['id'];
  $userFullName = $row['fullname'];
?>

<html lang="zh">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="icon" href="../assets/icons/rice_32x32.ico">

  <title>个人设置</title>

  <!-- Style sheets-->
  <!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="../third-party/bootstrap-4.3.1-dist/css/bootstrap.min.css">
  <!-- Custom styles-->
  <link href="../css/user_main.css" rel="stylesheet">

  <!--Java Script-->
  <script type="text/javascript" src="../third-party/popper.min.js"></script>
  <script type="text/javascript" src="../third-party/jquery-3.4.1.min.js"></script>
  <script type="text/javascript" src="../third-party/bootstrap-4.3.1-dist/js/bootstrap.min.js"></script>

  <script type="text/javascript" src="../js/common/common.js"></script>
  <script type="text/javascript" src="../js/user_main.js"></script>
  <script type="text/javascript" src="../js/admin.js"></script>

</head>

<body class="d-block">
  <header class="header d-inline-block border-bottom shadow-sm bg-light">
    <nav class="navbar">
      <span class="navbar-brand" href="#">
        <div class="time-module d-flex align-items-center justify-content-center">
          <span class="d-block">
            <svg class="icon-sm" viewBox="0 0 1024 1024">
              <path d="M512 64C264.96 64 64 264.96 64 512s200.96 448 448 448 448-200.96 448-448S759.04 64 512 64z m0 831.712c-211.584 0-383.712-172.16-383.712-383.712 0-211.584 172.128-383.712 383.712-383.712 211.552 0 383.712 172.128 383.712 383.712 0 211.552-172.16 383.712-383.712 383.712z" p-id="2222"></path>
              <path d="M671.968 512H512V288.064c0-17.76-14.24-32.128-32-32.128s-32 14.4-32 32.128V544c0 17.76 14.272 32 32 32h191.968c17.76 0 32.128-14.24 32.128-32s-14.368-32-32.128-32z" p-id="2223"></path>
            </svg>
            &nbsp;&nbsp;
          </span>

          <span class="d-bolck">
            <span id="current_date"></span>
            <br>
            <span id="current_time"></span>
          </span>
        </div>
      </span>
      <button class="btn btn-danger dropdown-toggle" type="button" data-toggle="collapse" data-target="#nav-bar-list" aria-controls="nav-bar-list" aria-expanded="false" aria-label="Toggle navigation">
        <span>操作</span>
      </button>

      <div class="collapse navbar-collapse" id="nav-bar-list">
        <ul class="navbar-nav mr-auto">
          <div class="dropdown-divider"></div>
          <li class="nav-item active">
            <a class="nav-link" href="user_main.php">
              <span class="d-flex justify-content-left align-items-center">
                <svg class="icon-sm" viewBox="0 0 1024 1024" version="1.1">
                  <path d="M 213.923 925.274 l 135.206 0 c 65.9183 0 119.627 -52.1477 127.431 -119.19 L 86.521 806.085 C 94.2972 873.127 148.067 925.274 213.923 925.274 L 213.923 925.274 Z M 349.129 511.441 L 213.923 511.441 c -65.8242 0 -119.563 52.117 -127.37 119.126 l 390.008 0 C 468.722 563.558 415.015 511.441 349.129 511.441 L 349.129 511.441 Z M 63.3831 785.666 l 431.601 0 L 494.984 661.294 L 63.3831 661.294 L 63.3831 785.666 L 63.3831 785.666 Z M 902.197 273.284 l -141.421 0 l 17.7994 -98.2671 l 119.343 0 c 21.297 0 38.5643 -18.1422 38.5643 -40.5618 c 0 -22.3582 -17.299 -40.5311 -38.5643 -40.5311 L 749.036 93.9242 c -0.531096 0 -1.03149 0.313132 -1.53087 0.313132 c -15.2381 0 -29.6319 9.42977 -35.7206 25.1058 l -25.8231 142.232 c -1.49914 3.84047 -1.78055 7.77508 -2.12336 11.6473 l -173.553 0 c -31.1627 0 -56.5172 26.6039 -56.5172 59.4213 s 25.292 59.4224 56.5172 59.4224 l 4.09118 0 l 52.427 532.772 l 278.877 0 l 52.427 -532.772 l 4.05946 0 c 31.2559 0 56.5172 -26.6049 56.5172 -59.4224 S 933.486 273.284 902.197 273.284 L 902.197 273.284 Z M 902.197 273.284" p-id="5400" /></svg>
                <span class="dropdown-desc">&nbsp;返回主页</span>
              </span>
            </a>
          </li>
          <div class=" dropdown-divider"></div>
          <li class="nav-item active">
            <a class="nav-link" href="./common/logout.php">
              <span class="d-flex justify-content-left align-items-center">
                <svg class="icon-sm" viewBox="0 0 1024 1024">
                  <path d="M718.2 932.4zM94.8 932.4zM920.1 64zM491.5 960C272.4 960 94.8 782.4 94.8 563.3c0-165.8 101.8-307.9 246.2-367.1v0.1c4.3-1.5 8.9-2.3 13.7-2.3 22.6 0 41.1 18.4 41.1 41 0 17.8-11.4 33.1-27.4 38.7-112.5 47.9-191.5 159.5-191.5 289.6 0 173.8 140.8 314.6 314.6 314.6S806.1 737 806.1 563.3c0-130-78.9-241.7-191.5-289.6-16-5.6-27.3-20.9-27.3-38.7 0-22.7 18.3-41 41-41 4.8 0 9.3 0.8 13.7 2.3v-0.1c144.5 59.3 246.2 201.3 246.2 367.1 0 219.1-177.6 396.7-396.7 396.7z m0-424c-22.6 0-41-18.4-41-41.1V125.5c0-22.6 18.4-41 41-41 22.7 0 41 18.4 41 41V494.8c0 22.8-18.3 41.2-41 41.2z" p-id="3811"></path>
                </svg>
                <span class="dropdown-desc">&nbsp;退出登录</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <div class="profile-form-container mt-5">
    <form class="profile-form" action="" method="post">

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">用户ID</span>
        </div>
        <input type="text" name="user-id" aria-label="user-id" class="form-control" value="<?php echo $userId; ?>" disabled />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">姓名(全名)</span>
        </div>
        <input type="text" name="user-fullname" aria-label="user-fullname" class="form-control" value="<?php echo $userFullName; ?>" disabled />
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">用户名(昵称)</span>
        </div>
        <input type="text" name="user-nickname" aria-label="user-nickname" class="form-control" disabled>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" id="nickname-edit-btn">修改</button>
        </div>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">密码</span>
        </div>
        <input type="password" name="user-password" aria-label="user-password" class="form-control" password>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" id="show-hide-pwd_-btn">
            <svg class="icon-eye" viewBox="0 0 1024 1024">
              <path d="M512 256c-163.8 0-291.4 97.6-448 256 134.8 135.4 248 256 448 256 199.8 0 346.8-152.8 448-253.2C856.4 397.2 709.6 256 512 256zM512 694.6c-98.8 0-179.2-82-179.2-182.6 0-100.8 80.4-182.6 179.2-182.6s179.2 82 179.2 182.6C691.2 612.8 610.8 694.6 512 694.6z" p-id="4687"></path>
              <path d="M512 448c0-15.8 5.8-30.2 15.2-41.4-5-0.8-10-1.2-15.2-1.2-57.6 0-104.6 47.8-104.6 106.6 0 58.8 47 106.6 104.6 106.6s104.6-47.8 104.6-106.6c0-4.6-0.4-9.2-0.8-13.8-11 8.6-24.6 13.8-39.6 13.8C540.6 512 512 483.4 512 448z" p-id="4688"></path>
            </svg>
          </button>
          <button class="btn btn-outline-secondary" type="button" id="password-edit-btn">修改</button>
        </div>
      </div>

      <div class="input-group mb-3">
        <button class="btn btn-lg btn-primary btn-block" type="submit" name="submit-btn" value="submit">提交修改</button>
      </div>
    </form>
  </div>
</body>

</html>