$(document).ready(function(){
  let dataArray = fetchDailyOrderStatus($.cookie("daily-statistics-date"), false);
  $.cookie("daily-statistics-date", "");
  let noOrderArray = fetchNoOrderUsers(getDateToday(), false);
  configUI();
  initTableGroup();
  setData(dataArray);
  setNoOrderTable(noOrderArray);

  function configUI() {
    for(let i = 0; i < 7; i++) {
      let cardHeaderClassName = ".table-group-" + i + " .card-header";
      let originalText = $(cardHeaderClassName).text();
      $(cardHeaderClassName).text(originalText + "（ " +  getGroupOrderNumber(dataArray, i) + " 人 ）");
    }
  }

  function setData(dataArray) {
    for(let i = 0; i < 7; i++) {
      setDataToGroupTable(getGroupData(dataArray, i), i);
    }
  }

  function getGroupOrderNumber(dataArray, groupNumber) {
    let groupOrder = 0;
    let group = "group" + groupNumber;
    for(let i = 0; i < dataArray.length; i++) {
      if(dataArray[i][3] == group) {
        groupOrder ++;
      }
    }
    return groupOrder;
  }

  function getGroupData(dataArray, groupNumber) {
    let group = "group" + groupNumber;
    let groupOrderData = new Array();
    for(let i = 0; i < dataArray.length; i++) {
      if(dataArray[i][3] == group) {
        groupOrderData.push(dataArray[i]);
      }
    }
    return groupOrderData;
  }

  function setDataToGroupTable(data, group) {
    for(let i = 0; i < data.length; i++) {
      let personClass = "group" + "-" + group + "-" + "person" + "-" + i; ;
      $(".tb-group" + group).append("<tr class=" + personClass + ">");
      let fullname = data[i][0];
      let userId = data[i][1];
      let orderNum = data[i][2];
      $("." + personClass).append("<td>" + fullname);
      $("." + personClass).append("<td>" + userId);
      $("." + personClass).append("<td>" + (orderNum == 8 ? "不点餐" : (orderNum + " 号")) );
    }
  }

  function setNoOrderTable(data) {
    $(".header-no-order").text("未点餐人员 （ " + data.length + " ） 人");
    for(let i = 0; i < data.length; i++) {
      let trClass = "no-order-user" + i;
      $(".tb-no-order").append("<tr class=" + trClass + ">");
      let fullname = data[i][1];
      let userId = data[i][0];
      let workgroup = groupToText(data[i][2]);
      $("." + trClass).append("<td>" + fullname);
      $("." + trClass).append("<td>" + userId);
      $("." + trClass).append("<td>" + workgroup);
    }
  }
});