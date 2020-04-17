$(document).ready(function () {
  let loginInfo;
  let loginPassword;
  let loginBtn = $("#login-btn");
  $("input[name='login-info']").focus();

  // Function calls
  checkLoginStatus();
  setInputTextChangeListener();
  setInputEnterKeyEvent();

  // Function definitions
  loginBtn.click(function () {
    setDisable($(this));
    unhideElement($(".spinner-border"));
    $("#login-btn-text").text("正在登录");
    login();
  });

  function checkLoginStatus() {
    let userId = $.cookie(CONSTANTS.COOKIE.USER_ID_CURRENT);
    if(userId != "" && userId != null) {
      window.location.href = "../php/user-main.php";
    }
  }

  function setInputTextChangeListener() {
    $("input").each(function () {
      $(this).bind('input propertychange', function () {
        setLoginBtn();
      });
    });
  }

  function setInputEnterKeyEvent() {
    $("input[name='login-info']").on("keydown", function (e) {
      if (e.key == "Enter") {
        $("input[type='password']").focus();
      }
    });

    $("input[name='password']").on("keydown", function (e) {
      loginPassword = $("input[name='password']").val();
      if (e.key == "Enter" && loginInfo != "" && loginPassword != "") {
        $("#login-btn").trigger("click");
      }
    })
  }

  function setLoginBtn() {
    loginInfo = $("input[name='login-info']").val();
    loginPassword = $("input[name='password']").val();
    if (loginInfo != "" && loginPassword != "") {
      setEnable(loginBtn);
    } else {
      setDisable(loginBtn);
    }
  }

  function resetLogin(willClearUsername) {
    $("#login-btn-text").text("进入系统");
    hideElement($(".spinner-border"));
    if (willClearUsername) {
      $("input").each(function () {
        $(this).val("");
      });
      $("input[name='login-info']").focus();
    } else {
      $("input[name='password']").val("");
      $("input[name='password']").focus();
    }
  }

  // Login request
  function login() {
    $.ajax({
      type: CONSTANTS.AJAX.TYPE.POST,
      url: "../php/functions/user-login.php",
      data: {
        "login-info": loginInfo,
        "login-pwd": loginPassword
      },
      dataType: "JSON",
      success: function (response) {
        switch (response) {
          case "status-failed":
            alert("密码错误！");
            resetLogin(false);
            break;
          case "status-deleted":
            alert("账户已删除，请联系804小潘(85252796/15268571882)");
            resetLogin(true);
            break;
          case "status-not-exist":
            alert("账户不存在，请联系804小潘(85252796/15268571882)");
            resetLogin(true);
            break;
          default:
            let userId = response[0];
            let userFullname = response[1];
            let userRole = response[2];
            let userGroup = response[3];
            if(response != "" || response != null) {
              $.cookie(CONSTANTS.COOKIE.USER_ID_CURRENT, userId);
              $.cookie(CONSTANTS.COOKIE.USERNAME_CURRENT, userFullname);
              $.cookie(CONSTANTS.COOKIE.USER_ROLE_CURRENT, userRole);
              $.cookie(CONSTANTS.COOKIE.USER_GROUP_CURRENT, userGroup);
              window.location.href = "../php/user-main.php";
            } else {
              alert("登录发生错误，请重试！");
            }
        }
      },
      error: function () {
        alert("登录失败：网络错误，请稍后重试");
      }
    });
  }
});

