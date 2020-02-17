/*
* Function to fetch daily orders.
* This function will return daily orders.
* Parameters:
*   date:  [string] Will determine the date of order.
*   async: [boolean] will determine the function will work on sync/async mode.
* */
function fetchDailyOrderStatus(date, async) {
  let dataArray = new Array();
  $.ajax({
    type: "POST",
    url: "../php/functions/fetch-daily-orders.php",
    data: {
      "date": date
    },
    async: async,
    dataType: "JSON",
    success: function (response) {
      dataArray = response;
    },
    error: function () {
      alert("获取订单信息失败，Ajax数据错误，请刷新或切换网络环境，再或联系开发者");
    },
    complete: function() {}
  });
  return dataArray;
}