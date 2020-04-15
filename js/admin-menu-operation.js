$(document).ready(function() {
  let currentUserRole = $.cookie(CONSTANTS.COOKIE.USER_ROLE_CURRENT);
  let currentUserGroup = $.cookie(CONSTANTS.COOKIE.USER_GROUP_CURRENT);
  let groupIndexCount = currentUserRole == CONSTANTS.USER.ROLE.ADMIN_GROUP ? 1 : CONSTANTS.WORKGROUP_COUNT;

  initUI();
  refreshTables();

  function initUI() {
    setDateTitle();
    initTableGroup(currentUserRole, currentUserGroup);
  }

  function setDateTitle() {
    $("#date-title").text(getDateTomorrowCN(true));
  }

  function refreshTables() {
    fetchGroupUserInfo(currentUserRole, currentUserGroup).done(function(response) {
      // Step 01: Filter the responded "userList", pick the ordered and unordered users into 2 different new arrays.
      let userLists = filterUsers(response);

      // Step 02: set unordered operational user table
      setUnorderedTable(userLists[0]);
      setOrderedTable(userLists[1]);
    });
  }

  function filterUsers(response) {
    let userList = new Array(2);
    userList[0] = new Array();
    userList[1] = new Array();

    for(let i = 0; i < response.length; i++) {
      let userId = response[i][1];
      checkOrderStatus(getDateTomorrow(), CONSTANTS.ORDER.CHECK_TYPE.ORDER_STATUS, userId).done(function(orderStatus) {
        if(orderStatus == CONSTANTS.ORDER.STATUS.ORDER_EXIST) {
          userList[0].push(response[i]);
        } else {
          userList[1].push(response[i]);
        }
      });
    }
    return userList;
  }

  function setUnorderedTable(unorderedUserList) {
    setTableData(unorderedUserList);
  }

  function setOrderedTable(orderedUserList) {
    setTableData(orderedUserList);
  }

  function setTableData(dataList) {
    for(let i = 0; i < groupIndexCount; i++) {

    }
  }
});