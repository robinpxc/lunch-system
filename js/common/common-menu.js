/*
* Function to check if a menu has been set for a day.
* This function will return a "menu-exist" if a menu exist for a day,
* and return a "no-menu" if menu not exist for a day.
*
* Parameters:
*   date:  [string] Will determine the date of order.
* */
function checkMenuStatus(date) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/check-menu-status.php",
    data: {
      "selected-date": date
    },
    dataType: "json",
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      deferred.resolve(response);
    },
    error: function (errorMsg) {
      alert("菜单状态查询失败，请重试");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}

// Function to fetch menu from server
function fetchMenuList(date) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-menu.php",
    data: {
      'date': date
    },
    dataType: CONSTANTS.AJAX.DATA_TYPE.JSON,
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      if (response != null) {
        deferred.resolve(response);
      }
    },
    error: function (errorMsg) {
      alert("获取状态失败，请重试");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}

// Function to create / update menu
function updateMenu(menuList, date) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/update-menu.php",
    data: {
      'date': date,
      'menu-list': JSON.stringify(menuList)
    },
    dataType: "json",
    beforeSend: function() {
      addSpinner();
    },
    success: function(response) {
      deferred.resolve(response);
    },
    error: function (errorMsg) {
      alert("Ajax菜单创建/更新错误，请刷新页面或者切换网络环境，或联系开发者");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}

/*
* Function to fetch menu list detail from remote.
* This function will return a 7 * 3 array for all menu data in one day.
* Parameters:
*   date:  [string] Will determine the date of order.
*   async: [boolean] will determine the function will work on sync/async mode.
* */
function fetchMenu(date) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-menu.php",
    data: {
      "date": date
    },
    dataType: "JSON",
    timeout: 30000,
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      if (response != null) {
        deferred.resolve(response);
      }
    },
    error: function (errorMsg) {
      alert("获取菜单失败，Ajax数据错误，请刷新或切换网络环境，再或联系开发者");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}

/*
* Function to fetch people who did not order for a day
* This function will return an array include user id, fullname, and workgroup
* Parameters:
*   date:  [string] Will determine the date of order.
*   async: [boolean] will determine the function will work on sync/async mode.
* */
function fetchNoOrderUsers(date, group) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-no-order-users.php",
    data: {
      "date": date,
      "group": group
    },
    dataType: "JSON",
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      if (response != null) {
        deferred.resolve(response);
      }
    },
    error: function (errorMsg) {
      alert("获取未订餐人员失败，Ajax数据错误，请刷新或切换网络环境，再或联系开发者");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}


/*
* Function to check and update group order confirmation for group admin
* This function will return a boolean value for update confirmation, and return a string for check status.
* Parameters:
*   type: [string] determine the operation type, [check] or [update]
*   date:  [string] determine the date of confirmation.
*   group: [boolean] determine the current user group.
*   status: confirmation status content, will be uploaded when do update operation.
* */
function menuConfirmOperation(type, date, group, status) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/daily-confirmation-operation.php",
    data: {
      "type": type,
      "date": date,
      "group": group,
      "status": status
    },
    dataType: CONSTANTS.AJAX.DATA_TYPE.JSON,
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      if (response != null) {
        deferred.resolve(response);
      }
    },
    error: function (errorMsg) {
      alert("检查签字状态失败，请重试");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}

function checkMenuConfirmation(date, group, func) {
  menuConfirmOperation(CONSTANTS.MENU.CONFIRMATION.TYPE.CHECK, date, group, "").done(function(confirmStatus) {
    func(confirmStatus);
  });
}

function updateMenuConfirmation(date, group, status, func) {
  menuConfirmOperation(CONSTANTS.MENU.CONFIRMATION.TYPE.UPDATE, date, group, status).done(function(updateStatus) {
    func(updateStatus);
  });
}

