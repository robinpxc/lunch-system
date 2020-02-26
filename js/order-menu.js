$(document).ready(function () {
  let date = $.cookie("order-date");
  let orderStatus = checkOrderStatus(date, false, "order-status");
  let orderNumber;
  if(isOrderExist()) {
    orderNumber = checkOrderStatus(date, false, "order-number");
  }

  initUI();
  fetchMenuList(date);

  $(window).resize(function(){
    initUI();
  });

  function initUI() {
    setOrderInfo();
    fitWindow();
    setSelectBorder($(".card").eq(orderNumber - 1));
  }

  function fitWindow() {
    if(getWindowWidth() <= 768) {
      $("form").css({
        "display": "block",
        "flex-wrap": ""
      });
      $(".card").css("min-width", "100%");

    } else {
      $("form").css({
        "display": "flex",
        "flex-wrap": "wrap"
      });
      $(".card").css("min-width", "32%");
    }
  }

  function setOrderInfo() {
    if(isOrderExist()) {
      if(date == getDateToday()) {
        if(orderNumber == 7) {
          $("#order-info-text").text("今日已选择不订餐！");
          $("#order-info-text").css("color", "red");
        } else {
          $("#order-info-text").text("今日已选择 " + orderNumber + " 号午餐");
          $("#order-info-text").css("color", "green");
        }
      } else {
        if(orderNumber == 7) {
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

// Function to fetch menu from server
  function fetchMenuList(date) {
    $.ajax({
      type: "POST",
      url: "../php/functions/fetch-menu.php",
      data: {
        'date': date
      },
      dataType: "json",
      success: function (response) {
        if (response != null) {
          var menuArray = response;
          setMenuData(menuArray);
        } else {
          alert("获取状态失败，请重试！");
        }
      },
      error: function (errorMsg) {
        alert("获取状态失败，Ajax获取菜单数据错误，请刷新页面或者切换网络环境，或联系开发者");
      }
    });
  }

  function setMenuData(menuArray) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        let foodId = "#" + "food" + "-" + "0" + (i + 1) + "-" + "0" + (j + 1);
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
    return (orderStatus == "order-exist") ? true : false;
  }
});



