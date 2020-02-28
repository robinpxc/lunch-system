
function initTableGroup() {
  addDropdownListEvent();
}

function addDropdownListEvent() {
  $(".dropdown-item").each(function(){
    $(this).click(function() {
      setDropdownInactive();
      addNewClass($(this), "active");
      $(".dropdown-workgroup").text($(this).text());
      setListMenuClickEventUI($(this));
    });
  });
}

function setDropdownInactive() {
  $(".dropdown-item").each(function() {
    removeOldClass($(this), "active");
  });
}

function setListMenuClickEventUI(listItem) {
  switch (listItem.attr("id")) {
    case "group-0":
      filterTables(0);
      break;
    case "group-1":
      filterTables(1);
      break;
    case "group-2":
      filterTables(2);
      break;
    case "group-3":
      filterTables(3);
      break;
    case "group-4":
      filterTables(4);
      break;
    case "group-5":
      filterTables(5);
      break;
    case "group-6":
      filterTables(6);
      break;
    default:
      unhideAllGroup();
  }
}

function filterTables(currentItemNum) {
  let itemPrefix = ".table-group-";
  for(let i = 0; i < 7; i++) {
    hideElement($(itemPrefix + i));
  }
  unhideElement($(itemPrefix + currentItemNum));
}

function unhideAllGroup() {
  let itemPrefix = ".table-group-";
  for(let i = 0; i < 7; i++) {
    unhideElement($(itemPrefix + i));
  }
}