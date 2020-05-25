let orderCollection = new Array(CONSTANTS.MENU.COUNT + 1); // index 0-X是办到物业，最后一个是没点的人数

function initSumTable(tbody) {
  for(let i = 1; i <= CONSTANTS.MENU.COUNT; i++) {
    tbody.append("<tr class='order-tr-" + i + "'>");
    let tr = $(".order-tr-" + i);
    tr.append("<td class='left'>" + i + " 号");
    tr.append("<td class='right' id='order-sum-" + i + "'>" + 0);
  }
  // Add sum tr
  tbody.append("<tr class='sum-tr'>");
  $(".sum-tr").append("<td class='left bottom'>" + "总计");
  $(".sum-tr").append("<td class='right bottom' id='order-sum'>" + 0);
}

function initSumTableAll() {
  for(let i = 1; i <= CONSTANTS.MENU.COUNT; i++) {
    $(".sum-th").append("<td>" + i + " 号");
  }

  for(let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
    $(".tbody-order-sum-all").append("<tr class='tr-group-" + i +"'>");
    for(let j = 0; j <= CONSTANTS.MENU.COUNT; j++) {
      if(j == 0) {
        $(".tr-group-" + i).append("<td class='td-group-" + i + " left'>" + groupToTextSimplify("group" + i));
        if(i == CONSTANTS.WORKGROUP_COUNT - 1) {
          addNewClass($(".td-group-" + i), "summary-bottom");
          $(".td-group-" + i).css("border-bottom-left-radius", "3px");
        }
      } else {
        if(i == CONSTANTS.WORKGROUP_COUNT - 1) {
          $(".tr-group-" + i).append("<td class='td-group" + i + "-order" + j + " summary-bottom'>");
          if(j == CONSTANTS.MENU.COUNT) {
            $(".td-group" + i + "-order" + j).css("border-bottom-right-radius", "3px");
          }
        } else {
          $(".tr-group-" + i).append("<td class='td-group" + i + "-order" + j + "'>");
        }
      }

      if(i % 2 == 0) {
        addNewClass($(".tr-group-" + i), "highlight");
      }

    }
  }

}

function initConfirmTable(outerContainer) {
  outerContainer.append("<div class='tb-sub-container confirm-container'>");
  $(".confirm-container").append("<table class='confirm-table'>");
  let table = $(".confirm-table");
  table.append("<thead class='confirm-th'>");
  $(".confirm-th").append("<tr class='confirm-tr'>");
  $(".confirm-tr").append("<td class='left'>" + "部门");
  $(".confirm-tr").append("<td class='right'>" + "上报情况");
  table.append("<tbody class='confirm-tbody'>");
  let tbody = $(".confirm-tbody");
  for(let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
    tbody.append("<tr class='confirm-tr-" + i + "'>");
    let tr = $(".confirm-tr-" + i);
    tr.append("<td class='left'>" + groupToTextSimplify("group" + i));
    tr.append("<td class='right' id='confirm-group-" + i + "'>");
  }
  tbody.append("<tr class='no-report-tr'>");
  $(".no-report-tr").append("<td class='left bottom'>" + "未上报组数");
  $(".no-report-tr").append("<td class='right bottom' id='no-report-sum'>" + 0);
}

function collectOrderSum(data) {
  // init orderCollection
  for(let i = 0; i < orderCollection.length; i++) {
    orderCollection[i] = 0;
  }

  for(let i = 0; i < data.length; i++) {
    let orderNum = data[i][2];
    let orderCount = data[i][3];
    if(orderNum > 0 && orderNum <= CONSTANTS.MENU.COUNT) {
      orderCollection[orderNum] = Number(orderCollection[orderNum]) + Number(orderCount);
    }
  }
}