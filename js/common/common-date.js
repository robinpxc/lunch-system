/*
* Function to fetch all years that have order records.
* This function will return an array contains a list of year with format yyyy.
* Parameters:
*   async: [boolean] will determine the function will work on sync/async mode.
* */
function fetchExistYear(async) {
  let menuArray = new Array();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-exist-years.php",
    data: {},
    dataType: "JSON",
    async: async,
    success: function (response) {
      if (response != null) {
        menuArray = response;
      }
    },
    error: function (errorMsg) {
      alert("获取可选年份失败，Ajax数据错误，请刷新或切换网络环境，再或联系开发者");
    }
  });
  return menuArray;
}

/*
* Function to fetch all months that have order records within a year.
* This function will return an array contains a list of month with format m.
* Parameters:
*   year: [string] will determine the year.
*   async: [boolean] will determine the function will work on sync/async mode.
* */
function fetchExistMonth(year, async) {
  let menuArray = new Array();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-exist-months.php",
    data: {
      "year": year
    },
    dataType: "JSON",
    async: async,
    success: function (response) {
      if (response != null) {
        menuArray = response;
      }
    },
    error: function (errorMsg) {
      alert("获取可选月份失败，Ajax数据错误，请刷新或切换网络环境，再或联系开发者");
    }
  });
  return menuArray;
}

/*
* Function to fetch all days that have order records within a month.
* This function will return an array contains a list of month with format dd.
* Parameters:
*   year: [string] will determine the year.
*   month: [String] will determine the month.
*   async: [boolean] will determine the function will work on sync/async mode.
* */
function fetchExistDays(year, month, async) {
  let menuArray = new Array();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-exist-days.php",
    data: {
      "year": year,
      "month": month
    },
    dataType: "JSON",
    async: async,
    success: function (response) {
      if (response != null) {
        menuArray = response;
      }
    },
    error: function (errorMsg) {
      alert("获取可选日期失败，Ajax数据错误，请刷新或切换网络环境，再或联系开发者");
    }
  });
  return menuArray;
}