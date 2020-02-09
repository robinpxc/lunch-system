$(document).ready(function () {
  var date = $.cookie("order-date");
  initUI();
  fetchMenuList(date);

  $(window).resize(function(){
    initUI();
  });

  function initUI() {
    setOrderInfo();
    fitWindow();
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
    if($("#order-status").val() == "order-exist") {
      $("#order-info-text".text("今日午餐已选, 点击选项直接修改"));
      $("#order-info-text").css("color", "green");
    } else if($("#order-status").val() == "no-order") {
      $("#order-info-text").text("今日尚未选择午餐, 点击选项以选择");
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
          var menuArray = JSON.parse(response);
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
    for (var i = 0; i < 7; i++) {
      for (var j = 0; j < 3; j++) {
        var foodId = "#" + "food" + "-" + "0" + (i + 1) + "-" + "0" + (j + 1);
        $(foodId).text(decodeUnicode(menuArray[i][j]).split(','));
      }
    }
  }

  // Card click event
  $(".card").each(function () {
    $(this).click(function() {
      var menuNum = $(this).index();
      $.ajax({
        type: "POST",
        url: "../php/functions/order-operation.php",
        data: {
          "order-number": menuNum,
          "order-date": date,
          "order-status":$("#order-status").val()
        },
        dataType: "json",
        success: function (response) {
          clearCardBorder();
          $(this).css("border","solid forestgreen 6px");
        },
        error: function (e, ts, et) {
          //alert("error:" + ts);
          alert("Ajax菜单状态检查错误，请刷新页面或者切换网络环境，或联系开发者");
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
});



