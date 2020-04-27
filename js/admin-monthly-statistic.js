$(document).ready(function(){
  let year = $.cookie("monthly-statistics-year");
  let month = $.cookie("monthly-statistics-month");
  let originalPrice = $("#price-input").val();
  let separateGroupSumPrice = [0, 0, 0, 0, 0, 0, 0];
  let data = new Array();
  fetchMonthlySummary(year, month).done(function(response) {
    data = response;
    setModifyBtnClickEvent();
    setSummaryData(data);
    setDataToTable();
    addSummaryForGroups();
    setGroupTablePrint();
  });

  function setSummaryData(dataArray) {
    let orderCount = dataArray.length;
    $(".order-num-text").text(orderCount);
    $(".order-price").text(originalPrice * orderCount);
  }

  function setDataToTable() {
    for(let i = 0; i < data.length; i++) {
      let fullName = data[i][0];
      let userId = data[i][1];
      let workgroup = data[i][2];
      let orderSum = data[i][3];
      let totalPrice = orderSum * 3;
      separateGroupSumPrice[getGropNumber(workgroup)] = totalPrice;
      let trClass = "tb-" + workgroup + "-" + "person" + i;
      $(".tb-" + workgroup).append("<tr class='" + trClass +"'>");
      $("." + trClass).append("<td>" + fullName);
      $("." + trClass).append("<td>" + userId);
      $("." + trClass).append("<td>" + orderSum);
      $("." + trClass).append("<td>" + totalPrice);
    }
  }

  function addSummaryForGroups() {
    for(let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
      let trClass = "tb-group" + i + "sum";
      $(".tb-group" + i).append("<tr class='sum " + trClass + "'>");
      $("." + trClass).append("<td>" + "合计");
      $("." + trClass).append("<td>" + "--");
      $("." + trClass).append("<td>" + "--");
      $("." + trClass).append("<td>" + separateGroupSumPrice[i]);
    }
  }

  function getGropNumber(groupNum) {
    return groupNum[5];
  }

  function setModifyBtnClickEvent() {
    $("#price-modify-btn").click(function() {

    });
  }

  function modifyPrice() {

  }
});