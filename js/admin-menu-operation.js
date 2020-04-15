$(document).ready(function() {
  let currentUserRole = $.cookie(CONSTANTS.COOKIE.USER_ROLE_CURRENT);
  let currentUserGroup = $.cookie(CONSTANTS.COOKIE.USER_GROUP_CURRENT);

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
      setOperationalTable(userLists[0]);
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

  function setOperationalTable(unorderedUserList) {
    if(currentUserRole == CONSTANTS.USER.ROLE.ADMIN_GROUP) {
      
    }
  }
});