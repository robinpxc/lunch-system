<!DOCTYPE html>
<?php
include('common/session.php'); ?>

<html lang="zh">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="icon" href="../assets/icons/rice_32x32.ico">

  <title>用户管理</title>

  <!-- Style sheets-->
  <!-- Bootstrap core CSS -->
  <link rel="stylesheet" href="../third-party/bootstrap-4.3.1-dist/css/bootstrap.min.css">
  <!-- Custom styles-->
  <link href="../css/common/common.css" rel="stylesheet">
  <link href="../css/common/common-table-group.css" rel="stylesheet">
  <link href="../css/admin-daily-statistic.css" rel="stylesheet">

  <!--Java Script-->
  <script type="text/javascript" src="../third-party/popper.min.js"></script>
  <script type="text/javascript" src="../third-party/jquery-3.4.1.min.js"></script>
  <script type="text/javascript" src="../third-party/bootstrap-4.3.1-dist/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="../third-party/jquery-confirm/jquery-confirm.min.js"></script>
  <script type="text/javascript" src="../js/common/common.js"></script>
  <script type="text/javascript" src="../js/common/table-group-script.js"></script>
  <script type="text/javascript" src="../js/common/common_order.js"></script>
  <script type="text/javascript" src="../js/admin-daily-statistic.js"></script>

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
        <div class="dropdown-divider"></div>
        <li class="nav-item active">
          <a class="nav-link" href="user-profile.php">
              <span class="d-flex justify-content-left align-items-center">
                <svg class="icon-sm" viewBox="0 0 1024 1024">
                  <path d="M514.707668 313.464271c-109.646236 0-198.535729 88.889493-198.535729 198.535729 0 109.651352 88.889493 198.535729 198.535729 198.535729s198.535729-88.884376 198.535729-198.535729C713.243397 402.353764 624.353904 313.464271 514.707668 313.464271zM514.707668 660.901285c-82.233909 0-148.901285-66.663282-148.901285-148.901285 0-82.233909 66.668399-148.901285 148.901285-148.901285 82.238003 0 148.901285 66.668399 148.901285 148.901285C663.608953 594.238003 596.945671 660.901285 514.707668 660.901285zM891.222951 385.593032c-5.828752-17.368576-12.83533-34.196847-20.906146-50.399877 11.222599-48.4075-2.016937-101.334943-39.739073-139.058103-37.72316-37.72316-90.647533-50.963719-139.051963-39.745213-16.208147-8.074909-33.041534-15.083533-50.41625-20.913309-26.297946-42.138726-73.070202-70.181409-126.401852-70.181409-53.327556 0-100.100836 28.042683-126.399805 70.180386-17.375739 5.830799-34.209126 12.839423-50.417273 20.914332-48.40443-11.219529-101.329826 2.022053-139.051963 39.745213-37.722136 37.722136-50.961672 90.650603-39.739073 139.058103-8.071839 16.204054-15.078417 33.032324-20.907169 50.401923-42.141796 26.297946-70.188572 73.074296-70.188572 126.405945 0 53.334719 28.046776 100.110045 70.189595 126.406968 5.828752 17.368576 12.83533 34.196847 20.907169 50.399877-11.222599 48.4075 2.016937 101.33699 39.739073 139.063219 37.725206 37.725206 90.65265 50.965765 139.059126 39.743166 16.2061 8.072863 33.036417 15.080463 50.408063 20.910239 26.298969 42.138726 73.073272 70.181409 126.402875 70.181409 53.332672 0 100.105952-28.042683 126.403898-70.182432 17.371646-5.829775 34.20094-12.836353 50.40704-20.909216 48.406476 11.221576 101.33392-2.018983 139.059126-39.743166 37.722136-37.725206 50.961672-90.654696 39.739073-139.062196 8.071839-16.20303 15.077394-33.030277 20.906146-50.398854 42.143842-26.296923 70.189595-73.073272 70.189595-126.409015C961.412546 458.667328 933.366793 411.890978 891.222951 385.593032zM849.804632 604.010577c-7.731078 28.220738-18.919908 55.009871-33.102932 79.875189 15.275915 36.122709 8.216125 79.4454-21.225417 108.887966-29.438473 29.438473-72.761164 36.496216-108.885919 21.222347-24.864294 14.182001-51.652404 25.369807-79.872119 33.100886-14.741749 36.341696-50.377364 61.97347-92.010577 61.97347s-77.268828-25.631774-92.010577-61.97347c-28.219715-7.731078-55.007825-18.918885-79.872119-33.100886-36.124755 15.273868-79.44847 8.216125-108.891036-21.222347-29.438473-29.442566-36.497239-72.76628-21.221324-108.890013-14.182001-24.864294-25.369807-51.653427-33.100886-79.873142-36.341696-14.741749-61.974493-50.377364-61.974493-92.010577s25.631774-77.268828 61.97347-92.010577c7.731078-28.219715 18.918885-55.007825 33.100886-79.872119-15.273868-36.124755-8.216125-79.44847 21.222347-108.891036 29.442566-29.438473 72.76628-36.496216 108.891036-21.222347 24.864294-14.182001 51.653427-25.369807 79.873142-33.100886 14.742772-36.33965 50.377364-61.97347 92.010577-61.97347 41.632189 0 77.267804 25.63382 92.010577 61.97347 28.219715 7.731078 55.008848 18.918885 79.873142 33.100886 36.124755-15.273868 79.447447-8.216125 108.885919 21.222347 29.441543 29.441543 36.501332 72.764234 21.22644 108.887966 14.183024 24.865317 25.370831 51.65445 33.101909 79.874165 36.341696 14.741749 61.974493 50.377364 61.974493 92.010577S886.146329 589.268828 849.804632 604.010577z" p-id="2898"></path>
                </svg>
                <span class="dropdown-desc">&nbsp;个人设置</span>
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

<div class="main-content boxshaw">
  <div class="table-group">
    <div class="form-nav d-block">
      <!-- Dropdown list to select data source -->
      <div class="btn-group nav-drop-down">
        <button class="btn btn-success btn-lg dropdown-toggle dropdown-workgroup" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          显示：全部显示
        </button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#" id="group-0">显示：巡察办</a>
          <a class="dropdown-item" href="#" id="group-1">显示：第一巡察组</a>
          <a class="dropdown-item" href="#" id="group-2">显示：第二巡察组</a>
          <a class="dropdown-item" href="#" id="group-3">显示：第三巡察组</a>
          <a class="dropdown-item" href="#" id="group-4">显示：第四巡察组</a>
          <a class="dropdown-item" href="#" id="group-5">显示：第五巡察组</a>
          <a class="dropdown-item" href="#" id="group-6">显示：临时人员</a>
          <a class="dropdown-item active" href="#" id="group-all">显示：全部显示</a>
        </div>
      </div>
    </div>
    <div class="table-content d-block">
      <!-- 巡察办表格 -->
      <div class="table-card card table-group-0">
        <div class="card-header">
          市委巡察办
        </div>
        <div class="card-body">
          <table class="table">
            <thead class="thead-light">
            <tr>
              <th scope="col">姓名</th>
              <th scope="col">ID</th>
              <th scope="col">所选套餐</th>
            </tr>
            </thead>

            <tbody class="tb-group0">
            </tbody>
          </table>
        </div>
      </div>

      <!-- 一组表格 -->
      <div class="table-card card table-group-1">
        <div class="card-header">
          市委第一巡察组
        </div>
        <div class="card-body">
          <table class="table">
            <thead class="thead-light">
            <tr>
              <th scope="col">姓名</th>
              <th scope="col">ID</th>
              <th scope="col">所选套餐</th>
            </tr>
            </thead>

            <tbody class="tb-group1">
            </tbody>
          </table>
        </div>
      </div>

      <!-- 二组表格 -->
      <div class="table-card card table-group-2">
        <div class="card-header">
          市委第二巡察组
        </div>
        <div class="card-body">
          <table class="table">
            <thead class="thead-light">
            <tr>
              <th scope="col">姓名</th>
              <th scope="col">ID</th>
              <th scope="col">所选套餐</th>
            </tr>
            </thead>

            <tbody class="tb-group2">
            </tbody>
          </table>
        </div>
      </div>

      <!-- 三组表格 -->
      <div class="table-card card table-group-3">
        <div class="card-header">
          市委第三巡察组
        </div>
        <div class="card-body">
          <table class="table">
            <thead class="thead-light">
            <tr>
              <th scope="col">姓名</th>
              <th scope="col">ID</th>
              <th scope="col">所选套餐</th>
            </tr>
            </thead>

            <tbody class="tb-group3">
            </tbody>
          </table>
        </div>
      </div>

      <!-- 四组表格 -->
      <div class="table-card card table-group-4">
        <div class="card-header">
          市委第四巡察组
        </div>
        <div class="card-body">
          <table class="table">
            <thead class="thead-light">
            <tr>
              <th scope="col">姓名</th>
              <th scope="col">ID</th>
              <th scope="col">所选套餐</th>
            </tr>
            </thead>

            <tbody class="tb-group4">
            </tbody>
          </table>
        </div>
      </div>

      <!-- 五组表格 -->
      <div class="table-card card table-group-5">
        <div class="card-header">
          市委第五巡察组
        </div>
        <div class="card-body">
          <table class="table">
            <thead class="thead-light">
            <tr>
              <th scope="col">姓名</th>
              <th scope="col">ID</th>
              <th scope="col">所选套餐</th>
            </tr>
            </thead>

            <tbody class="tb-group5">
            </tbody>
          </table>
        </div>
      </div>

      <!-- 临时组表格 -->
      <div class="table-card card table-group-6">
        <div class="card-header">
          临时人员餐表
        </div>
        <div class="card-body">
          <table class="table">
            <thead class="thead-light">
            <tr>
              <th scope="col">姓名</th>
              <th scope="col">ID</th>
              <th scope="col">所选套餐</th>
            </tr>
            </thead>

            <tbody class="tb-group6">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>


  <footer class="pt-4 my-md-4 pt-md-4 border-top">
    <div class="row">
      <div class="col-12 col-md">
        <h6 class="d-block mb-3 text-muted">&copy; 2019 - Robin.Pan</h6>
      </div>
    </div>
  </footer>

</div>

</html>