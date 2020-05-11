$(document).ready(function() {
  let userId = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DETAIL_ID);
  let userName = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DETAIL_NAME);
  let year = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_YEAR);
  let month = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_MONTH);

  initUI();
  setTableData(year, month, userId);

  function initUI() {
    setTitle();
    setFormTitle();
  }

  function setTitle() {
    $("title").text(userName + " - " + year + "年" + month + "月详单");
  }

  function setFormTitle() {
    $(".detail-title").text(userName + " - " + year + "年" + month + "月详单");
  }

  function setTableData(year, month, userId) {
    userMonthlyDetails(year, month, userId).done(function(responseArray) {
      let tbody = $(".detail-content");
      let orderSum = 0;
      let countSum = 0;
      for(let dailyData of responseArray ) {
        // Daily data
        let date = dailyData[0];
        let orderNum = dailyData[1];
        let orderCount = dailyData[2];
        let orderText = orderNum == 6 ? "不订餐" : orderNum + " 号";
        let countText = orderCount == 0 ? "不订餐" : orderCount + " 份";
        orderSum += 1;
        countSum += Number(orderCount);

        // Set table
        tbody.append("<tr class='tr-" + date + "'>");
        let dailyTr = $(".tr-" + date);
        dailyTr.append("<td class='td-date'>" + date);
        dailyTr.append("<td class='td-order'>" + orderText);
        dailyTr.append("<td class='td-count'>" + countText);
      }
      tbody.append("<tr class='user-monthly-sum'>");
      let trSum = $(".user-monthly-sum");
      trSum.append("<td class='td-sum'>" + "合计订餐");
      trSum.append("<td class='td-sum order-sum'>" + orderSum + " 次");
      trSum.append("<td class='td-sum count-sum'>" + countSum + " 份");
    });

    setPrintBtnEvent();
  }

  function setPrintBtnEvent() {
    $(".detail-print-btn").click(function() {
      initPrintFunction($(".content-container"));
    });
  }
});