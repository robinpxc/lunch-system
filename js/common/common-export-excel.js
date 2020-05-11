function exportGroupTable(tablePrefix, date, isComplete) {
  for (let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
    $(".tb-export-" + i).click(function () {
      switch (tablePrefix) {
        case "ds":
          let weekday = new Date(date).getDay();
          let tbId = tablePrefix + "-tb-" + i;
          let fileName = (isComplete ? "【完整】" : "【不完整】") + "[" + date + " "+ getWeekDayCN(weekday) +"]" + groupName(i) + ".xlsx";
          alert(fileName);
          ExportToExcel(tbId, fileName);
          break;
      }
    });
  }
}

function exportAllTables(tbName, fileName) {
  $(".btn-print-all").click(function () {
    ExportToExcel($(".table"), tbName);
  });
}

function exportUnorderedTable(tbName) {
  $(".tb-export-no-order").click(function() {
    ExportToExcel($(".table-not-ordered"), tbName);
  });
}

function ExportToExcel(tbId, filename) {
  let excel = new ExcelGen({
    "file_name": filename,
    "src_id": tbId,
    "show_header": true,
    "type": "table"
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