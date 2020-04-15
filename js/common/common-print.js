function initPrintFunction(element) {
  element.print({
    addGlobalStyles : true,
    stylesheet : "../css/common/print.css",
    rejectWindow : true,
    noPrintSelector : ".no-print",
    iframe : true,
    append : null,
    prepend : null
  });
}

function setGroupTablePrint() {
  for(let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
    $(".tb-print-" + i).click(function() {
      initPrintFunction($(".table-group-" + i));
    });
  }
}
