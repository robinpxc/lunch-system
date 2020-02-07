
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
    initCardToday();
    initCardTomorrow();
  }

  function initCardToday() {
    if(checkMenuStatus(getDateToday()) == "menu-exist") {
      if(checkOrderStatus(getDateToday()) == "order-exist") {
        $("#menu-tip-today").text("12333");
        $("#menu-order-btn-today").text("点击修改");
        $("#card-title-today").text("");
        removeOldClass($("#menu-card-today"), "bg-danger");
        addNewClass($("#menu-card-today"), "bg-success");
      } else {
        $("#menu-tip-today").text("点击按钮开始点餐");
        $("#menu-order-btn-today").text("开始点餐");
        $("#card-title-today").text("尚未点餐");
        unhideAndEnableElement($("#menu-order-btn-today"));
        removeOldClass($("#menu-card-today"), "bg-success");
        addNewClass($("#menu-card-today"), "bg-danger");
      }
    } else {
      $("#menu-card-today").remove();
      removeOldClass($("#menu-card-today-disabled"), "hide");
    }
  }

  function initCardTomorrow() {
    if(checkMenuStatus(getDateTomorrow()) == "menu-exist") {
      if(checkOrderStatus(getDateTomorrow()) == "order-exist") {
        $("#menu-tip-tomorrow").text("45666");
        $("#menu-order-btn-tomorrow").text("点击修改");
        $("#card-title-tomorrow").text("");
        hideElement($("#card-title-tomorrow"));
        removeOldClass($("#menu-card-tomorrow"), "bg-warning");
        addNewClass($("#menu-card-tomorrow"), "bg-success");
      } else {
        $("#menu-tip-tomorrow").text("点击按钮开始点餐");
        $("#menu-order-btn-tomorrow").text("开始点餐");
        $("#card-title-tomorrow").text("尚未点餐");
        unhideAndEnableElement($("#menu-order-btn-tomorrow"));
        removeOldClass($("#menu-card-tomorrow"), "bg-success");
        addNewClass($("#menu-card-tomorrow"), "bg-warning");
      }
    } else {
      $("#menu-card-tomorrow").remove();
      removeOldClass($("#menu-card-tomorrow-disabled"), "hide");
    }
  }


  // Function to check menu status
  function checkMenuStatus(date) {
    var menuStatus = "";
    $.ajax({
      type: "post",
      url: "../php/functions/check-menu-status.php",
      data: {
        "selected-date": date
      },
      dataType: "json",
      async: false,
      success: function (response) {
        menuStatus = response;
      },
      error: function (errorMsg) {
        alert("菜单状态查询失败，Ajax菜单状态检查错误，请刷新页面或者切换网络环境，或联系开发者");
        $(".menu-title").html(errorMsg.responseText);
      }
    });
    return menuStatus;
  }

  function checkOrderStatus(date) {
    var orderStatus = "";
    $.ajax({
      type: "post",
      url: "../php/functions/check-order-status.php",
      data: {
        "order-date": date
      },
      dataType: "json",
      async: false,
      success: function (response) {
        orderStatus = response;
      },
      error: function (errorMsg) {
        alert("订单状态检查失败，Ajax菜单状态检查错误，请刷新页面或者切换网络环境，或联系开发者");
      }
    });
    return orderStatus;
  }

  $("#menu-order-btn-today").click(function() {
    $.cookie("order-date", getDateToday());
    window.location.href = "../php/order-menu.php"
  });

  $("#menu-order-btn-tomorrow").click(function() {
    $.cookie("order-date", getDateTomorrow());
    window.location.href = "../php/order-menu.php"
  });
});


function removeAdminCard() {
  var userRole = $("#user-role-input").val();
  if (userRole === "user") {
    $("#admin-card").remove();
  }
}

