$(document).ready(function () {
  let loginInfo;
  let loginPassword;
  let loginBtn = $("#login-btn");
  $("input[name='login-info']").focus();

  // Function calls
  disableZoom();
  setInputTextChangeListener();
  setInputEnterKeyEvent();
  
  // Function definitions
  loginBtn.click(function () {
    setDisable($(this));
    unhideElement($(".spinner-border"));
    $("#login-btn-text").text("正在登录");
    login();
  });

  // Function to disable safari zoom
  function disableZoom() {
    let lastTouchEnd = 0;
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    document.addEventListener('touchend', function (event) {
      let now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);

    document.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });
  }

  function setInputTextChangeListener() {
    $("input").each(function() {
      $(this).bind('input propertychange', function () {
        setLoginBtn();
      });
    });
  }

  function setInputEnterKeyEvent() {
    $("input[type=password]").on("keydown",function(e){
      if(e.key=="Enter"){
        $("#login-btn").trigger("click");
      }
    })
  }



  function setLoginBtn() {
    loginInfo = $("input[name='login-info']").val();
    loginPassword = $("input[name='password']").val();
    if(loginInfo != "" && loginPassword != "") {
      setEnable(loginBtn);
    } else {
      setDisable(loginBtn);
    }
  }

  function resetLogin(willClearUsername) {
    $("#login-btn-text").text("进入系统");
    hideElement($(".spinner-border"));
    if(willClearUsername) {
      $("input").each(function() {
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
      type: "POST",
      url: "../php/functions/user-login.php",
      data: {
        "login-info": loginInfo,
        "login-pwd": loginPassword
      },
      dataType: "JSON",
      success: function (response) {
        switch (response) {
          case "status-success":
            window.location.href="../php/user-main.php";
            break;
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
        }
      },
      error: function () {
        alert("登录失败：网络错误，请稍后重试");
      }
    });
  }
});

