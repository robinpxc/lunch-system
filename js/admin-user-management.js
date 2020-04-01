$(document).ready(function () {
  let role = $.cookie("current-user-role");
  let group = $.cookie("current-user-group");
  let groupNumber = role == "admin-group" ? 1 : 7;
  let dataArray = new Array();

  configUI();
  addGlobalListeners();
  addFormButtonClickEvents();

  fetchUserInfo().done(function(responsedDataArray) {
    dataArray = responsedDataArray;
    setData(dataArray);
    configTableHeader();
    $(".del-btn").click(function() {
      showConfirmDeleteDialog(this);
    });
  });

  $(window).resize(function () {
    showHideExtraCols();
    adjustCreationFormSize();
    setDynamicCreateUserSize();
  });

  // Function to fetch user info
  function configUI() {
    // Dynamic resize UI elements
    showHideExtraCols();
    adjustCreationFormSize();
    setDynamicCreateUserSize();

    // Table related UI functions
    initUI();
    initTableGroup();
    setGroupTablePrint();
  }

  function initUI() {
    let groupNum = group[5];
    if (role == "admin-group") {
      $(".nav-drop-down").remove();
      $(".table-card").each(function() {
        if(!$(this).hasClass("table-group-" + groupNum)) {
          $(this).remove();
        }
      });
      $("#super-user").remove();
      $("#new-user-group option").each(function() {
        if($(this).val() != group) {
          $(this).remove();
        }
      });
    }
  }

  function fetchUserInfo() {
    let deferred = $.Deferred();
    let groupType;
    groupType = role == "admin-group" ? group : "all";
    $.ajax({
      type: "post",
      url: "../php/functions/fetch-user-info.php",
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
    let role = $("#new-user-role option:selected").val();
    let workgroup = $("#new-user-group option:selected").val();
    addUser(username, nickName, password, role, workgroup).done(function(response) {
      if(response == "success") {
        alert("操作成功, 成功的添加了用户【" + username + "】");
      } else if(response == "nickname-exist") {
        alert("操作失败, 昵称已经被使用了!");
      } else {
        alert("操作失败, 发生异常，请重试!");
      }
    });
  }

// Function to show confirm dialog when deleting a user.
  function showConfirmDeleteDialog(btn) {
    let userId = $(btn).parent().parent().find("input").val();
    let userName = $("#fullname-" + userId).text();
    $.confirm({
      title: "用户删除确认",
      content: "确认从数据库中删除【" + userName + "】吗？",
      icon: "fa fa-exclamation-triangle",
      animation: "top",
      buttons: {
        confirm: {
          btnClass: "btn-danger",
          text: "确认删除",
          keys: ["enter"],
          action: function () {
            delUser(userId, userName);
          }
        },
        cancel: {
          btnClass: "btn-primary",
          text: "取消",
          keys: ["esc"],
        }
      }
    });
  }

  function delUser(userId, userName) {
    deleteUser(userId).done(function(response) {
      jqInfo(response == "success" ? "删除成功" : "删除失败", response == "success" ? "成功的删除用户 【" + userName + "】" : "删除失败，请重试");
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
    var formContent = $(".form-content");
    var extendContentBtn = $(".extend-content");
    var hideContentBtn = $(".hide-content");
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

  function configTableHeader() {
    for(let i = 0; i < 7; i++) {
      let cardHeaderClassName = ".table-group-" + i + " .card-header .tb-title";
      let originalText = $(cardHeaderClassName).text();
      $(cardHeaderClassName).text(originalText + "（ 共 " +  getGroupOrderNumber(dataArray, i) + " 人 ）");
    }
  }

  function setData(dataArray) {
    for(let i = 0; i < groupNumber; i++) {
      setDataToGroupTable(getGroupData(dataArray, i), i);
    }
  }

  function getGroupOrderNumber(dataArray, groupNumber) {
    let groupOrder = 0;
    let group = "group" + groupNumber;
    for(let i = 0; i < dataArray.length; i++) {
      if(dataArray[i][5] == group) {
        groupOrder ++;
      }
    }
    return groupOrder;
  }

  function getGroupData(dataArray, groupNumber) {
    let group = "group" + groupNumber;
    let groupOrderData = new Array();
    for(let i = 0; i < dataArray.length; i++) {
      if(dataArray[i][5] == group) {
        groupOrderData.push(dataArray[i]);
      }
    }
    return groupOrderData;
  }

  function setDataToGroupTable(data, group) {
    for(let i = 0; i < data.length; i++) {
      let fullname = data[i][2];
      let userId = data[i][0];
      let userRole = data[i][4];
      let nickname = data[i][1];
      let personClass = "group" + "-" + group + "-" + "person" + "-" + i;

      $(".tb-group" + group).append("<tr class=" + personClass + ">");
      $("." + personClass).append("<td id='" + "fullname-" + userId + "'>" + fullname);
      $("." + personClass).append("<td>" + userId);

      let userRoleCN = "";
      if(userRole == "admin-super") {
        userRoleCN = "高级管理员";
      } else if(userRole == "admin-group") {
        userRoleCN = "组管理员";
      } else {
        userRoleCN = "用户";
      }
      $("." + personClass).append("<td class='hide-small-screen'>" + userRoleCN);
      $("." + personClass).append("<td class='hide-small-screen'>" + nickname);
      $("." + personClass).append("<td class='operation-btn-group-" + i + " no-print '" + ">");
      let btnGroupClass = personClass + " " + ".operation-btn-group-" + i;
      $("." + btnGroupClass).append("<div class='operation-btn-group btn-group" + "-" + i + "'" + ">");
      $("." + btnGroupClass + " " + ".btn-group-" + i).append("<input type='hidden' value='" + userId + "'>");
      $("." + btnGroupClass + " " + ".btn-group-" + i).append("<a id='modify-link'" + " href='admin-modify-profile.php?uid=" + userId + "'" + ">");
      let modifyButtonId = "." + btnGroupClass + " " + ".btn-group-" + i + " #modify-link";
      $(modifyButtonId).append("<button type='button' class='btn modify-btn btn-light active' id='modify-btn'>修改");
      if($("#current-user-id").val() == userId) {
        $(".operation-btn-group a button").css({
          "width": "100%",
          "border-top-right-radius": "4px",
          "border-bottom-right-radius": "4px"
        });
      }

      if($("#current-user-id").val() != userId) {
        $("." + btnGroupClass + " " + ".btn-group-" + i).append("<a id='del-link'>");
        let delButtonId = "." + btnGroupClass + " " + ".btn-group-" + i + " #del-link";
        $(delButtonId).append("<button type='button' class='btn btn-danger active del-btn' id='del-btn-" + userId + "'>" + "删除");
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
});

