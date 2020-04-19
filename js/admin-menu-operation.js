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
      /* Step 01:
      *  Filter the responded "userList", pick the users into 7 different arrays as 7 different groups.
      *  Set user number to table title
      * */
      let groupUserList = filterUserByGroup(response);
      setTableTitle(groupUserList);

      // Step 02: set unordered operational user table
      setTableData(groupUserList);
    });
  }

  function filterUserByGroup(response) {
    let groupUserList = new Array(CONSTANTS.WORKGROUP_COUNT);
    for(let i = 0; i < groupUserList.length; i++) {
      groupUserList[i] = new Array();
    }

    for(let i = 0; i < response.length; i++) {
      let workgroupIndex = 4;
      let lastCharIndex = 5;
      let groupNum = response[i][workgroupIndex][lastCharIndex];
      groupUserList[groupNum].push(response[i]);
    }
    return groupUserList;
  }

  function filterUsersByOrder(response) {
    let userList = new Array(2);
    userList[0] = new Array();
    userList[1] = new Array();

    for(let i = 0; i < response.length; i++) {
      let userId = response[i][1];
      checkOrderStatus(getDateTomorrow(), CONSTANTS.ORDER.CHECK_TYPE.ORDER_STATUS, userId, false).done(function(orderStatus) {
        if(orderStatus != CONSTANTS.ORDER.STATUS.ORDER_EXIST) {
          userList[0].push(response[i]);
        } else {
          userList[1].push(response[i]);
        }
      });
    }
    return userList;
  }

  function setTableTitle(groupUserList) {
    for(let i = 0; i < groupUserList.length; i++) {
      let originalTitle = $(".table-group-" + i + " .tb-title").text();
      $(".table-group-" + i + " .tb-title").text(originalTitle + "（共 " + groupUserList[i].length + " 人）");
    }
  }

  function setTableData(groupUserList) {
    for(let i = 0; i < groupIndexCount; i++) {
      let userLists = filterUsersByOrder(groupUserList[i]);
      let unOrderedUsers = userLists[0];
      let orderedUsers = userLists[1];

      // Set table data for each group
      let currentGroup = "group" + i;
      setData(unOrderedUsers, currentGroup, CONSTANTS.ORDER.STATUS_USER.NOT_ORDER);
      setData(orderedUsers, currentGroup, CONSTANTS.ORDER.STATUS_USER.ORDERED)
    }
  }

  function setData(userList, currentGroup, orderStatus) {
    if(userList.length > 0) {
      for(let i = 0; i < userList.length; i++) {
        let userName = userList[i][0];
        let userId = userList[i][1];
        let userNickName = userList[i][3];

        // Define user class as "groupX-user-XXXX"
        let groupContainerClass = ".tb-" + currentGroup;

        // Add a <tr> in .tb-groupX
        let userClassName = currentGroup + "-" + "user-" + userId;
        $(groupContainerClass).append("<tr class='" + userClassName + "'>");

        // Add <td> in groupX-user-XXXX
        $("." + userClassName).append("<td class='" + "fullname-" + userId + "'>" + userName);
        $("." + userClassName).append("<td class='" + "nickname-" + userId + "'>" + userNickName);

        // Set order status and operation in different case
        if(orderStatus == CONSTANTS.ORDER.STATUS_USER.NOT_ORDER) {
          // Set order status
          $("." + userClassName).append("<td class='" + "order-status-" + userId + "'>" + CONSTANTS.ORDER.INFO_TEXT_STATUS.NOT_ORDER);
          $(".order-status-" + userId).css({
            "color": "red",
            "font-weight": "bold"
          });

          // Set operation
          $("." + userClassName).append("<td class='" + "operation-" + userId + "'>");
          addOrderDropDown($(".operation-" + userId), userId);
        } else {
          // Set order status
          $("." + userClassName).append("<td class='" + "order-status-" + userId + "'>" + CONSTANTS.ORDER.INFO_TEXT_STATUS.ORDERED);
          $(".order-status-" + userId).css({
            "color": "green",
            "font-weight": "bold"
          });

          // Set operation
          $("." + userClassName).append("<td class='" + "operation-" + userId + "'>");
        }
      }
    }
  }

  function addOrderDropDown(container, userId) {
    let orderDropdownClassName = "dropdown-order-" + userId;
    let dropdownListClassName = "dropdown-menu-" + userId;
    container.append("<div class='btn-group dropdown-order " + orderDropdownClassName + "'>");
    $(".dropdown-order").css({
      "min-width": "80px",
      "width": "50%"
    });
    $("." + orderDropdownClassName).append("<button type='button' class='btn btn-primary btn-sm dropdown-toggle dropdown-order-btn' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>选择餐号");
    $("." + orderDropdownClassName).append("<div class='dropdown-menu " + dropdownListClassName + "'>");
    for(let i = 1; i <= CONSTANTS.ORDER_COUNT; i++) {
      let orderNumText = i == 6 ? "不订餐" : i + "号";
      if(i == 5) {
        $("." + dropdownListClassName).append("<div class='dropdown-divider'>");
      }
      $("." + dropdownListClassName).append("<a class='dropdown-item' href='#' id='order-" + i +"'>" + orderNumText);
    }

    let dropdownItemClassName = $(".dropdown-menu-" + userId + " .dropdown-item");
    addOrderDropdownListEvent(dropdownItemClassName, userId);
  }

  // Order dropdown related functions
  function addOrderDropdownListEvent(dropdownItem, userId) {
    let orderDropdownBtn = $(".dropdown-order-" + userId + " .dropdown-order-btn");
    $(dropdownItem).each(function(){
      $(this).click(function() {
        setOrderDropdownInactive($(".dropdown-item"));
        addNewClass($(this), "active");
        orderDropdownBtn.text($(this).text());
        setOrderListMenuClickEventUI($(this));
      });
    });
  }

  function setOrderListMenuClickEventUI(listItem) {
    switch (listItem.attr("id")) {
      case "order-1":
        break;
      case "order-2":
        break;
      case "order-3":
        break;
      case "order-4":
        break;
      case "order-5":
        break;
      default:
    }
  }

  function setOrderDropdownInactive(element) {
    $(element).each(function() {
      removeOldClass($(this), "active");
    });
  }
});