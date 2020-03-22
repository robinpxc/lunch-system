$(document).ready(function () {
  let formattedDateToday = getDateToday();
  let formattedDateTomorrow = getDateTomorrow();
  let weekdayToday = new Date().getDay();
  let orderStatusToday = checkOrderStatus(formattedDateToday, false, "order-status");
  let orderStatusTomorrow = checkOrderStatus(formattedDateTomorrow, false, "order-status");
  removeAdminCard();
  initUI();
  setManageButtonEvents;

  function initUI() {
    initCardToday();
    initCardTomorrow();
  }

  function initCardToday() {
    let cardToday = $("#menu-card-today");
    $(".card-title-today span").text(getWeekDayCN(weekdayToday));
    setWeekendTitleStyle(true, weekdayToday);
    if (orderStatusToday == "order-exist") {
      updateCardStatus(cardToday, true);
      $("#order-info-today").text(setOrderInfoText(true, formattedDateToday));
    } else {
      updateCardStatus(cardToday, false);
      $("#order-info-today").text(setOrderInfoText(false, ""));
    }
  }

  function initCardTomorrow() {
    let cardTomorrow = $("#menu-card-tomorrow");
    $(".card-title-tomorrow span").text(getWeekDayCN(weekdayToday + 1));
    setWeekendTitleStyle(false, weekdayToday + 1);
    if (orderStatusTomorrow == "order-exist") {
      updateCardStatus(cardTomorrow, true);
      $("#order-info-tomorrow").text(setOrderInfoText(true, formattedDateTomorrow));
    } else {
      updateCardStatus(cardTomorrow, false);
    }
    $("#order-info-tomorrow").text(setOrderInfoText(false, ""));
  }

  function setWeekendTitleStyle(isToday, weekDay) {
    if(weekDay == 6 || weekDay == 0) {
      if(isToday) {
        $(".card-title-today .card-title-weekday").css("color", "red");
      } else {
        $(".card-title-tomorrow .card-title-weekday").css("color", "red");
      }
    }
  }

  function updateCardStatus(currentCard, isOrderExist) {
    removeOldClass(currentCard, isOrderExist ? "border-secondary" : "border-success");
    addNewClass(currentCard, isOrderExist ? "border-success" : "border-secondary");
  }

  function setOrderInfoText(isOrderExist, date) {
    alert(isOrderExist);
    return (isOrderExist ? setCardPreview(date) : "尚未点餐");
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

  function setCardPreview(date) {
    let orderContent = checkOrderStatus(date, false, "order-content");
    return "已点 " + orderContent.menu_number + " 号" + (orderContent.count == 1 ? "" : (" [" + orderContent.count +"份]"));
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

  function setManageButtonEvents() {
    $("#user-manage-btn").click(function () {
      window.location.href = "admin-user-management.php";
    });

    $("#menu-manage-btn").click(function () {
      window.location.href = "admin-menu-management.php";
    });

    $("#data-manage-btn").click(function () {
      window.location.href = "admin-data-management.php";
    });
  }
});



