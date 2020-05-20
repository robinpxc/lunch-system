function exportGroupTable(tablePrefix, date, unorderedArray, year, month, userName) {
  for (let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
    let tbId = tablePrefix + "-tb-" + i;
    $(".tb-export-" + i).click(function () {
      switch (tablePrefix) {
        case "ds": {
          let isComplete = isGroupOrderComplete(unorderedArray)[i] === 0;
          let weekday = new Date(date).getDay();
          let fileName = (isComplete ? "【完整】" : "【不完整】") + "[" + date + " "+ getWeekDayCN(weekday) +"]" + groupName(i);
          ExportToExcel(tbId, fileName);
          break;
        }
        case "ms": {
          let filename = "[" + year + "年" + month + "月" + "账单" + "]" + "-" + groupName(i);
          ExportToExcel(tbId, filename);
          break;
        }
        case "um": {
          let filename = groupName(i) + "用户名单";
          ExportToExcel(tbId, filename);
          break;
        }
        case "md": {
          let filename = userName + "-" + year + "年" + month + "月" + "订餐详单";
          ExportToExcel(tbId, filename);
          break;
        }
      }
    });
  }
}

function exportAllTables(tablePrefix, date, unorderedArray, year, month) {
  let weekday = new Date(date).getDay();
  switch (tablePrefix) {
    case "ds":
      for (let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
        let tbId = tablePrefix + "-tb-" + i;
        let isComplete = isGroupOrderComplete(unorderedArray)[i] === 0;
        let fileName = (isComplete ? "【完整】" : "【不完整】") + "[" + date + " "+ getWeekDayCN(weekday) +"]" + groupName(i);
        ExportToExcel(tbId, fileName);
      }
      ExportToExcel("ds-tb-unordered",  "[" + date + " "+ getWeekDayCN(weekday) +"]" + "未点餐名单");
      break;
    case "ms":
      for (let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
        let tbId = tablePrefix + "-tb-" + i;
        let filename = "[" + year + "年" + month + "月" + "账单" + "]" + "-" + groupName(i);
        ExportToExcel(tbId, filename);
      }
      break;
    case "um":
      for (let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
        let tbId = tablePrefix + "-tb-" + i;
        let filename = groupName(i) + "用户名单";
        ExportToExcel(tbId, filename);
      }
      break;

  }

}

function exportUnorderedTable(tablePrefix, date) {
  $(".tb-export-no-order").click(function() {
    let weekday = new Date(date).getDay();
    ExportToExcel("ds-tb-unordered",  "[" + date + " "+ getWeekDayCN(weekday) +"]" + "未点餐名单");
  });
}

function ExportToExcel(tbId, filename) {
  let excel = new ExcelGen({
    "format": "xlsx",
    "file_name": filename + ".xlsx",
    "src_id": tbId,
    "show_header": true,
    "type": "normal",
    "exclude_selector": ".no-export"
  });
  excel.generate();
}

function groupName(index) {
  switch (index) {
    case 0:
      return "市委巡察办";
    case 1:
      return "第一巡察组";
    case 2:
      return "第二巡察组";
    case 3:
      return "第三巡察组";
    case 4:
      return "第四巡察组";
    case 5:
      return "第五巡察组";
    case 6:
      return "物业";
  }
}

function isGroupOrderComplete(unorderedArray) {
  let unorderedUserCount = new Array(0, 0, 0, 0, 0, 0, 0);
  for(let i = 0; i < unorderedArray.length; i++) {
    let currentUserGroup = unorderedArray[i][2];
    unorderedUserCount[Number(currentUserGroup[currentUserGroup.length - 1])] ++;
  }
  return unorderedUserCount;
}
