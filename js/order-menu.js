$(document).ready(function () {
  initUI();
  var date = $.cookie("order-date");
  fetchMenuList(date);

  $(window).resize(function(){
    initUI();
  });

  function initUI() {
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
      $.ajax({
        type: "POST",
        url: "../php/functions/order-operation.php",
        data: {
          "order-number": ($(this).index() + 1),
          "order-date": date
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



