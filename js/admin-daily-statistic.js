$(document).ready(function(){
  // let dataArray = fetchDailyOrderStatus(getDateToday(), false);
  // let noOrderArray = fetchNoOrderUsers(getDateToday(), false);
  let dataArray = fetchDailyOrderStatus("2020-02-20", false);
  let noOrderArray = fetchNoOrderUsers("2020-02-20", false);
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
      $("." + personClass).append("<td>" + data[i][0]);
      $("." + personClass).append("<td>" + data[i][1]);
      $("." + personClass).append("<td>" + (data[i][2] == 8 ? "不点餐" : (data[i][2] + " 号")) );
    }
  }

  function setNoOrderTable(data) {
    $(".header-no-order").text("未点餐人员 （ " + data.length + " ） 人");
    for(let i = 0; i < data.length; i++) {
      let trClass = "no-order-user" + i;
      $(".tb-no-order").append("<tr class=" + trClass + ">");
      $("." + trClass).append("<td>" + data[i][1]);
      $("." + trClass).append("<td>" + data[i][0]);
      $("." + trClass).append("<td>" + data[i][2]);
    }
  }
});