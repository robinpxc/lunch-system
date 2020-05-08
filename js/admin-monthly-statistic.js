$(document).ready(function(){
  let year = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_YEAR);
  let month = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_MONTH);
  let separateGroupOrderCount = [0, 0, 0, 0, 0, 0, 0];
  let separateGroupSumPrice = [0, 0, 0, 0, 0, 0, 0];
  let summaryDataArray = new Array();
  let currentUserRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
  let currentUserGroup = $.cookie(CONSTANTS.COOKIE.USER.KEY_GROUP);
  let oriPrice;
  let discountPrice;
  fetchMonthlySummary(year, month).done(function(response) {
    summaryDataArray = response;
    getOrderPrice().done(function(priceArray) {
      oriPrice = priceArray[0][1];
      discountPrice = priceArray[1][1];
      if(currentUserRole == CONSTANTS.USER.ROLE.ADMIN_SUPER) {
        initPriceModifyComponent(oriPrice, discountPrice);
        setModifyBtnClickEvent();
        setSummaryData(summaryDataArray);
      } else {
        $(".price-area").remove();
      }

      initTableGroup(currentUserRole, currentUserGroup);
      setDataToTable();
      addSummaryForGroups();
      setGroupTablePrint();
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
      $(".tb-" + workgroup).append("<tr class='" + trClass +"'>");
      $("." + trClass).append("<td>" + fullName);
      $("." + trClass).append("<td>" + userId);
      $("." + trClass).append("<td>" + orderSum);
      $("." + trClass).append("<td>" + totalPrice);
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

  function getOrderCountByOrderNum(dataArray) {
    alert(dataArray);
    for(let data in dataArray) {

    }
  }

  function setModifyBtnClickEvent() {
    $(".price-modify-btn").click(function() {
      let self = $(this);
      switch (self.attr("id")) {
        case "btn-price-ori":
          alert(1);
          break;
        case "btn-price-discount":
          alert(2);
          break;
      }
    });
  }

});