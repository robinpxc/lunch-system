<!DOCTYPE html>
<?php
include('common/session.php');

// Get user profile from database
$sql = "SELECT * FROM user_info WHERE id = '$login_session'";
$result = mysqli_query($mysqlConnection, $sql);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);

$userId = $row['id'];
$userFullName = $row['fullname'];
$userNickName = $row['nick_name'];
$userRole = $row['role'];
$userWorkgroup = $row['workgroup'];

// Update modified user profile data to database.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $modifiedNickName = mysqli_real_escape_string($mysqlConnection, $_POST['user-nickname-edit']);
  $modifiedPassword = mysqli_real_escape_string($mysqlConnection, $_POST['user-password-edit']);
  // Encryp password
  $pwdHasher = new PasswordHash(8, FALSE);
  $encrypedPwd = $pwdHasher->HashPassword($modifiedPassword);   

  $sql_check_user_name = "SELECT * FROM user_info WHERE (nick_name = '$modifiedNickName' AND id <> '$userId')";
  $checkResult = mysqli_query($mysqlConnection, $sql_check_user_name);
  $row = mysqli_fetch_array($checkResult, MYSQLI_ASSOC);

  if ($row) {
    echo "<script>alert('该昵称已被他人使用！')</script>";
  } else {
    if ($pwdHasher->CheckPassword($encrypedPwd, $row['password'])) {
      $encrypedPwd = $row['password'];
    }
    $update_sql = "UPDATE user_info SET nick_name = '$modifiedNickName', password = '$encrypedPwd' WHERE id = '$userId'";
    $result = mysqli_query($mysqlConnection, $update_sql);
    header("location: user-profile.php");
  }
}

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
  <link href="../css/user-profile.css" rel="stylesheet">

  <!--Java Script-->
  <script type="text/javascript" src="../third-party/popper.min.js"></script>
  <script type="text/javascript" src="../third-party/jquery-3.4.1.min.js"></script>
  <script type="text/javascript" src="../third-party/bootstrap-4.3.1-dist/js/bootstrap.min.js"></script>

  <script type="text/javascript" src="../js/common/common.js"></script>
  <script type="text/javascript" src="../js/common/profile_form.js"></script>
  <script type="text/javascript" src="../js/user-profile.js"></script>

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
        <span>系统操作</span>
      </button>

      <div class="collapse navbar-collapse" id="nav-bar-list">
        <ul class="navbar-nav mr-auto">
          <div class="dropdown-divider"></div>
          <li class="nav-item active">
            <a class="nav-link" href="user-main.php">
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

  <div class="profile-form-container mt-4">
    <div class="profile-title mb-4">
      <h2>个人信息</h2>
    </div>
    <form class="profile-form" action="" method="post">
      <!-- User ID input field -->
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text item-title">用户ID</span>
        </div>
        <input type="text" name="user-id" aria-label="user-id" class="form-control less-permission-input profile-input" value="<?php echo $userId; ?>" disabled />
        <div class="input-group-append permission-text">
          <span class="input-group-text">无修改权限</span>
        </div>
      </div>

      <!-- User fullname input field -->
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text item-title">姓名</span>
        </div>
        <input type="text" name="user-fullname" aria-label="user-fullname" class="form-control less-permission-input profile-input" value="<?php echo $userFullName; ?>" disabled />
        <div class="input-group-append permission-text">
          <span class="input-group-text">无修改权限</span>
        </div>
      </div>

      <!-- User role -->
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text item-title">用户权限</span>
        </div>
        <input type="text" name="user-role" aria-label="user-role" class="form-control less-permission-input profile-input" value="<?php if ($userRole == "admin") {
                                                                                                                                      echo "管理员(Admin)";
                                                                                                                                    } else {
                                                                                                                                      echo "标准用户(User)";
                                                                                                                                    }  ?>" disabled />
        <div class="input-group-append permission-text">
          <span class="input-group-text">无修改权限</span>
        </div>
      </div>

      <!-- User workgroup -->
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text item-title">所在单位</span>
        </div>
        <input type="text" name="user-workgroup" aria-label="user-workgroup" class="form-control less-permission-input profile-input" value="<?php echo $userWorkgroup; ?>" disabled />
        <div class="input-group-append permission-text">
          <span class="input-group-text">无修改权限</span>
        </div>
      </div>

      <!-- User nickname input field -->
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text item-title">昵称</span>
        </div>
        <input type="text" name="user-nickname-edit" id="nickname-input" aria-label="user-nickname" class="form-control profile-input" value="<?php echo $userNickName; ?>" readonly="readonly" required maxlength="30">
        <div class="input-group-append">
          <button class="btn btn-outline-danger action-btn modify-btn" type="button" id="nickname-edit-btn">修改</button>
        </div>
      </div>

      <!-- User password input field -->
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text item-title">密码</span>
        </div>
        <input type="password" name="user-password-edit" data-options="required:true" aria-label="user-password" class="form-control profile-input" placeholder="点击输入新密码" required readonly="readonly" maxlength="30">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" id="show-hide-pwd-btn" disabled>
            <svg class="icon-eye" id="eye-icon" viewBox="0 0 1024 1024">
              <path d="M512 256c-163.8 0-291.4 97.6-448 256 134.8 135.4 248 256 448 256 199.8 0 346.8-152.8 448-253.2C856.4 397.2 709.6 256 512 256zM512 694.6c-98.8 0-179.2-82-179.2-182.6 0-100.8 80.4-182.6 179.2-182.6s179.2 82 179.2 182.6C691.2 612.8 610.8 694.6 512 694.6z" p-id="4687"></path>
              <path d="M512 448c0-15.8 5.8-30.2 15.2-41.4-5-0.8-10-1.2-15.2-1.2-57.6 0-104.6 47.8-104.6 106.6 0 58.8 47 106.6 104.6 106.6s104.6-47.8 104.6-106.6c0-4.6-0.4-9.2-0.8-13.8-11 8.6-24.6 13.8-39.6 13.8C540.6 512 512 483.4 512 448z" p-id="4688"></path>
            </svg>
            <svg class="icon-eye hide" id="eye-icon-disabled" viewBox="0 0 1024 1024">
              <path d="M752.8 316.6 896 173.2 850.8 128l-155.2 155.2C640 255.4 579 238 512 238c-163.8 0-291.4 104.4-448 274 69.6 74.8 133.6 145.4 206.6 196.2L128 850.8 173.2 896l153.8-153.8c54 27.4 114 43.8 185 43.8 199.8 0 346.8-163.6 448-271C904 446.8 835.2 371.4 752.8 316.6zM332.8 512c0-100.8 80.4-182.6 179.2-182.6 38.6 0 74.4 12.4 103.6 33.8l-101.4 101.4c-1.4-5.2-2.2-10.8-2.2-16.6 0-15.8 5.8-30.2 15.2-41.4-5-0.8-10-1.2-15.2-1.2-57.6 0-104.6 47.8-104.6 106.6 0 17.2 4 33.6 11.2 48L364 614.8C344.4 585.4 332.8 550 332.8 512zM512 694.6c-38.6 0-74.4-12.4-103.6-33.8l54.8-54.8c14.6 8 31.2 12.4 48.8 12.4 57.6 0 104.6-47.8 104.6-106.6 0-4.6-0.4-9.2-0.8-13.8-11 8.6-24.6 13.8-39.6 13.8-5.8 0-11.2-0.8-16.6-2.2l100.6-100.6c19.6 29.2 31.2 64.6 31.2 102.8C691.2 612.8 610.8 694.6 512 694.6z" p-id="9430"></path>
            </svg>
          </button>
          <button class="btn btn-outline-danger action-btn modify-btn " type="button" id="password-edit-btn">修改</button>
        </div>
      </div>

      <div class="input-group mb-3 mt-5">
        <div class="btn-group" role="group" aria-label="Form submit button group">
          <button type="button" class="btn btn-danger mr-1" id="discard-btn" disabled>放弃修改</button>
          <button type="submit" class="btn btn-primary ml-1" id="submit-btn" disabled>提交修改</button>
        </div>
      </div>
    </form>
  </div>
</body>

</html>