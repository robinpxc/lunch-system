
$(document).ready(function () {
  let dateToday = getDateToday();
  let dateTomorrow = getDateTomorrow();
  let orderStatusToday = "";
  let orderStatusTomorrow = "";
  removeAdminCard();
  initUI();

  $("#user-manage-btn").click(function() {
    window.location.href = "admin-user-management.php";
  });

  $("#menu-manage-btn").click(function() {
    window.location.href = "admin-menu-management.php";
  });

  $("#data-manage-btn").click(function () {
    window.location.href = "admin-data-management.php";
  });

  function initUI() {
    initCardToday();
    initCardTomorrow();
  }

  function initCardToday() {
    if(checkMenuStatus(dateToday, false) == "menu-exist") {
      orderStatusToday = checkOrderStatus(dateToday, false, "order-status");
      if(orderStatusToday == "order-exist") {
        $("#menu-order-btn-today").text("点击修改");
        $("#card-title-today").text("");
        hideElement($("#card-title-today"));
        removeOldClass($("#menu-card-today"), "bg-danger");
        addNewClass($("#menu-card-today"), "bg-success");
        setCardPreviewData(dateToday, fetchMenu(dateToday, false));
      } else {
        $("#menu-tip-today").text("点击按钮开始点餐");
        $("#menu-order-btn-today").text("开始点餐");
        $("#card-title-today").text("尚未点餐");
        $(".no-menu")
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
    if(checkMenuStatus(dateTomorrow, false) == "menu-exist") {
      orderStatusTomorrow = checkOrderStatus(dateTomorrow, false, "order-status");
      if(orderStatusTomorrow == "order-exist") {
        $("#menu-tip-tomorrow").text("明日已点餐");
        $("#menu-order-btn-tomorrow").text("点击修改");
        $("#card-title-tomorrow").text("");
        hideElement($("#card-title-tomorrow"));
        removeOldClass($("#menu-card-tomorrow"), "bg-warning");
        addNewClass($("#menu-card-tomorrow"), "bg-success");
        setCardPreviewData(dateTomorrow, fetchMenu(dateTomorrow, false));
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

  // $("#menu-order-btn-today").click(function() {
  //   if(orderStatusToday != "") {
  //     $.cookie("order-date", getDateToday());
  //     window.location.href = "../php/order-menu.php";
  //   } else {
  //     alert("今日订单信息获取失败，请刷新重试");
  //   }
  // });

  $("#menu-order-btn-tomorrow").click(function() {
    if(orderStatusTomorrow != "") {
      $.cookie("order-date", getDateTomorrow());
      window.location.href = "../php/order-menu.php";
    } else {
      alert("明日订单信息获取失败，请刷新重试");
    }
  });

  function removeAdminCard() {
    let userRole = $("#user-role-input").val();
    if (userRole === "user") {
      $("#admin-card").remove();
    }
  }

  function setCardPreviewData(date, menuList) {
    let menuNum = parseInt(checkOrderStatus(date, false, "order-number"));
    let itemIdPrefix = "";

    if(date == getDateToday()) {
      itemIdPrefix = "#menu-today-0";
      if(menuNum == 7) {
        $("#menu-tip-today").text("【 不点餐 】");
        setNoOrderStyle($("#menu-tip-today"));
        $(".list-today").remove();
      } else if(menuNum == 6) {
        $("#menu-tip-today").text("【 6号 】干捞水饺");
        setNoOrderStyle($("#menu-tip-today"));
        $(".list-today").remove();
      } else {
        $("#menu-tip-today").text("已点" + "（ " + menuNum + " 号 " + "）");
      }
    } else if(date == getDateTomorrow()) {
      itemIdPrefix = "#menu-tomorrow-0";
      if(menuNum == 7) {
        $("#menu-tip-tomorrow").text("【 不点餐 】");
        $(".list-tomorrow").remove();
        setNoOrderStyle($("#menu-tip-tomorrow"));
      } else if(menuNum == 6) {
        $("#menu-tip-tomorrow").text("【 6号 】干捞水饺");
        setNoOrderStyle($("#menu-tip-tomorrow"));
        $(".list-tomorrow").remove();
      } else {
        $("#menu-tip-tomorrow").text("已点" + "（" + " " + menuNum + " 号" + " " +"）");
      }
    }

    for(let i = 0; i < 3; i++) {
      let itemId = itemIdPrefix + (i + 1);
      if((menuNum) < 6) {
        $(itemId).text("【 " + decodeUnicode(menuList[menuNum - 1][i]) + " 】");
      }
    }
  }

  function setNoOrderStyle(element) {
    element.css({
      "font-weight": "bold",
      "font-size": "25px",
    });

    element.parent().css({
      "display": "flex",
      "justify-content":"center",
      "align-items": "center",
      "padding-top": "0px"
    });
  }
});



