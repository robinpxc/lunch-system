$(document).ready(function () {
  let currentUserRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
  let currentUserGroup = $.cookie(CONSTANTS.COOKIE.USER.KEY_GROUP);
  let dataRange = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE);
  let groupType = dataRange == CONSTANTS.STATISTICS.RANGE_ALL ? CONSTANTS.WORKGROUP.GROUP_ALL : currentUserGroup;
  let date = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATE);
  let orderedArray = new Array();
  let unorderedArray = new Array();

  fetchDailyOrderStatus(date, groupType).done(function (dataList) {
    orderedArray = new Array();
    getAllConfirmationStatus(date).done(function(confirmationList) {
      if (dataRange == CONSTANTS.STATISTICS.RANGE_ALL) {
        for(let i = 0; i < confirmationList.length; i++) {
          let group = confirmationList[i][1];
          let groupNum = Number(group[group.length - 1]);
          let confirmStatus = confirmationList[i][2];
          if(confirmStatus == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED) {
            for(let i = 0; i < filterOrderedArrayByGroup(dataList)[groupNum].length; i++) {
              orderedArray.push(filterOrderedArrayByGroup(dataList)[groupNum][i]);
            }
          }
        }

        if(dataRange == CONSTANTS.STATISTICS.RANGE_ALL && currentUserRole == CONSTANTS.USER.ROLE.ADMIN_MENU) {
          $(".table-group").remove();
        }
        initConfirmTable($(".tb-container"));
        initSumTableAll();
        setAllDailySummary(dataList, confirmationList);
      } else {
        $(".order-collection-all").remove();
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

      fetchNoOrderUsers(date, groupType).done(function (dataList) {
        unorderedArray = dataList;

        getAllConfirmationStatus(date).done(function(statusArray) {
          collectOrderSum(orderedArray);
          configUI();
          initAlertBox(date);
          if(dataRange == CONSTANTS.STATISTICS.RANGE_ALL) {
            initConfirmBox(statusArray);
          }
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
          setSummaryTablePrint();
          setNoOrderTablePrint();

          exportEvents("ds", date, unorderedArray);
        });
      });
    });
  });

  function configUI() {
    initSumTable($(".tbody-order-sum"));
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
    for (let i = 1; i <= CONSTANTS.MENU.COUNT; i++) {
      $("#order-sum-" + i).text(orderCollection[i]);
      orderSum += Number(orderCollection[i]);
    }
    $("#order-sum").text(orderSum);
  }

  function setAllDailySummary(dataList, confirmationList) {
    let sumArray = new Array(CONSTANTS.WORKGROUP_COUNT);
    // init summary array
    for(let group = 0; group < CONSTANTS.WORKGROUP_COUNT; group++) {
      sumArray[group] = new Array(CONSTANTS.MENU.COUNT);
      for(let order = 1; order <= CONSTANTS.MENU.COUNT; order++) {
        sumArray[group][order] = 0;
      }
    }

    // set summary card
    for(let i = 0; i < dataList.length; i++) {
      let orderNum = Number(dataList[i][2]);
      let count = Number(dataList[i][3]);
      let group = dataList[i][4];
      // check if confirmed
      for(let i = 0; i < confirmationList.length; i++) {
        let groupConfirm = confirmationList[i][1];
        let confirmStatus = confirmationList[i][2];
        if(hasConfirmed(group, confirmationList)) {
          let groupNum = Number(group[group.length - 1]);
          if(orderNum <= CONSTANTS.MENU.COUNT) {
            sumArray[groupNum][orderNum] += count;
          }
        }
      }
    }

    for(let group = 0; group < CONSTANTS.WORKGROUP_COUNT; group++) {
      for(let order = 1; order <= CONSTANTS.MENU.COUNT; order++) {
        $(".td-group" + group + "-order" + order).text(sumArray[group][order]);
      }
    }
  }

  function initConfirmBox(statusArray) {
    let confirmList = new Array(CONSTANTS.WORKGROUP_COUNT);

    for(let i = 0; i < statusArray.length; i++) {
      let group = statusArray[i][1];
      let groupNum = group[group.length - 1];
      let confirmationStatus = statusArray[i][2];
      confirmList[groupNum] = confirmationStatus == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED ? true : false;
    }

    let unReportSum = 0;
    for(let i = 0; i < confirmList.length; i++) {
      let status = confirmList[i];
      if(!status) {
        unReportSum ++;
      }
      $("#confirm-group-" + i).text(status == true ? "已上报" : "未上报");
      $("#confirm-group-" + i).css({
        "color": status ? "#177828" : "#BD2130",
        "font-weight": status ? "normal" : "bold"
      });
    }
    $("#no-report-sum").text(unReportSum);
    $("#no-report-sum").css({
      "color": "#BD2130",
      "font-weight": "bold"
    });

    if(unReportSum == CONSTANTS.MENU.COUNT) {
      replaceClass($(".order-collection"), "alert-primary", "alert-danger");
      replaceClass($(".order-collection"), "alert-success", "alert-danger");
      replaceClass($(".order-collection"), "alert-warning", "alert-danger");
      $(".show-date-text").text($(".show-date-text").text() + "【未收到上报】");
    } else if(unReportSum == 0) {
      replaceClass($(".order-collection"), "alert-danger", "alert-success");
      replaceClass($(".order-collection"), "alert-warning", "alert-success");
      replaceClass($(".order-collection"), "alert-primary", "alert-success");
      $(".show-date-text").text($(".show-date-text").text() + "【已全部上报】");
    } else {
      replaceClass($(".order-collection"), "alert-success", "alert-warning");
      replaceClass($(".order-collection"), "alert-alert", "alert-warning");
      replaceClass($(".order-collection"), "alert-primary", "alert-warning");
      $(".show-date-text").text($(".show-date-text").text() + "【部分未上报】");
    }
  }

  function hasConfirmed(group, confirmationList) {
    for(let i = 0; i < confirmationList.length; i++) {
      let groupConfirm = confirmationList[i][1];
      let confirmStatus = confirmationList[i][2];
      return group == groupConfirm && confirmStatus == CONSTANTS.MENU.CONFIRMATION.STATUS.CONFIRMED;
    }
    return false;
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
    if(unorderedArray.length == 0) {
      $(".table-not-ordered").remove();
    } else {
      if (group == CONSTANTS.WORKGROUP.GROUP_ALL) {
        $(".no-order-title").text("未订餐 （ " + unorderedArray.length + " ） 人");
        setUnorderedData(unorderedArray);
      } else {
        let groupUnorderedArray = filterUnorderedArrayByGroup(group, unorderedArray);
        let groupCN = groupToTextSimplify(group);
        $(".no-order-title").text(groupCN + "组未订餐 （ " + groupUnorderedArray.length + " ） 人");
        setUnorderedData(groupUnorderedArray);
      }
    }
  }

  function filterOrderedArrayByGroup(dataList) {
    let sortedArray = new Array(CONSTANTS.WORKGROUP_COUNT);
    for(let i = 0; i < sortedArray.length; i++) {
      sortedArray[i] = new Array();
      for(let j = 0; j < dataList.length; j++) {
        let group = dataList[j][4];
        let groupNum = Number(group[group.length - 1]);
        if(i == groupNum) {
          sortedArray[i].push(dataList[j]);
        }
      }
    }
    return sortedArray;
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
      let workgroup = groupToTextSimplify(dataArray[i][2]);
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

  function setSummaryTablePrint() {
    $("#btn-print-daily-sum").click(function() {
      initPrintFunction($(".order-collection"));
    })

    $("#btn-print-daily-separate").click(function() {
      initPrintFunction($(".order-collection-all"));
    })
  }

  function disableOutputButtons(index) {
    setDisable($(".tb-export-" + index));
    setDisable($(".tb-print-" + index));
  }

  function exportEvents(tablePrefix, date, unorderedArray) {
    exportGroupTable(tablePrefix, date, unorderedArray, null, null, null);
    exportUnorderedTable(tablePrefix, date, unorderedArray, null, null);
    $(".btn-export-all").click(function() {
      exportAllTables(tablePrefix, date, unorderedArray, null, null);
    });
  }
});