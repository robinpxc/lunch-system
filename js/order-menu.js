$(document).ready(function () {
  let date = $.cookie(CONSTANTS.COOKIE.ORDER.KEY_DATE);
  let userId = $.cookie(CONSTANTS.COOKIE.USER.KEY_ID)
  let orderStatus = null;
  let orderNumber = null;

  initUI();

  checkOrderStatus(date, CONSTANTS.ORDER.CHECK_TYPE.ORDER_STATUS, userId, true).done(function(response) {
    orderStatus = response;
    if(isOrderExist()) {
      checkOrderStatus(date, CONSTANTS.ORDER.CHECK_TYPE.ORDER_CONTENT, userId, true).done(function(orderContent) {
        alert(orderContent);
      });
    }
  });


  fetchMenuList(date);

  function initUI() {
    setOrderCard();
    setOrderInfo();
    setSelectBorder($(".card").eq(orderNumber - 1));
    fetchMenuList(date).done(function(menuList) {
      setMenuData(menuList);
    });
  }

  function setOrderCard() {
    let cardContainer = $(".card-container");
    cardContainer.empty();
    for(let i = 1; i <= CONSTANTS.MENU.COUNT + 1; i++) {
      cardContainer.append("<div class='card order-card-" + i +"'>")
      let card = $(".order-card-" + i);
      card.append("<div class='card-header'>" + (i == CONSTANTS.ORDER.CONTENT.NO_ORDER ? "【不订餐】" : "套餐【" + i + "】"));
      card.append("<div class='card-body menu menu-" + i + "'>");
      let menuContainer = $(".menu-" + i);
      menuContainer.append("<ul>");
      let ul = $(".menu-" + i + " ul");
      for(let j = 1; j <= CONSTANTS.MENU.SUB_COUNT; j++) {
        ul.append("<li id='food-" + i + "-" + j + "'>");
      }
    }
  }

  function setOrderInfo() {
    if(isOrderExist()) {
      if(date == getDateToday()) {
        if(orderNumber == CONSTANTS.MENU.COUNT) {
          $("#order-info-text").text("今日已选择不订餐！");
          $("#order-info-text").css("color", "red");
        } else {
          $("#order-info-text").text("今日已选择 " + orderNumber + " 号午餐");
          $("#order-info-text").css("color", "green");
        }
      } else {
        if(orderNumber == CONSTANTS.MENU.COUNT) {
          $("#order-info-text").text("明日已选择不订餐！");
          $("#order-info-text").css("color", "red");
        } else {
          $("#order-info-text").text("明日已选择 " + orderNumber + " 号午餐");
          $("#order-info-text").css("color", "green");
        }
      }
    } else if(!isOrderExist()) {
      if(date == getDateToday()) {
        $("#order-info-text").text("今日尚未点餐");
      } else {
        $("#order-info-text").text("明日未选午餐");
      }
      $("#order-info-text").css("color", "orange");
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
  $(".card").each(function () {
    $(this).click(function() {
      var menuNum = $(this).index() + 1;
      setSelectBorder($(this), menuNum);
      $.ajax({
        type: "POST",
        url: "../php/functions/order-operation.php",
        data: {
          "order-number": menuNum,
          "order-date": date,
          "order-status":orderStatus
        },
        dataType: "json",
        success: function (response) {

        },
        error: function (e, ts, et) {
          alert("菜单状态检查错误，请刷新页面或者切换网络环境，或联系开发者");
        },
        complete: function() {
          if(menuNum == 7) {
            if(date == getDateToday()) {
              alert("今日 - 已选择【 不订餐 】！");
            } else {
              alert("明日 - 已选择【 不订餐 】！");
            }
          } else if(menuNum == 6) {
            if(date == getDateToday()) {
              alert("今日 - 成功预定【干捞水饺】");
            } else {
              alert("明日 - 成功预定【干捞水饺】");
            }
          } else {
            if(date == getDateToday()) {
              alert("今日 - 成功预定 " + "【 " + menuNum + " 】号餐");
            } else {
              alert("明日 - 成功预定 " + "【 " + menuNum + " 】号餐");
            }
          }
          window.location.href = "../php/user-main.php";
        }
      });

    });
  });

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



