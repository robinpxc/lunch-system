$(document).ready(function () {
  let dateToday = getDateToday();
  let dateTomorrow = getDateTomorrow();
  let orderStatusToday = "";
  let orderStatusTomorrow = "";
  removeAdminCard();
  initUI();

  $("#user-manage-btn").click(function () {
    window.location.href = "admin-user-management.php";
  });

  $("#menu-manage-btn").click(function () {
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
    let cardToday = $("#menu-card-today");
    if (checkOrderStatus(dateToday, false, "order-status") == "order-exist") {
      updateCardStatus(cardToday, true);
      setCardPreviewData(dateToday);
    } else {
      updateCardStatus(cardToday, false);
    }
    $("#order-info-today").text(setOrderInfoText(true, dateToday));
  }

  function initCardTomorrow() {
    let cardTomorrow = $("#menu-card-tomorrow");
    if (checkOrderStatus(dateTomorrow, false, "order-status") == "order-exist") {
      updateCardStatus(cardTomorrow, true);
      setCardPreviewData(dateTomorrow);
    } else {
      updateCardStatus(cardTomorrow, false);
    }
    $("#order-info-tomorrow").text(setOrderInfoText(true, dateTomorrow));
  }

  function updateCardStatus(currentCard, isOrderExist) {
    removeOldClass(currentCard, isOrderExist ? "border-secondary" : "border-success");
    addNewClass(currentCard, isOrderExist ? "border-success" : "border-secondary");
  }

  function setOrderInfoText(isOrderExist, date) {
    return (isOrderExist ? fetchDailyOrderStatus(date, false) : "尚未设置");
  }

  $("#menu-order-btn-tomorrow").click(function () {
    if (orderStatusTomorrow != "") {
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

  function setCardPreviewData(date) {
    let menuNum = parseInt(checkOrderStatus(date, false, "order-number"));
    let itemIdPrefix = "";

    if (date == getDateToday()) {
      itemIdPrefix = "#menu-today-0";
      if (menuNum == 7) {
        $("#menu-tip-today").text("【 不点餐 】");
        setNoOrderStyle($("#menu-tip-today"));
        $(".list-today").remove();
      } else if (menuNum == 6) {
        $("#menu-tip-today").text("【 6号 】干捞水饺");
        setNoOrderStyle($("#menu-tip-today"));
        $(".list-today").remove();
      } else {
        $("#menu-tip-today").text("已点" + "（ " + menuNum + " 号 " + "）");
      }
    } else if (date == getDateTomorrow()) {
      itemIdPrefix = "#menu-tomorrow-0";
      if (menuNum == 7) {
        $("#menu-tip-tomorrow").text("【 不点餐 】");
        $(".list-tomorrow").remove();
        setNoOrderStyle($("#menu-tip-tomorrow"));
      } else if (menuNum == 6) {
        $("#menu-tip-tomorrow").text("【 6号 】干捞水饺");
        setNoOrderStyle($("#menu-tip-tomorrow"));
        $(".list-tomorrow").remove();
      } else {
        $("#menu-tip-tomorrow").text("已点" + "（" + " " + menuNum + " 号" + " " + "）");
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
      "justify-content": "center",
      "align-items": "center",
      "padding-top": "0px"
    });
  }
})
;



