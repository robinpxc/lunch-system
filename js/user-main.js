$(document).ready(function () {
  let formattedDateToday = getDateToday();
  let formattedDateTomorrow = getDateTomorrow();
  let weekdayToday = new Date().getDay();
  let weekdayTomorrow = weekdayToday == 6 ? 0 : weekdayToday + 1;
  let orderStatusToday = null;
  let orderStatusTomorrow = null;
  let oriPrice;
  let discountPrice;

  // Function calls
  checkOrderStatus(formattedDateToday, CONSTANTS.ORDER.CHECK_TYPE.ORDER_STATUS, "session", true).done(function(response) {
    orderStatusToday = response;
    checkOrderStatus(formattedDateTomorrow, CONSTANTS.ORDER.CHECK_TYPE.ORDER_STATUS, "session", true).done(function(response) {
      orderStatusTomorrow = response;
      getOrderPrice().done(function(priceData) {
        oriPrice = Number(priceData[0][1]).toFixed(2);
        discountPrice = Number(priceData[1][1]).toFixed(2);
        initUI();
      });
    });
  });

  removeAdminCard();
  setManageButtonEvents();

  // Function declarations
  function initUI() {
    initCardToday();
    initCardTomorrow();
    initPriceModifyComponent(oriPrice, discountPrice);
  }

  function initCardToday() {
    let cardToday = $("#menu-card-today");
    $(".card-title-today span").text(getWeekDayCN(weekdayToday));
    setWeekendTitleStyle(true, weekdayToday);
    if (orderStatusToday == CONSTANTS.ORDER.STATUS.ORDER_EXIST) {
      updateCardStatus(cardToday, true);
      setCardPreview(true, formattedDateToday);
    } else {
      updateCardStatus(cardToday, false);
      setCardPreview(false, formattedDateToday);
    }
  }

  function initCardTomorrow() {
    let cardTomorrow = $("#menu-card-tomorrow");
    $(".card-title-tomorrow span").text(getWeekDayCN(weekdayTomorrow));
    setWeekendTitleStyle(false, weekdayTomorrow);
    if (orderStatusTomorrow == CONSTANTS.ORDER.STATUS.ORDER_EXIST) {
      updateCardStatus(cardTomorrow, true);
      setCardPreview(true, formattedDateTomorrow);
    } else {
      updateCardStatus(cardTomorrow, false);
      setCardPreview(false, formattedDateTomorrow);
    }
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

  $("#menu-order-btn-tomorrow" ).click(function () {
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

  function setCardPreview(isOrderExist, date) {
    if(isOrderExist) {
      checkOrderStatus(date, CONSTANTS.ORDER.CHECK_TYPE.ORDER_CONTENT, "session", true).done(function(orderContent) {
        let orderNum = null;
        let orderCount = null
        orderNum = orderContent.menu_number;
        orderCount = orderContent.count;
        if(orderNum > 0 && orderNum <= 6) {
          if(orderNum != CONSTANTS.ORDER.CONTENT.NO_ORDER) {
            let orderDetail = "已点 " + orderNum + " 号" + (orderCount == 1 ? "" : (" 【" + orderCount +"份】"));
            setOrderInfoText(date, orderDetail);
          } else {
            setNoOrderStyle(date);
            setOrderInfoText(date,  "不点餐");
          }
        }
      });
    } else {
      setOrderInfoText(date, "尚未点餐");
    }
  }

  function setOrderInfoText(date, text) {
    if(date ==formattedDateToday) {
      $("#order-info-today").text(text);
    } else {
      $("#order-info-tomorrow").text(text);
    }
  }

  function setNoOrderStyle(date) {
    if(date == formattedDateToday) {
      replaceClass($("#menu-card-today"), "border-secondary", "border-warning");
    } else if(date == formattedDateTomorrow) {
      replaceClass($("#menu-card-tomorrow"), "border-secondary", "border-warning");
    } else {
      alert("日期传递发生错误, 请刷新重试");
    }
  }

  function setManageButtonEvents() {
    $("#user-manage-btn").click(function () {
      jumpTo("admin-user-management.php");
    });

    $("#menu-manage-btn").click(function () {
      jumpTo("admin-menu-operation.php")
    });

    $("#data-manage-btn").click(function () {
      window.location.href = "admin-data-management.php";
      jumpTo("admin-data-management.php");
    });
  }

  function jumpTo(urlStr) {
    if(checkError()) {
      window.location.href = urlStr;
    } else {
      jqAlert("跳转错误", "必要数据加载失败，请尝试刷新或重新登录！");
    }
  }

  function checkError() {
    if(orderStatusToday != null && orderStatusToday != "") {
      if(orderStatusTomorrow != null && orderStatusTomorrow != "") {
        return true;
      }
      return false;
    }
    return false;
  }
});



