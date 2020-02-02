
$(document).ready(function () {
  removeAdminCard();
  initUI();

  $("#user-manage-btn").click(function() {
    window.location.href = "admin-user-management.php";
  });

  $("#menu-manage-btn").click(function() {
    window.location.href = "admin-menu-management.php";
  });

  function initUI() {
    initTodayCard();
    initTomorrowCard();
  }

  function initTodayCard() {

    isMenuExist(getDateToday(), setTodayCard());
  }

  function initTomorrowCard() {

  }

  function setTodayCard(response) {
    switch(response) {
      case "menu-exist":
        $("#menu-tip-today").text("12333");
        $("#menu-order-btn-today").text("已点餐");
        hideAndDisableElement($("#menu-order-btn-today"));
        removeOldClass($("#menu-card-today"), "bg-danger");
        addNewClass($("#menu-card-today"), "bg-success");
        break;
      case "no-menu":
        $("#menu-tip-today").text("点击按钮开始点餐");
        $("#menu-order-btn-today").text("开始点餐");
        unhideAndEnableElement($("#menu-order-btn-today"));
        removeOldClass($("#menu-card-today"), "bg-success");
        addNewClass($("#menu-card-today"), "bg-danger");
        break;
      default:
    }

  }

  function isMenuExist(date, func) {
    $.ajax({
      type: "post",
      url: "../php/functions/check-menu-status.php",
      data: {
        "selected-date": date
      },
      dataType: "json",
      success: function (response) {
        //return (response == "menu-exist") ? true : false;
        func;
      },
      error: function (errorMsg) {
        alert("Ajax菜单状态检查错误，请刷新页面或者切换网络环境，或联系开发者");
        $(".menu-title").html(errorMsg.responseText);
      }
    });
  }
});

function removeAdminCard() {
  var userRole = $("#user-role-input").val();
  if (userRole === "user") {
    $("#admin-card").remove();
  }
}

