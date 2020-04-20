$(document).ready(function() {
  let dataArray = fetchDailyOrderStatus($.cookie("daily-statistics-date"), false);
  let noOrderArray = fetchNoOrderUsers($.cookie("daily-statistics-date"), false);
  let orderCollection = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  collectOrderSum(dataArray);
  configUI();
  initAlertBox($.cookie("daily-statistics-date"));
  initTableGroup();
  setData(dataArray);
  setNoOrderTable(noOrderArray);
  setGroupTablePrint();
  setNoOrderTablePrint();

  function configUI() {
    for(let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
      let cardHeaderClassName = ".table-group-" + i + " .card-header .tb-title";
      let originalText = $(cardHeaderClassName).text();
      $(cardHeaderClassName).text(originalText + "（共" +  getGroupOrderSum(dataArray, i) + "人有效点餐）");
    }
  }

  function initAlertBox(date) {
    if(date == getDateToday()) {
      $(".show-date-text").text("今天是 " + getDateTodayCN(true));
    } else if(date == getDateTomorrow()) {
      $(".show-date-text").text("明天是 " + getDateTomorrowCN(true));
    } else {
      $(".show-date-text").text("选择的日期是 " + date);
    }
    let orderSum = 0;
    for(let i = 1; i <= 8; i++) {
      $("#order-sum-" + i).text(orderCollection[i]);
      orderSum += orderCollection[i];
    }
    $("#order-sum").text(orderSum);
  }

  function setData(dataArray) {
    for(let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
      setDataToGroupTable(getGroupData(dataArray, i), i);
    }
  }

  function getGroupOrderSum(dataArray, groupNumber) {
    let groupOrder = 0;
    let group = "group" + groupNumber;
    for(let i = 0; i < dataArray.length; i++) {
      let orderNum = dataArray[i][2];
      if(dataArray[i][3] == group) {
        if(orderNum != CONSTANTS.ORDER.CONTENT.NO_ORDER) {
          groupOrder ++;
        }
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
      let fullname = data[i][0];
      let userId = data[i][1];
      let orderNum = data[i][2];
      let personClass = "group" + "-" + group + "-" + "person" + "-" + i;
      if(orderNum == CONSTANTS.ORDER.CONTENT.NO_ORDER) {
        $(".tb-group" + group).append("<tr class='" + personClass + " no-print" + "'>");
      } else {
        $(".tb-group" + group).append("<tr class=" + personClass + ">");
      }
      
      $("." + personClass).append("<td>" + fullname);
      $("." + personClass).append("<td>" + userId);
      $("." + personClass).append("<td>" + (orderNum == CONSTANTS.ORDER.CONTENT.NO_ORDER ? CONSTANTS.ORDER.INFO_TEXT.NO_ORDER : (orderNum + " 号")) );
    }
  }

  function setNoOrderTable(data) {
    $(".no-order-title").text("未点餐人员 （ " + data.length + " ） 人");
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

  function collectOrderSum(data) {
    for(let i = 0; i < data.length; i++) {
      let orderNum = data[i][2];
      orderCollection[orderNum]++;
    }
  }

  function setNoOrderTablePrint() {
    $(".tb-print-no-order").click(function() {
      initPrintFunction($(".table-not-ordered"));
    });
  }
});