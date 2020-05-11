$(document).ready(function () {
  let currentUserRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
  let currentUserGroup = $.cookie(CONSTANTS.COOKIE.USER.KEY_GROUP);
  let group = currentUserRole == CONSTANTS.USER.ROLE.ADMIN_SUPER ? CONSTANTS.WORKGROUP.GROUP_ALL : currentUserGroup;
  let date = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATE);
  let unorderedArray = new Array();

  fetchDailyOrderStatus(date, group).done(function (dataList) {
    let dataArray = new Array();
    if (currentUserRole == CONSTANTS.USER.ROLE.ADMIN_SUPER) {
      dataArray = dataList;
    } else {
      for (let i = 0; i < dataList.length; i++) {
        let userGroup = dataList[i][4];
        if (userGroup == currentUserGroup) {
          dataArray.push(dataList[i]);
        }
      }
    }
    fetchNoOrderUsers(date, group).done(function (dataList) {
      unorderedArray = dataList;
      collectOrderSum(dataArray);
      configUI();
      initAlertBox(date);
      initTableGroup(currentUserRole, currentUserGroup);
      setData(dataArray);
      setNoOrderTable(CONSTANTS.WORKGROUP.GROUP_ALL);
      setGroupTablePrint();
      setAllTablePrint();
      setNoOrderTablePrint();

      function configUI() {
        for (let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
          let cardHeaderClassName = ".table-group-" + i + " .card-header .tb-title";
          let originalText = $(cardHeaderClassName).text();
          $(cardHeaderClassName).text(originalText + "（" + getGroupOrderSum(dataArray, i) + "人订餐）");
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
          $("." + personClass).append("<td>" + (orderNum == CONSTANTS.ORDER.CONTENT.NO_ORDER ? CONSTANTS.ORDER.INFO_TEXT.NO_ORDER : (orderNum + " 号【" + orderCount + "份】")));
        }
      }

      function setNoOrderTable(group) {
        if (group == CONSTANTS.WORKGROUP.GROUP_ALL) {
          $(".no-order-title").text("未订餐人员 （ " + unorderedArray.length + " ） 人");
          for (let i = 0; i < unorderedArray.length; i++) {
            let trClass = "no-order-user" + i;
            $(".tb-no-order").append("<tr class=" + trClass + ">");
            let fullname = unorderedArray[i][1];
            let userId = unorderedArray[i][0];
            let workgroup = groupToText(unorderedArray[i][2]);
            $("." + trClass).append("<td>" + fullname);
            $("." + trClass).append("<td>" + userId);
            $("." + trClass).append("<td>" + workgroup);
          }
        } else {
          alert(group);
        }
      }

      function setNoOrderTablePrint() {
        $(".tb-print-no-order").click(function () {
          initPrintFunction($(".table-not-ordered"));
        });
      }
    });
  });
});