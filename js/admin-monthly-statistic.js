$(document).ready(function(){
  let year = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_YEAR);
  let month = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_MONTH);
  let separateGroupOrderCount = [0, 0, 0, 0, 0, 0, 0];
  let separateGroupSumPrice = [0, 0, 0, 0, 0, 0, 0];
  let summaryDataArray = new Array();
  let currentUserRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
  let currentUserGroup = $.cookie(CONSTANTS.COOKIE.USER.KEY_GROUP);
  let dataRange = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE);
  let oriPrice;
  let discountPrice;
  fetchMonthlySummary(year, month).done(function(response) {
    summaryDataArray = response;
    getOrderPrice().done(function(priceArray) {
      oriPrice = priceArray[0][1];
      discountPrice = priceArray[1][1];
      if(hasHighPermission(currentUserRole)) {
        initPriceModifyComponent(oriPrice, discountPrice);
        setModifyBtnClickEvent();
        setSummaryData(summaryDataArray);
      } else {
        $(".price-area").remove();
      }

      if(dataRange == CONSTANTS.STATISTICS.RANGE_ALL && currentUserRole == CONSTANTS.USER.ROLE.ADMIN_MENU) {
        $(".table-group").remove();
      }

      initSumTable($(".tbody-order-sum"));
      initTableGroup(currentUserRole, currentUserGroup, function() {});
      setDataToTable();
      addSummaryForGroups();
      setGroupTablePrint();
      setAllTablePrint();
      exportEvents("ms", year, month);
    });
  });


  function setSummaryData(dataArray) {
    let orderCount = getSummaryOrderCount(dataArray);
    $(".show-year").text(year);
    $(".show-month").text(month);
    $(".order-num-text").text(orderCount);
    $(".order-price").text(oriPrice * orderCount);

    fetchMonthCountByOrderNum(year, month).done(function(responseArray) {
      let orderSum = 0;
      for(let i = 1; i <= 5; i++) {
        orderSum += Number(responseArray[i]);
        $("#order-sum-" + i).text(responseArray[i]);
      }
      $("#order-sum").text(orderSum);
    });
  }

  function getSummaryOrderCount(dataArray) {
    let sum = 0;
    for(let userData of dataArray) {
      sum += Number(userData[3]);
    }
    return sum;
  }

  function setDataToTable() {
    for(let i = 0; i < summaryDataArray.length; i++) {
      let fullName = summaryDataArray[i][0];
      let userId = summaryDataArray[i][1];
      let workgroup = summaryDataArray[i][2];
      let orderSum = summaryDataArray[i][3];
      let totalPrice = orderSum * discountPrice;
      separateGroupOrderCount[getGropNumber(workgroup)] = Number(separateGroupOrderCount[getGropNumber(workgroup)]) + Number(orderSum);
      separateGroupSumPrice[getGropNumber(workgroup)] = Number(separateGroupSumPrice[getGropNumber(workgroup)]) + Number(totalPrice);
      let trClass = "tb-" + workgroup + "-" + "person-" + i;
      $(".tb-" + workgroup).append("<tr class='" + trClass + " tr-user' id='tr-" + userId +"'>");
      $("." + trClass).append("<td>" + fullName);
      $("." + trClass).append("<td>" + userId);
      $("." + trClass).append("<td>" + orderSum);
      $("." + trClass).append("<td>" + totalPrice);
      $("#tr-" + userId).click(function() {
        $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DETAIL_ID, userId);
        $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DETAIL_NAME, fullName);
        window.location.href = "../php/user-monthly-detail.php";
      });
    }
  }

  function addSummaryForGroups() {
    for(let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
      let trClass = "tb-group" + i + "-sum";
      $(".tb-group" + i).append("<tr class='sum " + trClass + "'>");
      $("." + trClass).append("<td>" + "合计");
      $("." + trClass).append("<td>" + "--");
      $("." + trClass).append("<td>" + separateGroupOrderCount[i]);
      $("." + trClass).append("<td>" + separateGroupSumPrice[i]);
    }
  }

  function getGropNumber(groupNum) {
    return groupNum[5];
  }

  function setModifyBtnClickEvent() {
    $(".price-modify-btn").click(function() {
      let self = $(this);
      switch (self.attr("id")) {
        case "btn-price-ori":
          break;
        case "btn-price-discount":
          break;
      }
    });
  }

  function exportEvents(tablePrefix, year, month) {
    exportGroupTable(tablePrefix, null, null, year, month, null);
    $(".btn-export-all").click(function() {
      exportAllTables(tablePrefix, null, null, year, month);
    });
  }

});