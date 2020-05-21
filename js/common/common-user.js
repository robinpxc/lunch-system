function fetchGroupUserInfo(role, group) {
  let deferred = $.Deferred();
  let groupType = role == CONSTANTS.USER.ROLE.ADMIN_GROUP ? group : CONSTANTS.WORKGROUP.GROUP_ALL;
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-group-user-info.php",
    data: {
      "group-type": groupType
    },
    dataType: "JSON",
    beforeSend: function() {addSpinner();},
    success: function (response) {
      deferred.resolve(response);
    },
    error: function () {
      alert("获取用户信息失败，Ajax数据错误，请刷新或切换网络环境，再或联系开发者");
    },
    complete: function() {removeSpinner();}
  });
  return deferred.promise();
}

function fetchUserInfo(userId) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-user-info.php",
    data: {
      "userId": userId
    },
    dataType: "json",
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      deferred.resolve(response);
    },
    error: function (errorMsg) {
      alert("当前用户信息获取失败，请重试！");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}

function addUser(username, nickName, password, role, workgroup) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/add-user.php",
    data: {
      "username": username,
      "nickname": nickName,
      "password": password,
      "role": role,
      "workgroup": workgroup
    },
    dataType: CONSTANTS.AJAX.DATA_TYPE.JSON,
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      deferred.resolve(response);
    },
    error: function(error) {
      $("body").html(error.responseText);
      alert("网络异常，请重试");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}

// Function to submit modified data as an object via ajax
function updateUserInfo(userInfoObject) {
  let deferred = new $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/modify-user-info.php",
    dataType: "text",
    data: {
      "id": userInfoObject.id,
      "fullname": userInfoObject.fullname,
      "nickname": userInfoObject.nickname,
      "workgroup":userInfoObject.workgroup,
      "password": userInfoObject.password,
      "role": userInfoObject.role
    },
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      deferred.resolve(response);
    },
    error: function(response) {
      jqAlert("修改失败", "用户信息修改失败,请重试!");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}

function deleteUser(userId) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/delete-user.php",
    data: {
      "userId": userId
    },
    dataType: "json",
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      deferred.resolve(response);
    },
    error: function (errorMsg) {
      alert("用户删除失败，请刷新页面或者切换网络环境，或联系开发者");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}

function getGroupUserCount(group) {
  let deferred = $.Deferred();
  $.ajax({
    type: CONSTANTS.AJAX.TYPE.POST,
    url: "../php/functions/fetch-group-user-count.php",
    data: {
      "group": group
    },
    dataType: "json",
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      deferred.resolve(response);
    },
    error: function (errorMsg) {
      alert("人数获取失败，请重试");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}