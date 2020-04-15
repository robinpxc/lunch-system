
function initTableGroup(userRole, userGroup) {
  setTable(userRole, userGroup);
}

function setTable(userRole, userGroup) {
  if(userRole == CONSTANTS.USER.ROLE.ADMIN_SUPER) {
    addDropdownListEvent();
  } else {
    $(".nav-drop-down").remove();
    keepCurrentGroupTable(userGroup);
  }
}

function keepCurrentGroupTable(userGroup) {
  let groupNum = userGroup[5];
  $(".table-card").each(function() {
    if(!$(this).hasClass("table-group-" + groupNum)) {
      $(this).remove();
    }
  });
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
  for(let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
    hideElement($(itemPrefix + i));
  }
  unhideElement($(itemPrefix + currentItemNum));
}

function unhideAllGroup() {
  let itemPrefix = ".table-group-";
  for(let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
    unhideElement($(itemPrefix + i));
  }
}