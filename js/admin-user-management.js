$(document).ready(function () {
  let userRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
  let userGroup = $.cookie(CONSTANTS.COOKIE.USER.KEY_GROUP);
  let groupCount = userRole == CONSTANTS.USER.ROLE.ADMIN_GROUP ? 1 : CONSTANTS.WORKGROUP_COUNT;

  fetchGroupUserInfo(userRole, userGroup).done(function(data) {
    configUI();
    addGlobalListeners();
    addFormButtonClickEvents();
    setData(data);
    $(".del-btn").click(function() {
      showConfirmDeleteDialog(this);
    });

    $(".modify-btn").click(function() {
      let id = $(this).parent().find("input").val();
      if(id == "") {
        jqAlert("错误", "用户信息异常，请刷新重试");
      } else {
        $.cookie(CONSTANTS.COOKIE.USER.KEY_ID_MODIFIED, id);
        window.location.href = "admin-modify-profile.php";
      }
    });
  });

  $(window).resize(function () {
    showHideExtraCols();
    adjustCreationFormSize();
    setDynamicCreateUserSize();
  });

  function configUI() {
    addAdminHighlight($(".admin-item-user"));
    // Dynamic resize UI elements
    showHideExtraCols();
    adjustCreationFormSize();
    setDynamicCreateUserSize();

    // Table related UI functions
    initUI();
    initTableGroup(userRole, userGroup, function() {});
    setGroupTablePrint();
    setAllTablePrint();
    exportEvents("um");
  }

  function initUI() {
    let groupNum = userGroup[5];
    if (userRole == CONSTANTS.USER.ROLE.ADMIN_GROUP || userRole == CONSTANTS.USER.ROLE.ADMIN_MENU) {
      removeHighLevelRoles(userRole);
      $(".nav-drop-down").remove();
      $(".table-card").each(function() {
        if(!$(this).hasClass("table-group-" + groupNum)) {
          $(this).remove();
        }
      });
      $("#super-user").remove();
      $("#new-user-group option").each(function() {
        if($(this).val() != userGroup) {
          $(this).remove();
        }
      });
      setDisable($("#new-user-group"));
    }
  }

// Function to show/hide extra table contents
  function showHideExtraCols() {
    let roleInfo = $(".role-info");
    let workgroupInfo = $(".workgroup-info");
    let nickNameInfo = $(".nickname-info");

    if (getWindowWidth() >= 768 && roleInfo.hasClass("hide")) {
      roleInfo.removeClass("hide");
      workgroupInfo.removeClass("hide");
      nickNameInfo.removeClass("hide");
    } else if (getWindowWidth() < 768 && !roleInfo.hasClass("hide")) {
      roleInfo.addClass("hide");
      workgroupInfo.addClass("hide");
      nickNameInfo.addClass("hide");
    }
  }

// Function to add a new user
  function addOneUser() {
    let username = $("#new-fullname").val();
    let nickName = $("#new-nickname").val();
    let password = $("#new-user-password-edit").val();
    if(password == null || password == "") {
      password = "123";
    }
    let role = $("#user-role option:selected").val();
    let workgroup = $("#new-user-group option:selected").val();
    if(verifyNickName(nickName)) {
      removeAlertFocus($("#new-nickname"));
      if($.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE) == CONSTANTS.USER.ROLE.ADMIN_SUPER) {
        getGroupUserCount(workgroup).done(function(userCount) {

          if(userCount == 0 && (role != CONSTANTS.USER.ROLE.ADMIN_GROUP && role != CONSTANTS.USER.ROLE.ADMIN_MENU)) {
            jqAlert("操作失败","各部门第一个成员必须是【组/菜单管理员】!");
          } else {
            uploadUserData(username, nickName, password, role, workgroup);
          }
        });
      } else {
        uploadUserData(username, nickName, password, role, workgroup);
      }
    } else {
      jqAlertWithFunc("错误","用户名必须包含字母，用于避免和ID混淆", function() {
        $("#new-nickname").val("");
        setAlertFocus($("#new-nickname"));
      });
    }
  }

  function uploadUserData(username, nickName, password, role, workgroup) {
    addUser(username, nickName, password, role, workgroup).done(function(response) {
      switch(response) {
        case "success":
          jqInfo("操作成功", "成功的添加了用户【" + username + "】", function() {
            refresh()
          });
          break;
        case "nickname-exist":
          jqAlert("操作失败","昵称已经被使用, 请更换昵称!");
          break;
        default:
          jqAlert("操作失败", "发生异常，请刷新重试!");
      }
    });
  }

// Function to show confirm dialog when deleting a user.
  function showConfirmDeleteDialog(btn) {
    let userId = $(btn).parent().find("input").val();
    let userName = $("#fullname-" + userId).text();
    jqConfirm("用户删除确认", "确认从数据库中删除【" + userName + "】吗？", function() {
      delUser(userId, userName)
    });
  }

  function delUser(userId, userName) {
    deleteUser(userId).done(function(response) {
      jqInfo(response == "success" ? "删除成功" : "删除失败", response == "success" ? "成功的删除用户 【" + userName + "】" : "删除失败，请刷新重试", function() {
        refresh();
      });
    });
  }

// Function to enable submit button when all require filed has done.
  function enableCreateUserBtn() {
    let fullname = $("#new-fullname").val();
    let nickname = $("#new-nickname").val();
    let createUserBtn = $("#create-new-user-btn");

    if (fullname != "" && nickname != "") {
      setEnable(createUserBtn);
    } else {
      setDisable(createUserBtn);
    }
  }

// Function to show/hide create user when screen width <= 768
  function adjustCreationFormSize() {
    let formContent = $(".form-content");
    let extendContentBtn = $(".extend-content");
    let hideContentBtn = $(".hide-content");
    if (getWindowWidth() > 768) {
      removeOldClass(formContent, "hide");
      addNewClass(extendContentBtn, "hide");
      addNewClass(hideContentBtn, "hide");
    } else if (getWindowWidth() <= 768) {
      addNewClass(formContent, "hide");
      removeOldClass(extendContentBtn, "hide");
    }
  }

// Function to control the add user menu in mobile mode.
  function formControlBtnClick(button) {
    let formContent = $(".form-content");
    let extendBtn = $(".extend-content");
    let hideBtn = $(".hide-content");
    switch(button.attr("id")) {
      case "extend-btn":
        addNewClass(extendBtn, "hide");
        removeOldClass(hideBtn, "hide");
        removeOldClass(formContent, "hide");
        break;
      case "hide-btn":
        addNewClass(hideBtn, "hide");
        removeOldClass(extendBtn, "hide");
        addNewClass(formContent, "hide");
        break;
    }
  }

// Function to adjust create user block and blank block width
  function setDynamicCreateUserSize() {
    let createUserWidth = $(".main-content").width();
    let blankHeight = $(".create-form").height();
    $(".create-form").width(createUserWidth);
    $("body").css("padding-bottom", blankHeight);
  }

  function configTableHeader(dataArray) {
    for(let i = 0; i < CONSTANTS.WORKGROUP_COUNT; i++) {
      let cardHeaderClassName = ".table-group-" + i + " .card-header .tb-title";
      let originalText = $(cardHeaderClassName).text();
      $(cardHeaderClassName).text(originalText + "(" +  getGroupMemberCount(dataArray, i) + "人)");
    }
  }

  function setData(dataArray) {
    configTableHeader(dataArray);
    for(let i = 0; i < groupCount; i++) {
      setDataToGroupTable(getGroupData(dataArray, groupCount == 1 ? userGroup : i), groupCount == 1 ? userGroup : i);
    }
  }

  function getGroupMemberCount(dataArray, groupNum) {
    let groupMembers = 0;
    let group = "group" + groupNum;
    for(let i = 0; i < dataArray.length; i++) {
      if(dataArray[i][4] === group) {
        groupMembers ++;
      }
    }
    return groupMembers;
  }

  function getGroupData(dataArray, groupNumber) {
    let group = groupCount == 1 ? groupNumber : "group" + groupNumber;
    let groupMemberData = new Array();
    for(let i = 0; i < dataArray.length; i++) {
      if(dataArray[i][4] == group) {
        groupMemberData.push(dataArray[i]);
      }
    }
    return groupMemberData;
  }

  function setDataToGroupTable(groupMemberData, userGroup) {
    for(let i = 0; i < groupMemberData.length; i++) {
      let fullName = groupMemberData[i][0];
      let userId = groupMemberData[i][1];
      let userRole = groupMemberData[i][2];
      let nickName = groupMemberData[i][3];
      let groupNum = groupCount == 1 ? userGroup[5] : userGroup;
      let personClass = "group" + "-" + groupNum + "-" + "person" + "-" + i;
      $(".tb-group" + groupNum).append("<tr class=" + personClass + ">");
      $("." + personClass).append("<td id='" + "fullname-" + userId + "'>" + fullName);
      $("." + personClass).append("<td>" + userId);

      let userRoleCN = "";
      if(userRole == CONSTANTS.USER.ROLE.ADMIN_SUPER) {
        userRoleCN = CONSTANTS.USER.ROLE.CN.ADMIN_SUPER;
      } else if(userRole == CONSTANTS.USER.ROLE.ADMIN_GROUP) {
        userRoleCN = CONSTANTS.USER.ROLE.CN.ADMIN_GROUP;
      } else if(userRole == CONSTANTS.USER.ROLE.ADMIN_MENU) {
        userRoleCN = CONSTANTS.USER.ROLE.CN.ADMIN_MENU;
      } else {
        userRoleCN = CONSTANTS.USER.ROLE.CN.USER;
      }
      $("." + personClass).append("<td class='hide-small-screen'>" + userRoleCN);
      $("." + personClass).append("<td class='hide-small-screen'>" + nickName);
      $("." + personClass).append("<td class='operation-btn-group-" + i + " no-print no-export'" + ">");
      let btnGroupClass = personClass + " " + ".operation-btn-group-" + i;
      $("." + btnGroupClass).append("<div class='operation-btn-group btn-group" + "-" + i + "'" + ">");
      $("." + btnGroupClass + " " + ".btn-group-" + i).append("<input type='hidden' value='" + userId + "'>");
      let modifyButtonId = "modify-btn-" + userId;
      $("." + btnGroupClass + " " + ".btn-group-" + i).append("<button type='button' class='btn modify-btn btn-light active' id='" + modifyButtonId + "'>修改");

      if($("#current-user-id").val() == userId) {
        $("#" + modifyButtonId).addClass("current-user");
      }

      if($("#current-user-id").val() != userId) {
        $("." + btnGroupClass + " " + ".btn-group-" + i).append("<button type='button' class='btn btn-danger active del-btn' id='del-btn-" + userId + "'>" + "删除");
      }
    }
  }

  function addGlobalListeners() {
    $("#new-fullname, #new-nickname, #new-user-password-edit").bind('input propertychange', function () {
      enableCreateUserBtn();
    });
  }

  function addFormButtonClickEvents() {
    $("#create-new-user-btn").click(function () {
      addOneUser();
    });

    $("#extend-btn").click(function() {
      formControlBtnClick($("#extend-btn"));
    });

    $("#hide-btn").click(function() {
      formControlBtnClick($("#hide-btn"));
    });
  }

  function exportEvents(tablePrefix) {
    exportGroupTable(tablePrefix, null, null, null, null, null);
    $(".btn-export-all").click(function() {
      exportAllTables(tablePrefix, null, null, null, null);
    })
  }
});

