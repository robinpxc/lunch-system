$(document).ready(function () {
  let currentUserId = $.cookie(CONSTANTS.COOKIE.USER.KEY_ID_MODIFIED);
  let currentUserRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
  let currentUserInfo = {};
  let modifyButtonGroup = $(".modify-btn");
  let discardBtn = $("#discard-btn");
  let submitBtn = $("#submit-btn");
  let eyeBtn = $("#show-hide-pwd-btn");

  if(currentUserId == null || currentUserId == "") {
    currentUserId = $.cookie(CONSTANTS.COOKIE.USER.KEY_ID);
  }

  fetchUserInfo(currentUserId).done(function(response) {
    currentUserInfo.id = response.id;
    currentUserInfo.fullname = response.fullname;
    currentUserInfo.nickname = response.nick_name;
    currentUserInfo.role = response.role;
    currentUserInfo.workgroup = response.workgroup;

    setUserData(currentUserInfo);

    modifyButtonClickEvent(modifyButtonGroup);

    // Discard button click event
    discardBtn.click(function () {
      discardChanges(modifyButtonGroup, currentUserInfo);
    });

    // Submit button click event
    submitBtn.click(function () {
      submitModifiedUserInfo(currentUserInfo);
    });

    // Function of password eye button
    eyeBtn.click(function () {
      eyeBtnClickEvent();
    });
  });

  function setUserData(userInfo) {
    $("#user-id-input").val(userInfo.id);
    $("#user-fullname-input").val(userInfo.fullname);
    setRoleOptions($("#user-role"));
    if(currentUserId == userInfo.id && (currentUserRole == CONSTANTS.USER.ROLE.ADMIN_MENU || currentUserRole == CONSTANTS.USER.ROLE.ADMIN_GROUP)) {
      $("#role-edit-btn").remove();
      $("#user-role").addClass("all-radius");
    }
    $("#user-role").val(($("#user-role").hasClass("text-only")) ? roleToText(userInfo.role) : userInfo.role);
    removeHighLevelRoles($.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE));
    $("#user-workgroup").val($("#user-workgroup").hasClass("text-only")? groupToText(userInfo.workgroup) : userInfo.workgroup);
    $("#nickname-input").val(userInfo.nickname);
  }


// Function to handle all modify button click events
  function modifyButtonClickEvent(btnGroup) {
    btnGroup.each(function () {
      let self = $(this);
      let btnId = self.attr("id");
      self.click(function () {
        setEnable($("#discard-btn"));
        setEnable($("#submit-btn"));
        switch (btnId) {
          case "fullname-edit-btn":
            setDisable(self);
            setEnable($("input[name='user-fullname']"));
            break;
          case "role-edit-btn":
            setDisable(self);
            setEnable($("#user-role"));
            break;
          case "workgroup-edit-btn":
            setDisable(self);
            setEnable($("#user-workgroup"));
            break;
          case "nickname-edit-btn":
            setDisable(self);
            setEnable($("input[name='user-nickname-edit']"));
            break;
          case "password-edit-btn":
            setDisable(self);
            setEnable($("input[name='user-password-edit']"));
            setEnable($("#show-hide-pwd-btn"));
            break;
        }
      });
    });
  }

// Function to discard all input field
  function discardChanges(modifyBtnGroup, defaultUserInfoObj) {
    removeAlertFocus($("#nickname-input"));
    let idField = $("input[name='user-id']");
    let userNameField = $("input[name='user-fullname']");
    let roleField = $("#user-role");
    let workgroupField = $("#user-workgroup");
    let nicknameField = $("input[name='user-nickname-edit']");
    let passwordField = $("input[name='user-password-edit']");

    idField.val(defaultUserInfoObj.id);
    setReadOnly(idField);
    userNameField.val(defaultUserInfoObj.fullname);
    setReadOnly(userNameField);
    roleField.val(defaultUserInfoObj.role);
    setDisable(roleField);
    workgroupField.val(defaultUserInfoObj.workgroup);
    setDisable(workgroupField);
    nicknameField.val(defaultUserInfoObj.nickname);
    setReadOnly(nicknameField);
    passwordField.val("");
    setReadOnly(passwordField);
    modifyBtnGroup.each(function () {
      setEnable($(this));
    });

    setDisable($("#discard-btn"));
    setDisable($("#submit-btn"));
    resetEyeBtn();
  }

// Function to submit modified user information
  function submitModifiedUserInfo(userInfoObj) {
    let userInfoUpdate = {};
    let modificationCount = 0
    $(".form-control").each(function(){
      let self = $(this);
      switch(self.attr("id")) {
        case "user-id-input":
          modificationCount += isDataModified(self, userInfoObj.id) ? 1 : 0;
          userInfoUpdate.id = isDataModified(self, userInfoObj.id) ? self.val() : userInfoObj.id;
          break;
        case "user-fullname-input":
          modificationCount += isDataModified(self, userInfoObj.fullname) ? 1 : 0;
          userInfoUpdate.fullname = isDataModified(self, userInfoObj.fullname) ? self.val() : userInfoObj.fullname;
          break;
        case "user-role":
          modificationCount += isDataModified(self, userInfoObj.role) ? 1 : 0;
          userInfoUpdate.role = isDataModified(self, userInfoObj.role) ? self.val() : userInfoObj.role;
          break;
        case "user-workgroup":
          modificationCount += isDataModified(self, userInfoObj.workgroup) ? 1 : 0;
          userInfoUpdate.workgroup = isDataModified(self, userInfoObj.workgroup) ? self.val() : userInfoObj.workgroup;
          break;
        case "nickname-input":
          modificationCount += isDataModified(self, userInfoObj.nickname) ? 1 : 0;
          userInfoUpdate.nickname = isDataModified(self, userInfoObj.nickname) ? self.val() : userInfoObj.nickname;
          break;
        case "password-input":
          modificationCount += (self.val() == "" || self.val() == null) ? 0 : 1;
          userInfoUpdate.password = self.val();
          break;
      }
    });

    if(verifyNickName(userInfoUpdate.nickname)) {
      removeAlertFocus($("#nickname-input"));
      if(modificationCount > 0) {
        updateUserInfo(userInfoUpdate).done(function(response) {
          if(response == "success") {
            jqInfo("修改成功", "修改了【" + modificationCount + "】处信息!", function() {
              refresh();
            } );
          } else {
            jqAlert("修改失败", "用户信息修改失败，可能的原因：【昵称】已经被使用了");
          }
        });
      } else {
        jqInfo("无改动", "您没有修改任何信息", function() {});
      }
    } else {
      jqAlertWithFunc("错误","用户名必须包含字母，用于避免和ID混淆", function() {
        $("#nickname-input").val("");
        setAlertFocus($("#nickname-input"));
      });
    }
  }

// Function to judge if the modified data
  function isDataModified(element, data) {
    if(!isEnable(element)) {
      return false;
    } else {
      if( element.val() != "" && element.val() != data) {
        return true;
      }
    }
  }

// Function to handle eye button click event
  function eyeBtnClickEvent() {
    let eyeIcon = $("#eye-icon");
    let eyeIconDisabled = $("#eye-icon-disabled");
    let passwordInput = $("input[name='user-password-edit']");
    let inputType = passwordInput.attr("type");
    if (inputType === "password") {
      passwordInput.attr("type", "text");
      eyeIconDisabled.addClass("hide");
      eyeIcon.removeClass("hide");
    } else {
      passwordInput.attr("type", "password");
      eyeIcon.addClass("hide");
      eyeIconDisabled.removeClass("hide");
    }
  }

// Function to reset eye button
  function resetEyeBtn() {
    setDisable($("#show-hide-pwd-btn"));
    addNewClass($("#eye-icon"), "hide");
    removeOldClass($("#eye-icon-disabled"), "hide");
  }
});



