/*
* This file contains all functions for menu operation
* */
$(document).ready(function() {
});
/*
* Function to check if a menu has been set for a day.
* This function will return a "menu-exist" if a menu exist for a day,
* and return a "no-menu" if menu not exist for a day.
*
* Parameters:
*   date:  [string] Will determine the date of order.
*   async: [boolean] will determine the function will work on sync/async mode
* */
function checkMenuStatus(date, async) {
  let menuStatus = "";
  $.ajax({
    type: "post",
    url: "../php/functions/check-menu-status.php",
    data: {
      "selected-date": date
    },
    dataType: "json",
    async: async,
    success: function (response) {
      menuStatus = response;
    },
    error: function (errorMsg) {
      alert("菜单状态查询失败，Ajax发生错误，请刷新或者切换网络，再或联系开发者");
      $(".menu-title").html(errorMsg.responseText);
    }
  });
  return menuStatus;
}

/*
* Function to check if a order has been set with a person for a day.
* This function will return a "order-exist" if a order exist for a day,
* and return a "no-order" if order not exist for a day.
*
* Parameters:
*   date:  [string] Will determine the date of order.
*   async: [boolean] will determine the function will work on sync/async mode
*   (User id will be used by session data)
*   type:  [string] Will determine data return type. "order-status" and "order-number"
* */
function checkOrderStatus(date, async, type) {
  let orderStatus = "";
  let orderNumber = -1;
  $.ajax({
    type: "post",
    url: "../php/functions/check-order-status.php",
    data: {
      "order-date": date,
      "check-type":type
    },
    dataType: "json",
    async: async,
    success: function (response) {
      if(type == "order-status") {
        orderStatus = response;
      } else if(type == "order-number") {
        orderNumber = response;
      }
    },
    error: function (errorMsg) {
      alert("订单状态检查失败，Ajax菜单状态检查错误，请刷新页面或者切换网络环境，或联系开发者");
    }
  });

  if(type == "order-status") {
    return orderStatus;
  } else {
    return orderNumber;
  }
}

/*
* Function to fetch menu list detail from remote.
* This function will return a 7 * 3 array for all menu data in one day.
* Parameters:
*   date:  [string] Will determine the date of order.
*   async: [boolean] will determine the function will work on sync/async mode.
* */
function fetchMenu(date, async) {
  let menuArray = new Array();
  $.ajax({
    type: "POST",
    url: "../php/functions/fetch-menu.php",
    data: {
      'date': date
    },
    dataType: "json",
    async: async,
    success: function (response) {
      if (response != null) {
        menuArray = JSON.parse(response);
      } else {
        alert("菜单为空！");
      }
    },
    error: function (errorMsg) {
      alert("获取菜单失败，Ajax数据错误，请刷新或切换网络环境，再或联系开发者");
    }
  });
}