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
function checkOrderStatus(date, checkType, userId, async) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/check-order-status.php",
    data: {
      "order-date": date,
      "check-type":checkType,
      "user-id": userId
    },
    dataType: "json",
    async: async,
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      deferred.resolve(response);
    },
    complete: function() {
      removeSpinner();
    },
    error: function (errorMsg) {
      $(".main-content").html(errorMsg.responseText);
      alert("订单状态检查失败，请刷新页面或者切换网络环境，或联系开发者");
      removeSpinner();
    }
  });
  return deferred.promise();
}

/*
* Function to fetch daily orders.
* This function will return daily orders.
* Parameters:
*   date:  [string] Will determine the date of order.
*   async: [boolean] will determine the function will work on sync/async mode.
* */
function fetchDailyOrderStatus(date, group) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-daily-orders.php",
    data: {
      "date": date,
      "group": group
    },
    dataType: CONSTANTS.AJAX.DATA_TYPE.JSON,
    success: function (response) {
      deferred.resolve(response);
    },
    error: function () {
      alert("获取订单信息失败，Ajax数据错误，请刷新或切换网络环境，再或联系开发者");
    },
    complete: function() {}
  });
  return deferred.promise();
}

/*
* Function to fetch monthly summary.
* This function will return an array of each users' orders within a month.
* Parameters:
*   year:  [string] Will determine the year of order.
*   month: [string] will determine the month of orders.
*   async: [boolean] will determine the function will work on sync/async mode.
* */
function fetchMonthlySummary(year, month) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-monthly-data.php",
    data: {
      "year": year,
      "month": month
    },
    dataType: "JSON",
    success: function (response) {
      deferred.resolve(response);
    },
    error: function () {
      alert("获取月账单失败，Ajax数据错误，请刷新或切换网络环境，再或联系开发者");
    },
    complete: function() {}
  });
  return deferred.promise();
}

function fetchMonthCountByOrderNum(year, month) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-monthly-count-by-order-num.php",
    data: {
      "year": year,
      "month": month
    },
    dataType: "JSON",
    success: function (response) {
      deferred.resolve(response);
    },
    error: function () {
      alert("获取月统计数据失败，请重试");
    },
    complete: function() {}
  });
  return deferred.promise();
}

/*
* Function to set user daily order, normally set for the next day.
* Parameters:
*   date: formatted date as "YYYY-MM-DD"
*   user-id: userId
*   order-num: order number, value between 1-6, 6 is not order tomorrow
* */
function setDailyOrder(date, userId, orderNum, orderStatus) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/order-operation.php",
    data: {
      "date": date,
      "user-id": userId,
      "order-number": orderNum,
      "order-status": orderStatus
    },
    async: true,
    dataType: "JSON",
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      deferred.resolve(response);
    },
    error: function () {
      alert("点餐异常，请重试");
      refresh();
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}

/*
* Function to get order price by type "original order" and "discount order", will return an array.
* */
function getOrderPrice() {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/get-order-price.php",
    data: {
    },
    dataType: CONSTANTS.AJAX.DATA_TYPE.JSON,
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      deferred.resolve(response);
    },
    error: function () {
      alert("价格信息异常，请重试");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}

/*
* Function to update order price by type "original order" and "discount order", will return an array.
* Parameters:
*   price: single price for a meal
*   type: determine the price type, from CONSTANT.PRICE
* */
function updateOrderPrice(price, type) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/update-order-price.php",
    data: {
      "price": price,
      "type": type
    },
    dataType: CONSTANTS.AJAX.DATA_TYPE.JSON,
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      deferred.resolve(response);
    },
    error: function () {
      alert("价格更新异常，请重试");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}


