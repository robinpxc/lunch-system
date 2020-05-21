<!DOCTYPE html>
<?php
  include('common/session.php');
?>

<html lang="zh">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="icon" href="../assets/icons/rice_32x32.ico">

  <title>订餐页面</title>

  <!-- Style sheets-->
  <!-- Third Party -->
  <link rel="stylesheet" href="../third-party/bootstrap-4.3.1-dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../third-party/jquery-confirm/jquery-confirm.min.css">
  <!-- Common-->
  <link href="../css/common/common.css" rel="stylesheet">
  <link href="../css/common/common-table-group.css" rel="stylesheet">
  <link href="../third-party/fontawesome/css/all.min.css" rel="stylesheet">
  <!-- Custom -->
  <link rel="stylesheet" href="../css/order-menu.css">

  <!--Java Script-->
  <!-- Third Party -->
  <script type="text/javascript" src="../third-party/popper.min.js"></script>
  <script type="text/javascript" src="../third-party/jquery-3.4.1.min.js"></script>
  <script type="text/javascript" src="../third-party/fontawesome/js/all.min.js"></script>
  <script type="text/javascript" src="../third-party/bootstrap-4.3.1-dist/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="../third-party/jquery.cookie.js"></script>
  <script type="text/javascript" src="../third-party/jquery-confirm/jquery-confirm.min.js"></script>
  <script type="text/javascript" src="../third-party/jQuery.print.js"></script>
  <script type="text/javascript" src="../third-party/js-excel-generator/scripts/excel-gen.js"></script>
  <script type="text/javascript" src="../third-party/js-excel-generator/scripts/jszip.min.js"></script>
  <script type="text/javascript" src="../third-party/js-excel-generator/scripts/FileSaver.js"></script>
  <!-- Common -->
  <script type="text/javascript" src="../js/common/common.js"></script>
  <script type="text/javascript" src="../js/common/profile-form.js"></script>
  <script type="text/javascript" src="../js/common/common-constants.js"></script>
  <script type="text/javascript" src="../js/common/common-user.js"></script>
  <script type="text/javascript" src="../js/common/common-menu.js"></script>
  <script type="text/javascript" src="../js/common/common-order.js"></script>
  <script type="text/javascript" src="../js/common/common-print.js"></script>
  <script type="text/javascript" src="../js/common/common-confirm-dialog.js"></script>
  <script type="text/javascript" src="../js/common/table-group-script.js"></script>
  <script type="text/javascript" src="../js/common/common-export-excel.js"></script>
  <!-- Custom -->
  <script type="text/javascript" src="../js/order-menu.js"></script>

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

          <span class="d-block">
            <span id="current_date"></span>
            <br>
            <span id="current_time"></span>
          </span>
        </div>
      </span>
    <button class="btn btn-danger dropdown-toggle" type="button" data-toggle="collapse" data-target="#nav-bar-list"
            aria-controls="nav-bar-list" aria-expanded="false" aria-label="Toggle navigation">
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
                  <path d="M512 528.896c132.096 0 239.104-158.208 239.104-290.304C751.104 107.008 644.096 0 512 0S272.896 107.008 272.896 239.104c0 131.584 107.008 289.792 239.104 289.792zM834.048 667.648L727.552 614.4l-78.848 277.504s-4.096 28.672-36.352 28.672-46.08-28.672-46.08-28.672V665.6s0-51.2-52.224-51.2-54.272 51.2-54.272 51.2v226.304s0 24.064-40.448 24.064-42.496-24.064-42.496-24.064L296.448 614.4l-106.496 53.248c-57.856 28.672-104.448 104.448-104.448 168.96v70.656c0 64.512 52.224 116.736 116.736 116.736h619.52c64.512 0 116.736-52.224 116.736-116.736v-70.656c0-64.512-46.592-140.288-104.448-168.96z" p-id="1154" fill="#ff0000"></path>
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
                  <path d="M416 512a224 224 0 1 1 0-448 224 224 0 0 1 0 448zM0 960c0-247.424 186.24-448 416-448s416 200.576 416 448H0z m886.784-128a448.768 448.768 0 0 0-298.752-334.72A255.808 255.808 0 0 0 704 282.88a255.36 255.36 0 0 0-85.504-190.912c7.04-0.64 14.272-1.024 21.504-1.024 121.216 0 219.456 99.328 219.456 221.824a222.336 222.336 0 0 1-90.56 179.584C917.568 543.936 1024 680.96 1024 832h-137.216z" p-id="2710" fill="#BD2130"></path>
                </svg>
                <span class="dropdown-desc dropdown-user-management">&nbsp;用户管理</span>
              </span>
            </a>
          </li>
          <li class="nav-item admin-nav-item admin-item-menu active">
            <a class="nav-link">
              <span class="d-flex justify-content-left align-items-center">
                <svg class="icon-sm" viewBox="0 0 1024 1024">
                  <path d="M0 938.67h1024V1024H0zM979.31 810.67C962.98 630.44 844.38 479.4 682.13 416.05 676.6 326.9 602.52 256 512 256s-164.6 70.9-170.13 160.05C179.62 479.4 61.02 630.44 44.69 810.67H0V896H1024v-85.33h-44.69zM512 341.33c34.05 0 63.27 20.18 76.95 49.08C563.9 386.26 538.21 384 512 384s-51.9 2.26-76.95 6.42c13.68-28.91 42.9-49.09 76.95-49.09zM130.35 810.67C151.65 618.94 314.69 469.33 512 469.33s360.35 149.6 381.65 341.33h-763.3z" fill="#1E7E34" p-id="3845"></path>
                </svg>
                <span class="dropdown-desc dropdown-menu-management">&nbsp;订餐管理</span>
              </span>
            </a>
          </li>
          <li class="nav-item admin-nav-item data active">
            <a class="nav-link">
              <span class="d-flex justify-content-left align-items-center">
                <svg class="icon-sm" viewBox="0 0 1024 1024"><path d="M585.344 566.656L480 461.248l-189.376 189.376a32 32 0 0 1-45.248-45.248l211.968-212.032a31.872 31.872 0 0 1 45.312 0L608 498.752 850.752 256H800a32 32 0 1 1 0-64h128a32.128 32.128 0 0 1 12.032 2.368A32.192 32.192 0 0 1 960 224v128a32 32 0 1 1-64 0v-50.752L630.656 566.656a31.872 31.872 0 0 1-45.312 0zM128 832h800a32 32 0 1 1 0 64h-832a32 32 0 0 1-32-32v-640a32 32 0 0 1 64 0V832z" p-id="5748" fill="#0062CC"></path>
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

<div class="main-content mt-3 d-flex">
  <div class="menu-data boxshaw">
    <div class="alert order-info">
      <span class="order-exist-icon hide">
        <svg class="icon icon-sm" viewBox="0 0 1024 1024"><path
              d="M512 64C264.6 64 64 264.6 64 512c0 247.4 200.6 448 448 448 247.4 0 448-200.6 448-448C960 264.6 759.4 64 512 64zM741.8 362.2 463.6 719.2c-2.2 2.2-5.8 7-10.2 7-4.6 0-7.6-3.2-10.2-5.8-2.6-2.6-157.8-151.8-157.8-151.8l-3-3c-1.2-1.8-2.2-4-2.2-6.4 0-2.4 1-4.6 2.2-6.4 0.8-0.8 1.4-1.4 2.2-2.4 15.4-16.2 46.6-49 48.6-51 2.6-2.6 4.8-6 9.6-6 5 0 8.2 4.2 10.6 6.6 2.4 2.4 90 86.6 90 86.6l222.6-286c2-1.6 4.4-2.8 7-2.8 2.6 0 5 1 7 2.6l61.2 48.2c1.6 2 2.6 4.4 2.6 7C744 358.2 743 360.4 741.8 362.2z"
              p-id="10225" fill="#008000"></path>
        </svg>
      </span>
      <span class="no-order-icon">
        <svg class="icon-sm" viewBox="0 0 1024 1024" p-id="2402"><path
              d="M128.085333 877.226667a128 128 0 0 1-42.496-175.957334L402.773333 182.186667a128 128 0 0 1 218.453334 0l317.184 519.04A128 128 0 0 1 829.184 896H194.816a128 128 0 0 1-66.730667-18.773333zM829.184 810.666667a42.666667 42.666667 0 0 0 36.394667-64.896L548.394667 226.730667a42.666667 42.666667 0 0 0-72.789334 0L158.421333 745.770667A42.666667 42.666667 0 0 0 194.816 810.666667h634.368zM469.333333 384h85.333334v256h-85.333334V384z m0 298.666667h85.333334v85.333333h-85.333334v-85.333333z"
              p-id="2403" fill="#BD2130"></path>
        </svg>
      </span>
      <span id="order-info-text"></span>
    </div>
    <div class="card-container mt-2">
    </div>
  </div>
</div>

</html>