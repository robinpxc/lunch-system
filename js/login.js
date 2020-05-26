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
    login().done(function(response) {
      switch (response) {
        case "status-failed":
          jqAlert("登录失败", "密码错误");
          resetLogin(false);
          break;
        case "status-deleted":
          jqAlert("登录失败", "账户已删除，请联系管理员");
          resetLogin(true);
          break;
        case "status-not-exist":
          jqAlert("登录失败", "账户不存在，请联系管理员");
          resetLogin(true);
          break;
        default:
          let userId = response[0];
          let userFullname = response[1];
          let userRole = response[2];
          let userGroup = response[3];
          if(response != "" && response != null) {
            $.cookie(CONSTANTS.COOKIE.USER.KEY_ID, userId);
            $.cookie(CONSTANTS.COOKIE.USER.KEY_NAME, userFullname);
            $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE, userRole);
            $.cookie(CONSTANTS.COOKIE.USER.KEY_GROUP, userGroup);
            window.location.href = "../php/user-main.php";
          } else {
            jqAlert("登录失败", "网络异常");
          }
      }
    });
  });

  function checkLoginStatus() {
    let userId = $.cookie(CONSTANTS.COOKIE.USER.KEY_ID);
    if(userId != "" && userId != null) {
      checkSession().done(function(session) {
        if(session == null || session == "") {
        } else {
          if(session == userId) {
            window.location.href = "../php/user-main.php";
          }
        }
      })
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
        loginBtn.trigger("click");
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
    let deferred = $.Deferred();
    $.ajax({
      type: CONSTANTS.AJAX.TYPE.POST,
      url: "../php/functions/user-login.php",
      data: {
        "login-info": loginInfo,
        "login-pwd": loginPassword
      },
      dataType: CONSTANTS.AJAX.DATA_TYPE.JSON,
      beforeSend: function() {
        unhideElement($(".spinner-border"));
        $("#login-btn-text").text("正在登录");
        setDisable(loginBtn);
      },
      success: function (response) {
        deferred.resolve(response);
      },
      error: function (errorMsg) {
        $("body").html(errorMsg.responseText);
        hideElement($(".spinner-border"));
        $("#login-btn-text").text("进入系统");
        setEnable(loginBtn);
      }
    });
    return deferred.promise();
  }
});

