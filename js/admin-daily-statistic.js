$(document).ready(function () {
  let currentUserRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
  let currentUserGroup = $.cookie(CONSTANTS.COOKIE.USER.KEY_GROUP);
  let group = currentUserRole == CONSTANTS.USER.ROLE.ADMIN_SUPER ? CONSTANTS.WORKGROUP.GROUP_ALL : currentUserGroup;
  let date = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATE);
  let orderedArray = new Array();
  let unorderedArray = new Array();

  fetchDailyOrderStatus(date, group).done(function (dataList) {
    orderedArray = new Array();
    if (currentUserRole == CONSTANTS.USER.ROLE.ADMIN_SUPER) {
      orderedArray = dataList;
    } else {
      for (let i = 0; i < dataList.length; i++) {
        let userGroup = dataList[i][4];
        if (userGroup == currentUserGroup) {
          orderedArray.push(dataList[i]);
        }
      }
    }
    if(orderedArray.length == 0) {
      setDisable($(".btn-print-all"));
      setDisable($(".btn-export-all"));
    }
    fetchNoOrderUsers(date, group).done(function (dataList) {
      unorderedArray = dataList;
      collectOrderSum(orderedArray);
      configUI();
      initAlertBox(date);
      initTableGroup(currentUserRole, currentUserGroup, function(groupId){
        if(groupId == "group-all") {
          refreshUnorderedTable(CONSTANTS.WORKGROUP.GROUP_ALL);
        } else {
          refreshUnorderedTable(groupId[groupId.length - 1]);
        }
      });
      setData(orderedArray);
      setUnorderedTable(CONSTANTS.WORKGROUP.GROUP_ALL);
      setGroupTablePrint();
      setAllTablePrint();
      setNoOrderTablePrint();
      exportGroupTable("ds", date, unorderedArray.length == 0);
    });
  });

  function configUI() {
    for (let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
      let cardHeaderClassName = ".table-group-" + i + " .card-header .tb-title";
      let originalText = $(cardHeaderClassName).text();
      $(cardHeaderClassName).text(originalText + "（" + getGroupOrderSum(orderedArray, i) + "人订餐）");
    }
  }

  function initAlertBox(date) {
    if (date == getDateToday()) {
      $(".show-date-text").text("今天是 " + getDateTodayCN(true));
    } else if (date == getDateTomorrow()) {
      $(".show-date-text").text("明天是 " + getDateTomorrowCN(true));
    } else {
      $(".show-date-text").text("选择的日期是 " + date);
    }
    let orderSum = 0;
    for (let i = 1; i <= 8; i++) {
      $("#order-sum-" + i).text(orderCollection[i]);
      orderSum += orderCollection[i];
    }
    $("#order-sum").text(orderSum);
  }

  function setData(dataArray) {
    for (let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
      setDataToGroupTable(getGroupData(dataArray, i), i);
    }
  }

  function getGroupOrderSum(dataArray, groupNumber) {
    let groupOrder = 0;
    let group = "group" + groupNumber;
    for (let i = 0; i < dataArray.length; i++) {
      let orderNum = dataArray[i][2];
      if (dataArray[i][4] == group) {
        if (orderNum != CONSTANTS.ORDER.CONTENT.NO_ORDER) {
          groupOrder++;
        }
      }
    }
    return groupOrder;
  }

  function getGroupData(dataArray, groupNumber) {
    let group = "group" + groupNumber;
    let groupOrderData = new Array();
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i][4] == group) {
        groupOrderData.push(dataArray[i]);
      }
    }
    return groupOrderData;
  }

  function setDataToGroupTable(data, group) {
    if(data.length == 0) {
      disableOutputButtons(group);
    }
    for (let i = 0; i < data.length; i++) {
      let fullname = data[i][0];
      let nickName = data[i][1];
      let orderNum = data[i][2];
      let orderCount = data[i][3];
      let personClass = "group" + "-" + group + "-" + "person" + "-" + i;
      if (orderNum == CONSTANTS.ORDER.CONTENT.NO_ORDER) {
        $(".tb-group" + group).append("<tr class='" + personClass + " no-print" + "'>");
      } else {
        $(".tb-group" + group).append("<tr class=" + personClass + ">");
      }

      $("." + personClass).append("<td>" + fullname);
      $("." + personClass).append("<td>" + nickName);
      $("." + personClass).append("<td>" + (orderNum == CONSTANTS.ORDER.CONTENT.NO_ORDER ? CONSTANTS.ORDER.INFO_TEXT.NO_ORDER : (orderNum + " 号" + (orderCount > 1 ? "【" + orderCount + "份】": ""))));
    }
  }

  function setUnorderedTable(group) {
    if (group == CONSTANTS.WORKGROUP.GROUP_ALL) {
      $(".no-order-title").text("未订餐人员 （ " + unorderedArray.length + " ） 人");
      setUnorderedData(unorderedArray);
    } else {
      let groupUnorderedArray = filterUnorderedArrayByGroup(group, unorderedArray);
      let groupCN = "";
      switch (group) {
        case CONSTANTS.WORKGROUP.GROUP_0:
          groupCN = CONSTANTS.WORKGROUP.CN.GROUP_0;
          break;
        case CONSTANTS.WORKGROUP.GROUP_1:
          groupCN = CONSTANTS.WORKGROUP.CN.GROUP_1;
          break;
        case CONSTANTS.WORKGROUP.GROUP_2:
          groupCN = CONSTANTS.WORKGROUP.CN.GROUP_2;
          break;
        case CONSTANTS.WORKGROUP.GROUP_3:
          groupCN = CONSTANTS.WORKGROUP.CN.GROUP_3;
          break;
        case CONSTANTS.WORKGROUP.GROUP_4:
          groupCN = CONSTANTS.WORKGROUP.CN.GROUP_4;
          break;
        case CONSTANTS.WORKGROUP.GROUP_5:
          groupCN = CONSTANTS.WORKGROUP.CN.GROUP_5;
          break;
        case CONSTANTS.WORKGROUP.GROUP_6:
          groupCN = CONSTANTS.WORKGROUP.CN.GROUP_6;
          break;
      }
      $(".no-order-title").text(groupCN + "组未订餐人员 （ " + groupUnorderedArray.length + " ） 人");
      setUnorderedData(groupUnorderedArray);
    }
  }

  function filterUnorderedArrayByGroup(group, dataArray) {
    let groupData = new Array();
    for(let i = 0; i < dataArray.length; i++) {
      if(unorderedArray[i][2] ==  group) {
        groupData.push(unorderedArray[i]);
      }
    }
    return groupData;
  }

  function setUnorderedData(dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
      let trClass = "no-order-user" + i;
      $(".tb-no-order").append("<tr class=" + trClass + ">");
      let fullname = dataArray[i][1];
      let userId = dataArray[i][0];
      let workgroup = groupToText(dataArray[i][2]);
      $("." + trClass).append("<td>" + fullname);
      $("." + trClass).append("<td>" + userId);
      $("." + trClass).append("<td>" + workgroup);
    }
  }

  function refreshUnorderedTable(groupNum) {
    let group = "";
    if(groupNum == CONSTANTS.WORKGROUP.GROUP_ALL) {
      group = groupNum;
    } else {
      group = "group" + groupNum;
    }
    $(".tb-no-order").empty();
    setUnorderedTable(group);
  }

  function setNoOrderTablePrint() {
    $(".tb-print-no-order").click(function () {
      initPrintFunction($(".table-not-ordered"));
    });
  }

  function disableOutputButtons(index) {
    setDisable($(".tb-export-" + index));
    setDisable($(".tb-print-" + index));
  }
});