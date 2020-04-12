$(document).ready(function() {
  let currentUserRole = $.cookie(CONSTANTS.COOKIE.USER_ROLE_CURRENT);
  let currentUserGroup = $.cookie(CONSTANTS.COOKIE.USER_GROUP_CURRENT);

  initUI();

  function initUI() {
    setDateTitle();
  }

  function setDateTitle() {
    $("#date-title").text(getDateTodayCN(true));
  }

  function initGroupTables() {
    switch (currentUserRole) {
      case "admin-group":
        break;
      case "admin-super":
        break;
    }
  }

  function removeGroupTable(currentGroup) {

  }
});