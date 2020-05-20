function initTableGroup(userRole, userGroup, customFunc) {
  setTable(userRole, userGroup, customFunc);
}

function setTable(userRole, userGroup, customFunc) {
  let dataRange = CONSTANTS.STATISTICS.RANGE_GROUP;
  if(hasHighPermission(userRole)) {
    dataRange = $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE);
  }
  if(dataRange == CONSTANTS.STATISTICS.RANGE_ALL) {
    addDropdownListEvent(customFunc);
  } else {
    $(".form-nav").remove();
    keepCurrentGroupTable(userGroup);
  }
}

function keepCurrentGroupTable(userGroup) {
  let groupNum = userGroup[5];
  $(".table-card").each(function() {
    if(!$(this).hasClass("table-group-" + groupNum) && !$(this).hasClass("table-not-ordered")) {
      $(this).remove();
    }
  });
}

function addDropdownListEvent(customFunc) {
  $(".dropdown-item").each(function(){
    $(this).click(function() {
      setDropdownInactive();
      addNewClass($(this), "active");
      $(".dropdown-workgroup").text($(this).text());
      setListMenuClickEventUI($(this), customFunc);
    });
  });
}

function setDropdownInactive() {
  $(".nav-dropdown-item").each(function() {
    removeOldClass($(this), "active");
  });
}

function setListMenuClickEventUI(listItem, customFunc) {
  let groupId = listItem.attr("id");
  switch (groupId) {
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

  customFunc(groupId);
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