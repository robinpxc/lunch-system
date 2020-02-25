$(document).ready(function(){
  let year = $.cookie("monthly-statistics-year");
  let month = $.cookie("monthly-statistics-month");
  let data = fetchMonthlySummary(year, month, false);

  let separateGroupSumPrice = [0, 0, 0, 0, 0, 0, 0];

  setDataToTable();
  addSummaryForGroups();


  function setDataToTable() {
    for(let i = 0; i < data.length; i++) {
      let fullName = data[i][0];
      let userId = data[i][1];
      let workgroup = data[i][2];
      let orderSum = data[i][3];
      let price = orderSum * 3;
      separateGroupSumPrice[getGropNumber(workgroup)] += price;
      let trClass = "tb-" + workgroup + "-" + "person" + i;
      $(".tb-" + workgroup).append("<tr class='" + trClass +"'>");
      $("." + trClass).append("<td>" + fullName);
      $("." + trClass).append("<td>" + userId);
      $("." + trClass).append("<td>" + orderSum);
      $("." + trClass).append("<td>" + price);
    }
  }

  function addSummaryForGroups() {
    for(let i = 0; i < 7; i++) {
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

});