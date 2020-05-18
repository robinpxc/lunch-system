$(document).ready(function () {
  let date = $.cookie(CONSTANTS.COOKIE.ORDER.KEY_DATE);
  let userId = $.cookie(CONSTANTS.COOKIE.USER.KEY_ID)
  let orderStatus = null;
  let orderNumber = null;
  let orderCount = null;

  initUI();

  checkOrderStatus(date, CONSTANTS.ORDER.CHECK_TYPE.ORDER_STATUS, userId, true).done(function(response) {
    orderStatus = response;
    if(isOrderExist()) {
      checkOrderStatus(date, CONSTANTS.ORDER.CHECK_TYPE.ORDER_CONTENT, userId, true).done(function(orderContent) {
        orderNumber = orderContent.menu_number;
        orderCount = orderContent.count;
        setOrderInfo();
        setSelectBorder($("#order-card-" + orderNumber));
      });
    }
    setOrderStatusBar(orderStatus == CONSTANTS.ORDER.STATUS.ORDER_EXIST);
    setMenuCardClickEvents();
  });

  function initUI() {
    setOrderCard();
    setOrderInfo();
    fetchMenuList(date).done(function(menuList) {
      setMenuData(menuList);
    });
  }

  function setOrderStatusBar(orderExist) {
    if(orderExist) {
      addNewClass($(".order-info"), "alert-success");
      hideElement($(".no-order-icon"));
      unhideElement($(".order-exist-icon"));
    } else {
      addNewClass($(".order-info"), "alert-danger");
      hideElement($(".order-exist-icon"));
      unhideElement($(".no-order-icon"));
    }
  }

  function setOrderCard() {
    let cardContainer = $(".card-container");
    cardContainer.empty();
    for(let i = 1; i <= CONSTANTS.MENU.COUNT + 1; i++) {
      cardContainer.append("<div class='card' id='order-card-" + i +"'>")
      let card = $("#order-card-" + i);
      card.append("<div class='card-header'>" + (i == CONSTANTS.ORDER.CONTENT.NO_ORDER ? "【不订餐】" : "套餐【" + i + "】"));
      card.append("<div class='card-body menu menu-" + i + "'>");
      let menuContainer = $(".menu-" + i);
      menuContainer.append("<ul>");
      if(i <= CONSTANTS.MENU.COUNT) {
        let ul = $(".menu-" + i + " ul");
        for(let j = 1; j <= CONSTANTS.MENU.SUB_COUNT; j++) {
          ul.append("<li id='food-" + i + "-" + j + "'>");
        }
      } else {
        menuContainer.text(date == getDateToday() ? "今天不订餐" : "明天不订餐");
        addNewClass(menuContainer, "center-content");
      }
    }
  }

  function setOrderInfo() {
    if(isOrderExist()) {
      if(date == getDateToday()) {
        if(orderNumber == CONSTANTS.MENU.COUNT) {
          $("#order-info-text").text("今日已选择【不订餐】！");
        } else {
          $("#order-info-text").text("今日已订 【" + orderNumber + "号" + (orderCount > 1 ? "， " + orderCount + "份】" : "】"));
        }
        $("#order-info-text").css("color", CONSTANTS.COLOR.GREEN_SUCCESS);
      } else {
        if(orderNumber == CONSTANTS.MENU.COUNT) {
          $("#order-info-text").text("明日已选择【不订餐】！");
        } else {
          $("#order-info-text").text("明日已订 【" + orderNumber + "号"  + (orderCount > 1 ?  "， " + orderCount + "份】" : "】"));
        }
        $("#order-info-text").css("color", CONSTANTS.COLOR.GREEN_SUCCESS);
      }
    } else if(!isOrderExist()) {
      if(date == getDateToday()) {
        $("#order-info-text").text("今日尚未点餐");
      } else {
        $("#order-info-text").text("明日未选午餐");
      }
      $("#order-info-text").css("color", CONSTANTS.COLOR.RED_DANGER);
    } else {
      alert("订单状态错误");
    }
  }

  function setMenuData(menuArray) {
    for (let i = 0; i < CONSTANTS.MENU.COUNT; i++) {
      for (let j = 0; j < CONSTANTS.MENU.SUB_COUNT; j++) {
        let foodId = "#food" + "-" + (i + 1) + "-" + (j + 1);
        $(foodId).text(decodeUnicode(menuArray[i][j]).split(','));
      }
    }
  }

  // Card click event
  function setMenuCardClickEvents() {
    $(".card").each(function () {
      $(this).click(function() {
        let cardId = $(this).attr("id");
        let orderNumber = cardId[Number(cardId.length - 1)];
        addCounterDialog(orderNumber);
        setSelectBorder($(this), orderNumber);
      });
    });
  }

  function addCounterDialog(orderNum) {
    $("body").append("<div class='counter-container'>");
    let container = $(".counter-container");
    container.append("<div class='card border-success counter-card'>");
    let card = $(".counter-card");
    card.append("<h5 class='card-header'>" + ((orderNum == (CONSTANTS.MENU.COUNT + 1)) ? "不订餐" : "确认份数(默认1份)") + "</h5>");
    card.append("<div class='card-body text-success counter'>");
    $(".counter").append("<div class='input-group'>");
    let inputGroup = $(".counter .input-group");
    inputGroup.append("<div class='input-group-prepend'>");
    $(".counter .input-group .input-group-prepend").append("<button class='btn btn-outline-secondary' type='button' id='btn-remove'>-</button>");
    inputGroup.append("<input type='number' class='form-control' id='counter-input' value='1' >");
    inputGroup.append("<div class='input-group-append'>");
    $(".counter .input-group .input-group-append").append("<button class='btn btn-outline-secondary' type='button' id='btn-add'>+</button>");
    card.append("<div class='card-footer text-success counter'>");
    let footer = $(".counter-container .card-footer");
    footer.append("<button class='btn btn-success btn-md' id='btn-order'>订餐");
    footer.append("<button class='btn btn-danger btn-md' id='btn-cancel-order'>取消");

    if(orderNum == CONSTANTS.ORDER_COUNT + 1) {
      $(".counter .input-group").empty();
      $(".counter .input-group").append("<h4>选择不订餐");
      $("#btn-order").text("提交");
    }

    let count = $("#counter-input").val();
    if(count <= 1) {
      setDisable($("#btn-remove"));
    }

    $("#btn-remove").click(function() {
      if($("#counter-input").val() > 1) {
        $("#counter-input").val(Number($("#counter-input").val()) - 1);
      }
      if($("#counter-input").val() <= 1) {
        setDisable($("#btn-remove"));
      }
    });

    $("#btn-add").click(function() {
      $("#counter-input").val(Number($("#counter-input").val()) + 1);
      if($("#counter-input").val() > 1) {
        setEnable($("#btn-remove"));
      }
    });

    $("#btn-cancel-order").click(function() {
      $(".counter-container").remove();
    });

    $("#btn-order").click(function() {
      let orderCount = orderNum == (CONSTANTS.ORDER_COUNT + 1) ? 0 :$("#counter-input").val();
      setDailyOrder(date, userId, orderNum, orderCount, orderStatus).done(function() {
        $(".counter-container").remove();
        jqInfo("订餐成功", (orderNum == (CONSTANTS.ORDER_COUNT + 1)) ? "已确认【不订餐】" : "已订 【" + orderNum + "号，" + orderCount + "份】", function() {
          refresh();
        });
      });
    });
  }

  // Function to clear all card border
  function clearCardBorder() {
    $(".card").each(function(){
      $(this).css("border","");
    });
  }

  function setSelectBorder(element) {
    clearCardBorder();
    element.css("border", "solid green 6px");
  }

  function isOrderExist() {
    return (orderStatus == CONSTANTS.ORDER.STATUS.ORDER_EXIST) ? true : false;
  }
});



