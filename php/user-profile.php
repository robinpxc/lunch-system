<!DOCTYPE html>
<?php
include('common/session.php');
?>

<html lang="zh">

<head>
  <meta charset="utf-8">
  <!-- Adapt Apple devices, disable finger touch move events -->
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
  <meta content="yes" name="apple-mobile-web-app-capable">
  <meta content="black" name="apple-mobile-web-app-status-bar-style">
  <meta content="telephone=no" name="format-detection">
  <link rel="icon" href="../assets/icons/rice_32x32.ico">

  <title>个人设置</title>

  <!-- Style sheets-->
  <!-- Third Party -->
  <link rel="stylesheet" href="../third-party/bootstrap-4.3.1-dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../third-party/jquery-confirm/jquery-confirm.min.css">
  <!-- Custom -->
  <link href="../css/user-profile.css" rel="stylesheet">

  <!-- Java Script -->
  <!-- Third Party -->
  <script type="text/javascript" src="../third-party/popper.min.js"></script>
  <script type="text/javascript" src="../third-party/jquery-3.4.1.min.js"></script>
  <script type="text/javascript" src="../third-party/fontawesome/js/all.min.js"></script>
  <script type="text/javascript" src="../third-party/bootstrap-4.3.1-dist/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="../third-party/jquery.cookie.js"></script>
  <script type="text/javascript" src="../third-party/jquery-confirm/jquery-confirm.min.js"></script>
  <!-- Common -->
  <script type="text/javascript" src="../js/common/common.js"></script>
  <script type="text/javascript" src="../js/common/profile-form.js"></script>
  <script type="text/javascript" src="../js/common/common-constants.js"></script>
  <script type="text/javascript" src="../js/common/common-user.js"></script>
  <script type="text/javascript" src="../js/common/common-confirm-dialog.js"></script>
  <!-- Custom -->
  <script type="text/javascript" src="../js/user-profile.js"></script>

</head>

<body class="d-block">
<header class="header d-inline-block border-bottom shadow-sm bg-light">
  <nav class="navbar">
      <span class="navbar-brand" href="#">
        <div class="time-module d-flex align-items-center justify-content-center">
          <span class="d-block">
            <svg class="icon-sm" viewBox="0 0 1024 1024">
              <path
                  d="M512 64C264.96 64 64 264.96 64 512s200.96 448 448 448 448-200.96 448-448S759.04 64 512 64z m0 831.712c-211.584 0-383.712-172.16-383.712-383.712 0-211.584 172.128-383.712 383.712-383.712 211.552 0 383.712 172.128 383.712 383.712 0 211.552-172.16 383.712-383.712 383.712z"
                  p-id="2222"></path>
              <path
                  d="M671.968 512H512V288.064c0-17.76-14.24-32.128-32-32.128s-32 14.4-32 32.128V544c0 17.76 14.272 32 32 32h191.968c17.76 0 32.128-14.24 32.128-32s-14.368-32-32.128-32z"
                  p-id="2223"></path>
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
    <button class="btn btn-danger dropdown-toggle btn-sys-config" type="button" data-toggle="collapse"
            data-target="#nav-bar-list" aria-controls="nav-bar-list" aria-expanded="false"
            aria-label="Toggle navigation">
      <span>系统操作</span>
    </button>

    <div class="collapse navbar-collapse" id="nav-bar-list">
      <div class="common-nav">
        <ul class="navbar-nav mr-auto">
          <div class="dropdown-divider"></div>
          <li class="nav-item active">
            <a class="nav-link" href="user-main.php">
              <span class="d-flex justify-content-left align-items-center">
                <svg class="icon-sm" viewBox="0 0 1024 1024" version="1.1">
                  <path
                      d="M 213.923 925.274 l 135.206 0 c 65.9183 0 119.627 -52.1477 127.431 -119.19 L 86.521 806.085 C 94.2972 873.127 148.067 925.274 213.923 925.274 L 213.923 925.274 Z M 349.129 511.441 L 213.923 511.441 c -65.8242 0 -119.563 52.117 -127.37 119.126 l 390.008 0 C 468.722 563.558 415.015 511.441 349.129 511.441 L 349.129 511.441 Z M 63.3831 785.666 l 431.601 0 L 494.984 661.294 L 63.3831 661.294 L 63.3831 785.666 L 63.3831 785.666 Z M 902.197 273.284 l -141.421 0 l 17.7994 -98.2671 l 119.343 0 c 21.297 0 38.5643 -18.1422 38.5643 -40.5618 c 0 -22.3582 -17.299 -40.5311 -38.5643 -40.5311 L 749.036 93.9242 c -0.531096 0 -1.03149 0.313132 -1.53087 0.313132 c -15.2381 0 -29.6319 9.42977 -35.7206 25.1058 l -25.8231 142.232 c -1.49914 3.84047 -1.78055 7.77508 -2.12336 11.6473 l -173.553 0 c -31.1627 0 -56.5172 26.6039 -56.5172 59.4213 s 25.292 59.4224 56.5172 59.4224 l 4.09118 0 l 52.427 532.772 l 278.877 0 l 52.427 -532.772 l 4.05946 0 c 31.2559 0 56.5172 -26.6049 56.5172 -59.4224 S 933.486 273.284 902.197 273.284 L 902.197 273.284 Z M 902.197 273.284"
                      p-id="5400"/></svg>
                <span class="dropdown-desc">&nbsp;返回主页</span>
              </span>
            </a>
          </li>
          <div class=" dropdown-divider"></div>
          <li class="nav-item logout-btn active">
            <a class="nav-link" href="./common/logout.php">
              <span class="d-flex justify-content-left align-items-center">
                <svg class="icon-sm" viewBox="0 0 1024 1024">
                  <path
                      d="M718.2 932.4zM94.8 932.4zM920.1 64zM491.5 960C272.4 960 94.8 782.4 94.8 563.3c0-165.8 101.8-307.9 246.2-367.1v0.1c4.3-1.5 8.9-2.3 13.7-2.3 22.6 0 41.1 18.4 41.1 41 0 17.8-11.4 33.1-27.4 38.7-112.5 47.9-191.5 159.5-191.5 289.6 0 173.8 140.8 314.6 314.6 314.6S806.1 737 806.1 563.3c0-130-78.9-241.7-191.5-289.6-16-5.6-27.3-20.9-27.3-38.7 0-22.7 18.3-41 41-41 4.8 0 9.3 0.8 13.7 2.3v-0.1c144.5 59.3 246.2 201.3 246.2 367.1 0 219.1-177.6 396.7-396.7 396.7z m0-424c-22.6 0-41-18.4-41-41.1V125.5c0-22.6 18.4-41 41-41 22.7 0 41 18.4 41 41V494.8c0 22.8-18.3 41.2-41 41.2z"
                      p-id="3811"></path>
                </svg>
                <span class="dropdown-desc">&nbsp;退出登录</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div class="admin-nav">
        <div class="large-divider"></div>
        <ul class="navbar-nav mr-auto">
          <li class="nav-title active">
              <span class="d-flex justify-content-left align-items-center">
                <svg class="icon-sm" viewBox="0 0 1024 1024">
                  <path
                      d="M512 528.896c132.096 0 239.104-158.208 239.104-290.304C751.104 107.008 644.096 0 512 0S272.896 107.008 272.896 239.104c0 131.584 107.008 289.792 239.104 289.792zM834.048 667.648L727.552 614.4l-78.848 277.504s-4.096 28.672-36.352 28.672-46.08-28.672-46.08-28.672V665.6s0-51.2-52.224-51.2-54.272 51.2-54.272 51.2v226.304s0 24.064-40.448 24.064-42.496-24.064-42.496-24.064L296.448 614.4l-106.496 53.248c-57.856 28.672-104.448 104.448-104.448 168.96v70.656c0 64.512 52.224 116.736 116.736 116.736h619.52c64.512 0 116.736-52.224 116.736-116.736v-70.656c0-64.512-46.592-140.288-104.448-168.96z"
                      p-id="1154" fill="#ff0000"></path>
                </svg>
                <span class="dropdown-desc admin-nav-title">&nbsp;管理员选项</span>
              </span>
            </a>
          </li>
          <div class=" dropdown-divider"></div>
          <li class="nav-item admin-nav-item admin-item-user active">
            <a class="nav-link">
              <span class="d-flex justify-content-left align-items-center">
                <svg class="icon-sm" viewBox="0 0 1024 1024">
                  <path
                      d="M416 512a224 224 0 1 1 0-448 224 224 0 0 1 0 448zM0 960c0-247.424 186.24-448 416-448s416 200.576 416 448H0z m886.784-128a448.768 448.768 0 0 0-298.752-334.72A255.808 255.808 0 0 0 704 282.88a255.36 255.36 0 0 0-85.504-190.912c7.04-0.64 14.272-1.024 21.504-1.024 121.216 0 219.456 99.328 219.456 221.824a222.336 222.336 0 0 1-90.56 179.584C917.568 543.936 1024 680.96 1024 832h-137.216z"
                      p-id="2710" fill="#BD2130"></path>
                </svg>
                <span class="dropdown-desc dropdown-user-management">&nbsp;用户管理</span>
              </span>
            </a>
          </li>
          <li class="nav-item admin-nav-item admin-item-menu active">
            <a class="nav-link">
              <span class="d-flex justify-content-left align-items-center">
                <svg class="icon-sm" viewBox="0 0 1024 1024">
                  <path
                      d="M0 938.67h1024V1024H0zM979.31 810.67C962.98 630.44 844.38 479.4 682.13 416.05 676.6 326.9 602.52 256 512 256s-164.6 70.9-170.13 160.05C179.62 479.4 61.02 630.44 44.69 810.67H0V896H1024v-85.33h-44.69zM512 341.33c34.05 0 63.27 20.18 76.95 49.08C563.9 386.26 538.21 384 512 384s-51.9 2.26-76.95 6.42c13.68-28.91 42.9-49.09 76.95-49.09zM130.35 810.67C151.65 618.94 314.69 469.33 512 469.33s360.35 149.6 381.65 341.33h-763.3z"
                      fill="#1E7E34" p-id="3845"></path>
                </svg>
                <span class="dropdown-desc dropdown-menu-management">&nbsp;订餐管理</span>
              </span>
            </a>
          </li>
          <li class="nav-item admin-nav-item admin-item-data active">
            <a class="nav-link">
              <span class="d-flex justify-content-left align-items-center">
                <svg class="icon-sm" viewBox="0 0 1024 1024"><path
                      d="M585.344 566.656L480 461.248l-189.376 189.376a32 32 0 0 1-45.248-45.248l211.968-212.032a31.872 31.872 0 0 1 45.312 0L608 498.752 850.752 256H800a32 32 0 1 1 0-64h128a32.128 32.128 0 0 1 12.032 2.368A32.192 32.192 0 0 1 960 224v128a32 32 0 1 1-64 0v-50.752L630.656 566.656a31.872 31.872 0 0 1-45.312 0zM128 832h800a32 32 0 1 1 0 64h-832a32 32 0 0 1-32-32v-640a32 32 0 0 1 64 0V832z"
                      p-id="5748" fill="#0062CC"></path>
                </svg>
                <span class="dropdown-desc dropdown-data-management">&nbsp;数据统计</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
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
      <input type="text" name="user-id" id="user-id-input" aria-label="user-id"
             class="form-control less-permission-input profile-input" disabled="disabled"/>
      <div class="input-group-append permission-text">
        <span class="input-group-text">无修改权限</span>
      </div>
    </div>

    <!-- User fullname input field -->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text item-title">姓名</span>
      </div>
      <input type="text" name="user-fullname" id="user-fullname-input" aria-label="user-fullname"
             class="form-control less-permission-input profile-input" disabled="disabled"/>
      <div class="input-group-append permission-text">
        <span class="input-group-text">无修改权限</span>
      </div>
    </div>

    <!-- User role -->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text item-title">用户权限</span>
      </div>
      <input type="text" name="user-role" id="user-role" aria-label="user-role"
             class="form-control less-permission-input profile-input text-only" disabled="disabled"/>
      <div class="input-group-append permission-text">
        <span class="input-group-text">无修改权限</span>
      </div>
    </div>

    <!-- User workgroup -->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text item-title">所在单位</span>
      </div>
      <input type="text" id="user-workgroup" name="user-workgroup" aria-label="user-workgroup"
             class="form-control less-permission-input profile-input text-only" disabled="disabled"/>
      <div class="input-group-append permission-text">
        <span class="input-group-text">无修改权限</span>
      </div>
    </div>

    <!-- User nickname input field -->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text item-title">昵称</span>
      </div>
      <input type="text" name="user-nickname-edit" id="nickname-input" aria-label="user-nickname"
             class="form-control profile-input" readonly="readonly" required maxlength="30">
      <div class="input-group-append">
        <button class="btn btn-outline-danger action-btn modify-btn" type="button" id="nickname-edit-btn">修改
        </button>
      </div>
    </div>

    <!-- User password input field -->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text item-title">密码</span>
      </div>
      <input type="password" name="user-password-edit" id="password-input" data-options="required:true"
             aria-label="user-password" class="form-control profile-input" placeholder="点击输入新密码" required
             readonly="readonly" maxlength="30">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" id="show-hide-pwd-btn" disabled>
          <svg class="icon-eye" id="eye-icon" viewBox="0 0 1024 1024">
            <path
                d="M512 256c-163.8 0-291.4 97.6-448 256 134.8 135.4 248 256 448 256 199.8 0 346.8-152.8 448-253.2C856.4 397.2 709.6 256 512 256zM512 694.6c-98.8 0-179.2-82-179.2-182.6 0-100.8 80.4-182.6 179.2-182.6s179.2 82 179.2 182.6C691.2 612.8 610.8 694.6 512 694.6z"
                p-id="4687"></path>
            <path
                d="M512 448c0-15.8 5.8-30.2 15.2-41.4-5-0.8-10-1.2-15.2-1.2-57.6 0-104.6 47.8-104.6 106.6 0 58.8 47 106.6 104.6 106.6s104.6-47.8 104.6-106.6c0-4.6-0.4-9.2-0.8-13.8-11 8.6-24.6 13.8-39.6 13.8C540.6 512 512 483.4 512 448z"
                p-id="4688"></path>
          </svg>
          <svg class="icon-eye hide" id="eye-icon-disabled" viewBox="0 0 1024 1024">
            <path
                d="M752.8 316.6 896 173.2 850.8 128l-155.2 155.2C640 255.4 579 238 512 238c-163.8 0-291.4 104.4-448 274 69.6 74.8 133.6 145.4 206.6 196.2L128 850.8 173.2 896l153.8-153.8c54 27.4 114 43.8 185 43.8 199.8 0 346.8-163.6 448-271C904 446.8 835.2 371.4 752.8 316.6zM332.8 512c0-100.8 80.4-182.6 179.2-182.6 38.6 0 74.4 12.4 103.6 33.8l-101.4 101.4c-1.4-5.2-2.2-10.8-2.2-16.6 0-15.8 5.8-30.2 15.2-41.4-5-0.8-10-1.2-15.2-1.2-57.6 0-104.6 47.8-104.6 106.6 0 17.2 4 33.6 11.2 48L364 614.8C344.4 585.4 332.8 550 332.8 512zM512 694.6c-38.6 0-74.4-12.4-103.6-33.8l54.8-54.8c14.6 8 31.2 12.4 48.8 12.4 57.6 0 104.6-47.8 104.6-106.6 0-4.6-0.4-9.2-0.8-13.8-11 8.6-24.6 13.8-39.6 13.8-5.8 0-11.2-0.8-16.6-2.2l100.6-100.6c19.6 29.2 31.2 64.6 31.2 102.8C691.2 612.8 610.8 694.6 512 694.6z"
                p-id="9430"></path>
          </svg>
        </button>
        <button class="btn btn-outline-danger action-btn modify-btn " type="button" id="password-edit-btn">修改
        </button>
      </div>
    </div>

    <div class="input-group mb-3 mt-5">
      <div class="btn-group" role="group" aria-label="Form submit button group">
        <button type="button" class="btn btn-danger mr-1" id="discard-btn" disabled>放弃修改</button>
        <button type="button" class="btn btn-primary ml-1" id="submit-btn" disabled>提交修改</button>
      </div>
    </div>
  </form>
</div>
</body>

</html>