$(document).ready(function () {
  let group = $.cookie(CONSTANTS.COOKIE.USER.KEY_GROUP);
  let userRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
  let formattedDateToday = getDateToday();
  let formattedDateTomorrow = getDateTomorrow();
  let weekdayToday = new Date().getDay();
  let weekdayTomorrow = weekdayToday == 6 ? 0 : weekdayToday + 1;
  let menuStatusToday = null;
  let menuStatusTomorrow = null;
  let orderStatusToday = null;
  let orderStatusTomorrow = null;
  let confirmationToday = null;
  let confirmationTomorrow = null;
  let oriPrice;
  let discountPrice;

  removeAdminCard();
  setManageButtonEvents();

  // Function calls
  checkMenuStatus(formattedDateToday).done(function(response) {
    menuStatusToday = response;
    checkMenuStatus(formattedDateTomorrow).done(function(response) {
      menuStatusTomorrow = response;
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
    });
  });

  // Function declarations
  function initUI() {
    initCardToday();
    initCardTomorrow();
    orderBtnClickEvents();
    if(userRole == CONSTANTS.USER.ROLE.ADMIN_GROUP || userRole == CONSTANTS.USER.ROLE.ADMIN_MENU) {
      setConfirmationStatus();
    }
    initPriceModifyComponent(oriPrice, discountPrice);
  }

  function initCardToday() {
    let cardToday = $("#menu-card-today .card-body");
    $(".card-title-today span").text(getWeekDayCN(weekdayToday));
    setWeekendTitleStyle(true, weekdayToday);
    if(menuStatusToday == CONSTANTS.MENU.STATUS.NO_MENU) {
      replaceClass($("#menu-card-today .card-body"), "detail-body", "common-body");
      $("#order-info-today").text("没有菜单");
      $("#menu-card-today .card-footer").remove();
    } else {
      replaceClass($("#menu-card-today .card-body"), "common-body", "detail-body");
      if (orderStatusToday == CONSTANTS.ORDER.STATUS.ORDER_EXIST) {
        updateCardStatus(cardToday, true);
        setCardPreview(true, formattedDateToday);
        if(isOrderTodayTimeout()) {
          setDisable($("#btn-order-today"));
          $("#btn-order-today").text("已无法修改");
        }
        checkMenuConfirmation(getDateToday(), group, function(status) {
          if(status == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED) {
            setDisable($("#btn-order-today"));
            $("#btn-order-today").text("今日订餐已上报");
          }
        });
      } else {
        updateCardStatus(cardToday, false);
        setCardPreview(false, formattedDateToday);
        if(isOrderTodayTimeout()) {
          setDisable($("#btn-order-today"));
          $("#btn-order-today").text("已无法订餐");
        }
      }
    }
  }

  function initCardTomorrow() {
    let cardTomorrow = $("#menu-card-tomorrow");
    $(".card-title-tomorrow span").text(getWeekDayCN(weekdayTomorrow));
    if(menuStatusTomorrow == CONSTANTS.MENU.STATUS.NO_MENU) {
      replaceClass($("#menu-card-tomorrow .card-body"), "detail-body", "common-body");
      $("#order-info-tomorrow").text("没有菜单");
      $("#menu-card-tomorrow .card-footer").remove();
    } else {
      replaceClass($("#menu-card-tomorrow .card-body"), "common-body", "detail-body");
      setWeekendTitleStyle(false, weekdayTomorrow);
      if (orderStatusTomorrow == CONSTANTS.ORDER.STATUS.ORDER_EXIST) {
        updateCardStatus(cardTomorrow, true);
        setCardPreview(true, formattedDateTomorrow);
        checkMenuConfirmation(getDateTomorrow(), group, function(status) {
          if(status == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED) {
            setDisable($("#btn-order-tomorrow"));
            $("#btn-order-tomorrow").text("明日订餐已上报");
          }
        });
      } else {
        updateCardStatus(cardTomorrow, false);
        setCardPreview(false, formattedDateTomorrow);
      }
    }
  }

  function setConfirmationStatus() {
    checkMenuConfirmation(getDateToday(), group, function(todayStatus) {
      confirmationToday = todayStatus;
      checkMenuConfirmation(getDateTomorrow(), group, function(tomorrowStatus) {
        confirmationTomorrow = tomorrowStatus;
        if(confirmationToday == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED && confirmationTomorrow == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED) {
          replaceClass($("#admin-card"), "border-secondary", "border-success");
          $("#admin-card .card-info").text("订餐已完成");
          setAdminCardStyle(CONSTANTS.COLOR.GREEN_SUCCESS);
        } else if((confirmationToday == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED && confirmationTomorrow != CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED) || (confirmationToday != CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED && confirmationTomorrow == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED)) {
          replaceClass($("#admin-card"), "border-secondary", "border-warning");
          if(confirmationToday == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED && confirmationTomorrow != CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED ) {
            $("#admin-card .card-info").text("【明日】订餐未上报！");
            setAdminCardStyle(CONSTANTS.COLOR.YELLOW_WARNING);
          } else if(confirmationToday != CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED && confirmationTomorrow == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED) {
            if(isOrderTodayTimeout()) {
              $("#admin-card .card-info").text("【订餐】已上报");
              setAdminCardStyle(CONSTANTS.COLOR.GREEN_SUCCESS);
              replaceClass($("#admin-card"), "border-warning", "border-success");
            } else {
              $("#admin-card .card-info").text("【今日】订餐未上报！");
              setAdminCardStyle(CONSTANTS.COLOR.GREEN_SUCCESS);
            }
          }
        } else {
          if(isOrderTodayTimeout()) {
            replaceClass($("#admin-card"), "border-secondary", "border-warning");
            $("#admin-card .card-info").text("【明日】订餐未上报！");
            setAdminCardStyle(CONSTANTS.COLOR.YELLOW_WARNING);
          } else {
            replaceClass($("#admin-card"), "border-secondary", "border-danger");
            setAdminCardStyle(CONSTANTS.COLOR.RED_DANGER);
            $("#admin-card .card-info").text("【两日】订餐未上报");
          }
        }
      });
    });
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
    let userRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
    if (userRole === CONSTANTS.USER.ROLE.USER || userRole === CONSTANTS.USER.ROLE.GUEST) {
      $(".card-admin").remove();
      $("#admin-price-card").remove();
      $("#menu-config-card").remove();
    } else if(userRole === CONSTANTS.USER.ROLE.ADMIN_GROUP) {
      $("#admin-price-card").remove();
      $("#menu-config-card").remove();
    }
  }

  function setCardPreview(isOrderExist, date) {
    if(isOrderExist) {
      checkOrderStatus(date, CONSTANTS.ORDER.CHECK_TYPE.ORDER_CONTENT, "session", true).done(function(orderContent) {
        let orderNum = null;
        let orderCount = null
        orderNum = orderContent.menu_number;
        orderCount = orderContent.count;
        if(orderNum > 0 && orderNum <= CONSTANTS.MENU.COUNT) {
          setOrderExistStyle(date);
          if(orderNum != CONSTANTS.ORDER.CONTENT.NO_ORDER) {
            let orderDetail = orderNum + " 号" + (orderCount == 1 ? "" : (" 【" + orderCount +"份】"));
            setOrderInfoText(date, orderDetail);
          } else {
            setNoOrderStyle(date);
            setOrderInfoText(date,  "不订餐");
          }
        }

        if(orderNum == CONSTANTS.MENU.COUNT + 1) {
          if(isToday(date)) {
            replaceClass($("#menu-card-today .card-body"), "detail-body", "common-body");
            $("#order-info-today").text("【不订餐】");
            $("#menu-card-today .card-body ul").remove();
          } else {
            replaceClass($("#menu-card-tomorrow .card-body"), "detail-body", "common-body");
            $("#order-info-tomorrow").text("【不订餐】");
            $("#menu-card-tomorrow .card-body ul").remove();
          }
        } else {
          replaceClass($("#order-info-tomorrow .card-body"), "common-body", "detail-body");
          fetchMenuList(date).done(function(menuArray) {
            let liPrefix = isToday(date) ? "#td-li-" : "#tm-li-";
            for(let i = 0; i < CONSTANTS.MENU.SUB_COUNT; i++) {
              $(liPrefix + (i + 1)).text(decodeUnicode(menuArray[Number(orderNum) - 1][i]));
            }
          });
        }
      });

      replaceClass(isToday(date) ? $("#btn-order-today") : $("#btn-order-tomorrow"), "btn-primary", "btn-success");
      if(isToday(date)) {
        $("#btn-order-today").text("修改订单");
      } else {
        $("#btn-order-tomorrow").text("修改订单");
      }
    } else {
      if(isToday(date)) {
        replaceClass($("#menu-card-today .card-body"), "detail-body", "common-body");
      } else {
        replaceClass($("#menu-card-tomorrow .card-body"), "detail-body", "common-body");
      }

      setOrderInfoText(date, "尚未订餐");
    }
  }

  function setOrderInfoText(date, text) {
    if(isToday(date)) {
      $("#order-info-today").text(text);
    } else {
      $("#order-info-tomorrow").text(text);
    }
  }

  function setOrderExistStyle(date) {
    if(isToday(date)) {
      addNewClass($("#order-info-today"), "order-exist");
    } else {
      addNewClass($("#order-info-tomorrow"), "order-exist");
    }
  }

  function setNoOrderStyle(date) {
    if(isToday(date)) {
      replaceClass($("#menu-card-today"), "border-secondary", "border-warning");
    } else {
      replaceClass($("#menu-card-tomorrow"), "border-secondary", "border-warning");
    }
  }

  function setAdminCardStyle(color) {
    $("#admin-card .card-info").css("color", color);
    $("#admin-card .card-header").css({
      "background": color,
      "border": "solid" + " " + color + " 2px",
      "border-top-left-radius": "2px",
      "border-top-right-radius": "2px",
      "color": "white"
    });
  }

  function setManageButtonEvents() {
    $("#user-manage-btn").click(function () {
      $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_ALL);
      window.location.href = "admin-user-management.php";
    });

    $("#menu-manage-btn").click(function () {
      $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_ALL);
      if(isOrderTodayTimeout()) {
        directToTomorrow();
      } else {
        chooseOrderDate();
      }
    });

    $("#data-manage-btn").click(function () {
      $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_ALL);
      window.location.href = "admin-data-management.php";
    });

    $("#menu-config-card").click(function() {
      window.location.href = "admin-menu-management.php";
    });
  }

  function orderBtnClickEvents() {
    $(".btn-order").each(function() {
      $(this).click(function() {
        switch ($(this).attr("id")) {
          case "btn-order-today":
            $.cookie(CONSTANTS.COOKIE.ORDER.KEY_DATE, getDateToday());
            window.location.href ="order-menu.php";
            break;
          case "btn-order-tomorrow":
            $.cookie(CONSTANTS.COOKIE.ORDER.KEY_DATE, getDateTomorrow());
            window.location.href ="order-menu.php";
            break;
        }
      });

    });
  }
});



