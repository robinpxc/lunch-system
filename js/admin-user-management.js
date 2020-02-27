$(document).ready(function () {
  let dataArray = fetchUserInfo();
  showHideExtraCols();
  initTableGroup();
  configTableHeader();
  setData(dataArray);
  setGroupTablePrint();

  $('.del-btn').on('click', function () {
    showConfirmDeleteDialog(this);
  });

  $("#create-new-user-btn").click(function () {
    addUser();
  });

  $("#new-fullname, #new-nickname, #new-user-password-edit").bind('input propertychange', function () {
    enableCreateUserBtn();
  });

  $("#extend-btn").on("click", function() {
    formControlBtnClick($("#extend-btn"));
  });

  $("#hide-btn").on("click", function() {
    formControlBtnClick($("#hide-btn"));
  });

  adjustCreationFormSize();
  setDynamicCreateUserSize();

  $(window).resize(function () {
    showHideExtraCols();
    adjustCreationFormSize();
    setDynamicCreateUserSize();
  });

  // Function to fetch user info
  function fetchUserInfo() {
    let dataArray = new Array();
    $.ajax({
      type: "POST",
      url: "../php/functions/fetch-user-info.php",
      data: {
      },
      async: false,
      dataType: "JSON",
      success: function (response) {
        dataArray = response;
      },
      error: function () {
        alert("获取用户信息失败，Ajax数据错误，请刷新或切换网络环境，再或联系开发者");
      },
      complete: function() {}
    });
    return dataArray;
  }

// Function to show/hide extra table contents
  function showHideExtraCols() {
    var roleInfo = $(".role-info");
    var workgroupInfo = $(".workgroup-info");
    var nickNameInfo = $(".nickname-info");

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
  function addUser() {
    var username = $("#new-fullname").val();
    var userNickName = $("#new-nickname").val();
    var password = $("#new-user-password-edit").val();
    var role = $("#new-user-role option:selected").val();
    var workgroup = $("#new-user-group option:selected").val();
    $.ajax({
      type: "post",
      url: "../php/functions/add-user.php",
      data: {
        "username": username,
        "nickname": userNickName,
        "password": password,
        "role": role,
        "workgroup": workgroup
      },
      dataType: "json",
      async: false,
      success: function (response) {
        switch (response) {
          case 1:
            alert("添加用户" + username + "成功！");
            showAlert();
            break;
          case 2:
            alert("设置的昵称已经被使用了");
            break;
        }
      }
    });
  }

// Function to show confirm dialog when deleting a user.
  function showConfirmDeleteDialog(btn) {
    var userId = $(btn).parent().parent().find("input").val();
    $.confirm({
      title: "用户删除确认",
      content: '确认从数据库中删除该用户吗？',
      buttons: {
        confirm: {
          btnClass: "btn-danger",
          text: "确认删除",
          keys: ["enter"],
          action: function () {
            var delUrl = "../php/functions/delete-user.php?user_id=" + userId;
            window.location.href = delUrl;
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

// Function to show general alert
  function showAlert() {
    $.alert({
      title: 'Alert!',
      content: 'Simple alert!',
      confirm: function(){
      }
    });
  }

// Function to enable submit button when all require filed has done.
  function enableCreateUserBtn() {
    $fullname = $("#new-fullname").val();
    $nickname = $("#new-nickname").val();
    $password = $("#new-user-password-edit").val();
    $createUserBtn = $("#create-new-user-btn");

    if ($fullname != "" && $nickname != "" && $password != "") {
      setEnable($createUserBtn);
    } else {
      setDisable($createUserBtn);
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
    var formContent = $(".form-content");
    var extendBtn = $(".extend-content");
    var hideBtn = $(".hide-content");
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
    var createUserWidth = $(".main-content").width();
    var blankHeight = $(".create-form").height();
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
    for(let i = 0; i < 7; i++) {
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
      $("." + personClass).append("<td>" + fullname);
      $("." + personClass).append("<td>" + userId);

      $("." + personClass).append("<td class='hide-small-screen'>" + (userRole == "user" ? "用户" : "管理员"));
      $("." + personClass).append("<td class='hide-small-screen'>" + nickname);
      $("." + personClass).append("<td class='operation-btn-group-" + i + " no-print '" + ">");
      let btnGroupClass = personClass + " " + ".operation-btn-group-" + i;
      $("." + btnGroupClass).append("<div class='btn-group btn-group" + "-" + i + "'" + ">");
      $("." + btnGroupClass + " " + ".btn-group-" + i).append("<input type='hidden' value='" + userId + "'>");
      $("." + btnGroupClass + " " + ".btn-group-" + i).append("<a id='modify-link'" + " href='admin-modify-profile.php?uid=" + userId + "'" + ">");
      let modifyButtonId = "." + btnGroupClass + " " + ".btn-group-" + i + " #modify-link";
      $(modifyButtonId).append("<button type='button' class='btn btn-light active' id='modify-btn'>修改");

      if($("#current-user-id").val() != userId) {
        $("." + btnGroupClass + " " + ".btn-group-" + i).append("<a id='del-link'>");
        let delButtonId = "." + btnGroupClass + " " + ".btn-group-" + i + " #del-link";
        $(delButtonId).append("<button type='button' class='btn btn-danger active del-btn' id='del-btn-" + userId + "'>" + "删除");
      }
    }
  }
});

