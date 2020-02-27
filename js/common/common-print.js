function initPrintFunction(element) {
  element.print({
    addGlobalStyles : true,
    stylesheet : null,
    rejectWindow : true,
    noPrintSelector : ".no-print",
    iframe : true,
    append : null,
    prepend : null
  });
}

function setGroupTablePrint() {
  for(let i = 0; i < 7; i++) {
    $(".tb-print-" + i).click(function() {
      initPrintFunction($(".table-group-" + i));
    });
  }
}
