$(document).ready(function() {
  let currentUserRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
  let currentUserGroup = $.cookie(CONSTANTS.COOKIE.USER.KEY_GROUP);
  let currentGroupNum = currentUserGroup[5];
  let groupIndexCount = currentUserRole == CONSTANTS.USER.ROLE.ADMIN_GROUP ? 1 : CONSTANTS.WORKGROUP_COUNT;
  let dateType = $.cookie(CONSTANTS.COOKIE.KEY_DATE);
  let targetDate = dateType == CONSTANTS.DATE.TODAY ? getDateToday() : getDateTomorrow();

  initUI();
  loadTables();
  setGroupTablePrint();
  setAllTablePrint();

  function initUI() {
    addAdminHighlight($(".admin-item-menu"));
    setDateTitle();
    initTableGroup(currentUserRole, currentUserGroup);
  }

  function setDateTitle() {
    $(".date-text").text(dateType == CONSTANTS.DATE.TODAY ? "今天" : "明天");
    $("#date-title").text(dateType == CONSTANTS.DATE.TODAY ? getDateTodayCN(true) : getDateTomorrowCN(true));
  }

  function loadTables() {
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
      checkOrderStatus(targetDate, CONSTANTS.ORDER.CHECK_TYPE.ORDER_STATUS, userId, false).done(function(orderStatus) {
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
      $(".table-group-" + i + " .tb-title").text(originalTitle + "(" + groupUserList[i].length + "人)");
    }
  }

  function setTableData(groupUserList) {
    let unOrderSum = 0;
    for(let i = 0; i < groupIndexCount; i++) {
      let userLists = filterUsersByOrder(groupUserList[groupIndexCount == 7 ? i : currentGroupNum]);
      let unOrderedUsers = userLists[0];
      let orderedUsers = userLists[1];
      unOrderSum += Number(unOrderedUsers.length);

      // Set table data for each group
      let currentGroup = "group" + (groupIndexCount == 7 ? i : currentGroupNum);
      setData(unOrderedUsers, currentGroup, CONSTANTS.ORDER.STATUS_USER.NOT_ORDER, CONSTANTS.ORDER.STATUS_USER.ORDERED);
      setData(orderedUsers, currentGroup, CONSTANTS.ORDER.STATUS_USER.ORDERED, CONSTANTS.ORDER.STATUS_USER.NOT_ORDER);
      setTableStatus(unOrderSum, currentGroup);
    }
    setGroupStatusBar(unOrderSum);
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
        $("." + userClassName).append("<td class='" + "td-fullname fullname-" + userId + "'>" + userName);
        $("." + userClassName).append("<td class='" + "td-nickname nickname-" + userId + "'>" + userNickName);

        // Set order status and operation in different case
        if(orderStatus == CONSTANTS.ORDER.STATUS_USER.NOT_ORDER) {
          // Set order status
          $("." + userClassName).append("<td class='td-status order-status-" + userId + "'>" + CONSTANTS.ORDER.INFO_TEXT_STATUS.NOT_ORDER);
          $(".order-status-" + userId).css({
            "color": "red",
            "font-weight": "bold"
          });

          // Set operation
          $("." + userClassName).append("<td class='td-operation operation-" + userId + " no-print'>");
          addOrderDropDown($(".operation-" + userId), userId, orderStatus, null);
          addCountOperation($(".operation-" + userId), userId, orderStatus);
        } else {
          // Set order status
          checkOrderStatus(targetDate, CONSTANTS.ORDER.CHECK_TYPE.ORDER_CONTENT, userId, true).done(function(response) {
            let orderNum = response.menu_number;
            orderCountOperation(userId, targetDate, null).done(function(orderCount) {
              // Determine the order status text will be "不点餐" or "X号" or "X号【Y份】"
              let orderStatusText = orderNum == CONSTANTS.ORDER.CONTENT.NO_ORDER ? CONSTANTS.ORDER.INFO_TEXT.NO_ORDER : orderNum + " 号";
              orderStatusText += orderCount > 1 ? ("【" + orderCount + "份】") : "";

              // Set order status text and UI styles to <td>
              $("." + userClassName).append("<td class='" + "td-status order-status-" + userId + "'>" + orderStatusText);
              $(".order-status-" + userId).css("font-weight", "bold");
              if(orderNum == CONSTANTS.ORDER.CONTENT.NO_ORDER) {
                $(".order-status-" + userId).css("color", "blue");
              } else {
                $(".order-status-" + userId).css("color", "green");
              }

              // Set operation <td> (last)
              $("." + userClassName).append("<td class='" + "td-operation operation-group operation-" + userId + " no-print'>");
              addOrderDropDown($(".operation-" + userId), userId, orderStatus, orderNum);
              addCountOperation($(".operation-" + userId), userId, orderStatus);
            });
          });
        }
      }
    }
  }

  function addOrderDropDown(container, userId, orderStatus, orderNum) {
    let orderDropdownClassName = "dropdown-order-" + userId; // Order dropdown container <div> class name, will bind with user id.
    let dropdownListClassName = "dropdown-menu-" + userId;   // Order dropdown list class name.
    // Set Outer dropdown container to <td>
    container.append("<div class='btn-group btn-operation dropdown-order " + orderDropdownClassName + "'>");
    // Set dropdown toggle button to dropdown container
    $("." + orderDropdownClassName).append("<button type='button' class='btn btn-sm dropdown-toggle dropdown-order-btn' id='order-toggle-" + userId + "' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>选餐");
    let orderToggleBtn = $("#order-toggle-" + userId);
    addNewClass(orderToggleBtn, orderStatus == CONSTANTS.ORDER.STATUS_USER.NOT_ORDER ? "btn-outline-secondary" : "btn-outline-success");
    // Set dropdown option list to dropdown container
    $("." + orderDropdownClassName).append("<div class='dropdown-menu " + dropdownListClassName + "'>");
    // Set dropdown list content.
    for(let i = 1; i <= CONSTANTS.ORDER_COUNT; i++) {
      let orderNumText = i == CONSTANTS.ORDER.CONTENT.NO_ORDER ? "不订餐" : i + " 号";
      let itemClassName = i == CONSTANTS.ORDER.CONTENT.NO_ORDER ? "dropdown-item no-order-item" : "dropdown-item";
      $("." + dropdownListClassName).append("<a class='" + itemClassName + "' href='#' id='order-" + i +"'>" + orderNumText);
      if(i == 5) {
        $("." + dropdownListClassName).append("<div class='dropdown-divider'>");
      }
    }

    if(orderStatus != CONSTANTS.ORDER.STATUS_USER.NOT_ORDER && orderNum != null) {
      setOrderSelect($("." + dropdownListClassName + " #order-" + orderNum), userId, orderNum);
    }

    // Declare ids for each dropdown item.
    let dropdownItemClassName = $(".dropdown-menu-" + userId + " .dropdown-item");
    // Set dropdown item click event.
    addOrderDropdownListEvent(dropdownItemClassName, userId, orderStatus);
  }

  function addCountOperation(container, userId, orderStatus) {
    orderCountOperation(userId, targetDate, null).done(function(orderCountTomorrow) {
      let orderCount = orderCountTomorrow == null ? 1 : orderCountTomorrow;
      let orderCountNew = null;
      let countContainerClassName = "count-operation-" + userId;
      let dropdownListClassName = "count-dropdown-menu-" + userId;
      container.append("<div class='btn-group btn-operation dropdown-count " + countContainerClassName + "'>");
      $("." + countContainerClassName).append("<button type='button' class='btn btn-sm dropdown-toggle dropdown-order-btn' id='count-toggle-" + userId + "' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>");
      let countToggleBtn = $("#count-toggle-" + userId);
      if(orderStatus == CONSTANTS.ORDER.STATUS_USER.NOT_ORDER) {
        countToggleBtn.text("1 份");
        addNewClass(countToggleBtn, "btn-outline-secondary");
        setDisable($("#count-toggle-" + userId));
      } else {
        addNewClass(countToggleBtn, orderCount > 1 ? "btn-outline-warning" : "btn-outline-success");
        $("." + countContainerClassName).append("<div class='dropdown-menu " + dropdownListClassName + "'>");
        // If order num = 6 than set count to be "不订餐" and disable it
        if($(".dropdown-menu-" + userId + " #order-6").hasClass("active")) {
          $("#count-toggle-" + userId).text("不订餐");
          setDisable($("#count-toggle-" + userId));
        } else {
          for(let i = 1; i <= 5; i++) {
            $("." + dropdownListClassName).append("<a class='dropdown-item count-dropdown-item' href='#' id='count-" + userId + "-" + i +"'>" + i + " 份");
            $("#count-" + userId + "-" + i).click(function() {
              orderCountNew = i;
              if(orderCountNew != orderCount) {
                setCountSelect($(this), orderCountNew);
                $("." + countContainerClassName + " .dropdown-order-btn").text(orderCountNew + " 份");
                $.confirm({
                  title:"份数修改确认",
                  content: "确认要将份数改为【" + orderCountNew + "份】吗？",
                  icon: "fa fa-exclamation-triangle",
                  animation: "top",
                  buttons: {
                    confirm: {
                      text: "确认修改",
                      btnClass: "btn-danger",
                      keys: ["enter"],
                      action: function() {
                        setCountSelect($("#count-" + userId + "-" + orderCountNew), userId, orderCountNew);
                        orderCountOperation(userId, targetDate, orderCountNew).done(function(success) {
                          if(success) {
                            jqInfo("设置成功", "已成功将点餐份数设置为【" + orderCountNew + "】份!", function() {
                              reloadTable();
                            });
                          } else {
                            jqAlert("设置成功", "点餐份数设置失败，请重试!");
                          }
                        });
                      }
                    },
                    cancel: {
                      text: "取消",
                      keys: ["esc"],
                      action: function() {
                        setCountSelect($("#count-" + userId + "-" + orderCount), userId, orderCount);
                      }
                    }
                  }
                });
              }
            });
          }
          setCountSelect($("#count-" + userId + "-" + orderCount), userId, orderCount);
        }
      }
    });
  }

  function setOrderSelect(element, userId, orderNum) {
    $(".dropdown-menu-" + userId + " .dropdown-item").each(function() {
      removeOldClass($(this), "active");
    });

    if(orderNum != 6) {
      element.val(orderNum);
      $("#order-toggle-" + userId).text(orderNum + " 号");
    } else {
      $("#order-toggle-" + userId).text("不订餐");
    }
    addNewClass(element, "active");
  }

  function setCountSelect(element, userId, orderCount) {
    $(".count-dropdown-menu-" + userId + " .count-dropdown-item").each(function() {
      removeOldClass($(this), "active");
    });
    if(orderCount != 0) {
      addNewClass(element, "active");
      element.val(orderCount);
      $("#count-toggle-" + userId).text(orderCount + " 份");
    } else {
      $("#count-toggle-" + userId).text("不订餐");
    }
  }

  // Order dropdown related functions
  function addOrderDropdownListEvent(dropdownItem, userId, orderStatus) {
    // Get dropdown toggle button as element obj.
    let orderDropdownBtn = $(".dropdown-order-" + userId + " .dropdown-order-btn");
    // Set dropdown items' click event for each dropdown operation group
    $(dropdownItem).each(function(){
      $(this).click(function() {
        // Clear all "active" class tag
        setOrderDropdownInactive($(".dropdown-item"));
        // Add a new "active" class tag to selected item
        addNewClass($(this), "active");
        // Set selected item text value to dropdown toggle button.
        orderDropdownBtn.text($(this).text());
        // Network request, update order data to server
        setOrderNumber($(this), userId, orderStatus);
      });
    });
  }

  function setOrderNumber(listItem, userId, orderStatus) {
    let lastIndex = listItem.attr("id").length - 1;
    let orderNum = listItem.attr("id")[lastIndex];
    setOrder(userId, orderNum, orderStatus);
  }

  function setOrderDropdownInactive(element) {
    $(element).each(function() {
      removeOldClass($(this), "active");
    });
  }

  // Order operation related functions
  function setOrder(userId, orderNum, orderStatus) {
    setDailyOrder(targetDate, userId, orderNum, orderStatus).done(function(isSuccess) {
      if(isSuccess) {
        if (orderStatus ==  CONSTANTS.ORDER.STATUS_USER.NOT_ORDER) {
          reloadTable();
        } else {
          jqInfo("修改成功", orderNum == 6 ? "已改为【不订餐】" : "成功修改为 【" + orderNum + " 号】", function() {
            reloadTable();
          });
        }

      } else {
        jqAlert("订餐失败", "请重试");
      }
    });
  }

  function setGroupStatusBar(unOrderSum) {
    let statusBar = $(".group-status-bar");
    let hasAllOrdered = unOrderSum == 0 ? true : false;
    removeOldClass(statusBar, hasAllOrdered ? "alert-danger" : "alert-success");
    addNewClass(statusBar, hasAllOrdered ? "alert-success" : "alert-danger");
    statusBar.text(hasAllOrdered ? "所有组员已全部点餐" : "还有【" + unOrderSum + "】人未点餐");
  }

  function setTableStatus(unOrderSum, groupNum) {
    let groupNumber = groupNum[groupNum.length - 1];
    let currentGroupTable = $(".table-group-" + groupNumber);
    let tableHeader = $(".table-group-" + groupNumber + " .card-header");
    if(unOrderSum == 0) {
      removeOldClass(currentGroupTable, "border-danger")
      addNewClass(currentGroupTable, "border-success");
      addNewClass(tableHeader, "header-full-order");
    } else {
      removeOldClass(currentGroupTable, "border-success");
      addNewClass(currentGroupTable, "border-danger");
      removeOldClass(tableHeader, "header-full-order");
    }
  }

  function reloadTable() {
    fetchGroupUserInfo(currentUserRole, currentUserGroup).done(function(response) {
      for(let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
        $(".tb-group" + i + " tr").remove();
      }
      let groupUserList = filterUserByGroup(response);
      setTableData(groupUserList);
    });
  }
});