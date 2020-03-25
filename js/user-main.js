$(document).ready(function () {
  let formattedDateToday = getDateToday();
  let formattedDateTomorrow = getDateTomorrow();
  let weekdayToday = new Date().getDay();
  let orderStatusToday = null;
  let orderStatusTomorrow = null;

  // Function calls
  checkOrderStatus(formattedDateToday, "order-status").done(function(response) {
    orderStatusToday = response;
    checkOrderStatus(formattedDateTomorrow, "order-status").done(function(response) {
      orderStatusTomorrow = response;
      initUI();
    });
  });

  removeAdminCard();
  setManageButtonEvents();

  // Function declarations
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
      setCardPreview(true, formattedDateToday);
    } else {
      updateCardStatus(cardToday, false);
      setCardPreview(false, formattedDateToday);
    }
  }

  function initCardTomorrow() {
    let cardTomorrow = $("#menu-card-tomorrow");
    $(".card-title-tomorrow span").text(getWeekDayCN(weekdayToday + 1));
    setWeekendTitleStyle(false, weekdayToday + 1);
    if (orderStatusTomorrow == "order-exist") {
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
      checkOrderStatus(date, "order-content").done(function(orderContent) {
        let orderNum = null;
        let orderCount = null
        orderNum = orderContent.menu_number;
        orderCount = orderContent.count;
        if(orderNum > 0 && orderNum <= 6) {
          if(orderNum != 6) {
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
      transferUserData();
      window.location.href = "admin-user-management.php";
    });

    $("#menu-manage-btn").click(function () {
      transferUserData();
      window.location.href = "admin-menu-management.php";
    });

    $("#data-manage-btn").click(function () {
      transferUserData();
      window.location.href = "admin-data-management.php";
    });
  }

  function transferUserData() {
    let userRole = $("#user-role-input").val();
    let userGroup = $("#user-group-input").val();
    if(userRole != "" && userGroup != "") {
      $.cookie("current-user-role", userRole);
      $.cookie("current-user-group", userGroup);
    } else {
      alert("用户数据传输错误，请刷新重试");
    }
  }
});



