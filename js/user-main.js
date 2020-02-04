
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
    $.ajax({
      type: "post",
      url: "../php/functions/check-menu-status.php",
      data: {
        "selected-date": getDateToday()
      },
      dataType: "json",
      success: function (response) {
        setTodayCard(response);
      },
      error: function (errorMsg) {
        alert("Ajax菜单状态检查错误，请刷新页面或者切换网络环境，或联系开发者");
        $(".menu-title").html(errorMsg.responseText);
      }
    });
  }

  function initTomorrowCard() {
    $.ajax({
      type: "post",
      url: "../php/functions/check-menu-status.php",
      data: {
        "selected-date": getDateTomorrow()
      },
      dataType: "json",
      success: function (response) {
        setTomorrowCard(response);
      },
      error: function (errorMsg) {
        alert("Ajax菜单状态检查错误，请刷新页面或者切换网络环境，或联系开发者");
        $(".menu-title").html(errorMsg.responseText);
      }
    });
  }

  function setTodayCard(response) {
    switch(response) {
      case "menu-exist":
        $("#menu-tip-today").text("12333");
        $("#menu-order-btn-today").text("已点餐");
        $("#card-title-today").text("");
        removeOldClass($("#menu-card-today"), "bg-danger");
        addNewClass($("#menu-card-today"), "bg-success");
        break;
      case "no-menu":
        $("#menu-tip-today").text("点击按钮开始点餐");
        $("#menu-order-btn-today").text("开始点餐");
        $("#card-title-today").text("尚未点餐");
        unhideAndEnableElement($("#menu-order-btn-today"));
        removeOldClass($("#menu-card-today"), "bg-success");
        addNewClass($("#menu-card-today"), "bg-danger");
        break;
      default:
    }
  }

  function setTomorrowCard(response) {
    switch(response) {
      case "menu-exist":
        $("#menu-tip-tomorrow").text("45666");
        $("#menu-order-btn-tomorrow").text("已点餐");
        $("#card-title-tomorrow").text("");
        removeOldClass($("#menu-card-tomorrow"), "bg-warning");
        addNewClass($("#menu-card-tomorrow"), "bg-success");
        break;
      case "no-menu":
        $("#menu-tip-tomorrow").text("点击按钮开始点餐");
        $("#menu-order-btn-tomorrow").text("开始点餐");
        $("#card-title-tomorrow").text("尚未点餐");
        unhideAndEnableElement($("#menu-order-btn-tomorrow"));
        removeOldClass($("#menu-card-tomorrow"), "bg-success");
        addNewClass($("#menu-card-tomorrow"), "bg-warning");
        break;
      default:
    }
  }
});


function removeAdminCard() {
  var userRole = $("#user-role-input").val();
  if (userRole === "user") {
    $("#admin-card").remove();
  }
}

