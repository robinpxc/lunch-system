$(document).ready(function () {
  let group = $.cookie(CONSTANTS.COOKIE.USER.KEY_GROUP);
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
    setConfirmationStatus();
    initPriceModifyComponent(oriPrice, discountPrice);
  }

  function initCardToday() {
    let cardToday = $("#menu-card-today");
    $(".card-title-today span").text(getWeekDayCN(weekdayToday));
    setWeekendTitleStyle(true, weekdayToday);
    if(menuStatusToday == CONSTANTS.MENU.STATUS.NO_MENU) {
      $("#order-info-today").text("没有菜单");
      $("#menu-card-today .card-footer").remove();
    } else {
      if (orderStatusToday == CONSTANTS.ORDER.STATUS.ORDER_EXIST) {
        updateCardStatus(cardToday, true);
        setCardPreview(true, formattedDateToday);
      } else {
        updateCardStatus(cardToday, false);
        setCardPreview(false, formattedDateToday);
      }
    }
  }

  function initCardTomorrow() {
    let cardTomorrow = $("#menu-card-tomorrow");
    $(".card-title-tomorrow span").text(getWeekDayCN(weekdayTomorrow));
    if(menuStatusTomorrow == CONSTANTS.MENU.STATUS.NO_MENU) {
      $("#order-info-tomorrow").text("没有菜单");
      $("#menu-card-tomorrow .card-footer").remove();
    } else {
      setWeekendTitleStyle(false, weekdayTomorrow);
      if (orderStatusTomorrow == CONSTANTS.ORDER.STATUS.ORDER_EXIST) {
        updateCardStatus(cardTomorrow, true);
        setCardPreview(true, formattedDateTomorrow);
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
          $("#admin-card .card-info").text("点餐已完成");
          setAdminCardStyle(CONSTANTS.COLOR.GREEN_SUCCESS);
        } else if((confirmationToday == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED && confirmationTomorrow != CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED) || (confirmationToday != CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED && confirmationTomorrow == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED)) {
          replaceClass($("#admin-card"), "border-secondary", "border-warning");
          if(confirmationToday == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED && confirmationTomorrow != CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED ) {
            $("#admin-card .card-info").text("【明日】点餐未上报！");
            setAdminCardStyle(CONSTANTS.COLOR.YELLOW_WARNING);
          } else if(confirmationToday != CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED && confirmationTomorrow == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED) {
            if(isOrderTodayTimeout()) {
              $("#admin-card .card-info").text("【点餐】已上报");
              setAdminCardStyle(CONSTANTS.COLOR.GREEN_SUCCESS);
              replaceClass($("#admin-card"), "border-warning", "border-success");
            } else {
              $("#admin-card .card-info").text("【今日】点餐未上报！");
              setAdminCardStyle(CONSTANTS.COLOR.GREEN_SUCCESS);
            }
          }
        } else {
          if(isOrderTodayTimeout()) {
            replaceClass($("#admin-card"), "border-secondary", "border-warning");
            $("#admin-card .card-info").text("【明日】点餐未上报！");
            setAdminCardStyle(CONSTANTS.COLOR.YELLOW_WARNING);
          } else {
            replaceClass($("#admin-card"), "border-secondary", "border-danger");
            setAdminCardStyle(CONSTANTS.COLOR.RED_DANGER);
            $("#admin-card .card-info").text("【两日】点餐未上报");
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
          if(date == getDateToday()) {
            $("#order-info-today").text("【不订餐】");
          } else {
            $("#order-info-tomorrow").text("【不订餐】");
          }
        } else {
          fetchMenuList(date).done(function(menuArray) {
            let liPrefix = date == getDateToday() ? "#td-li-" : "#tm-li-";
            for(let i = 0; i < CONSTANTS.MENU.SUB_COUNT; i++) {
              $(liPrefix + (i + 1)).text(decodeUnicode(menuArray[Number(orderNum) - 1][i]));
            }
          });
        }
      });

      replaceClass(date == getDateToday() ? $("#btn-order-today") : $("#btn-order-tomorrow"), "btn-primary", "btn-success");
      if(date == getDateToday()) {
        $("#btn-order-today").text("修改订单");
      } else {
        $("#btn-order-tomorrow").text("修改订单");
      }
    } else {
      setOrderInfoText(date, "尚未订餐");
    }
  }

  function setOrderInfoText(date, text) {
    if(date ==formattedDateToday) {
      $("#order-info-today").text(text);
    } else {
      $("#order-info-tomorrow").text(text);
    }
  }

  function setOrderExistStyle(date) {
    if(date ==formattedDateToday) {
      addNewClass($("#order-info-today"), "order-exist");
    } else {
      addNewClass($("#order-info-tomorrow"), "order-exist");
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
      jumpTo("admin-user-management.php");
    });

    $("#menu-manage-btn").click(function () {
      if(isOrderTodayTimeout()) {
        directToTomorrow();
      } else {
        chooseOrderDate();
      }
    });

    $("#data-manage-btn").click(function () {
      window.location.href = "admin-data-management.php";
    });

    $("#menu-config-card").click(function() {
      window.location.href = "admin-menu-management.php";
    });
  }

  function chooseOrderDate() {
    jqDialog("请选择订餐【日期】", "点 x 取消操作", CONSTANTS.DATE.CN.TODAY, CONSTANTS.DATE.CN.TOMORROW, function() {
      $.cookie(CONSTANTS.COOKIE.KEY_DATE_TYPE, CONSTANTS.DATE.TODAY);
      jumpTo("admin-menu-operation.php");
    }, function() {
      $.cookie(CONSTANTS.COOKIE.KEY_DATE_TYPE, CONSTANTS.DATE.TOMORROW);
      jumpTo("admin-menu-operation.php");
    });
  }

  function directToTomorrow() {
    jqWarning("跳转提示", "今日订餐已<span class='emphasised-red'>无法修改</span>，将直接跳转到<span class='emphasised-red'>【明日】</span>订餐界面", function() {
      $(".btn-orange").attr("id", "single-warning");
      jumpTo("admin-menu-operation.php");
    });
  }

  function orderBtnClickEvents() {
    $(".btn-order").each(function() {
      $(this).click(function() {
        switch ($(this).attr("id")) {
          case "btn-order-today":
            $.cookie(CONSTANTS.COOKIE.ORDER.KEY_DATE, getDateToday());
            jumpTo("order-menu.php");
            break;
          case "btn-order-tomorrow":
            $.cookie(CONSTANTS.COOKIE.ORDER.KEY_DATE, getDateTomorrow());
            jumpTo("order-menu.php");
            break;
        }
      });

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



