$(document).ready(function () {
  let currentUserId = $.cookie("modify-user-id");
  if(currentUserId == null || currentUserId == "") {
    currentUserId = "session";
  }

  let defaultUserInfo = {};

  let modifyButtonGroup = $(".modify-btn");
  let userRoleSelect = $("#user-role");
  let userRoleValue = $("#user-role-value").val();
  let userWorkgroupSelect = $("#user-workgroup");
  let userWorkgroupValue = $("#user-workgroup-value").val();
  let discardBtn = $("#discard-btn");
  let submitBtn = $("#submit-btn");
  let eyeBtn = $("#show-hide-pwd-btn");

  fetchUserInfo(currentUserId).done(function(response) {
    defaultUserInfo.id = response.id;
    defaultUserInfo.fullname = response.fullname;
    defaultUserInfo.nickname = response.nick_name;
    defaultUserInfo.workgroup = response.workgroup;
    defaultUserInfo.role = response.role;
    setUserData(defaultUserInfo);

    modifyButtonClickEvent(modifyButtonGroup);

    // Discard button click event
    discardBtn.click(function () {
      discardChanges(modifyButtonGroup, defaultUserInfo);
    });

    // Submit button click event
    submitBtn.click(function () {
      submitModifiedUserInfo(defaultUserInfo, defaultUserInfo.id);
    });

    // Function of password eye button
    eyeBtn.click(function () {
      eyeBtnClickEvent();
    });


  });

  function setUserData(userInfo) {
    $("#user-id-input").val(userInfo.id);
    $("#user-fullname-input").val(userInfo.fullname);
    $("#user-role").val(userInfo.role);
    $("#user-workgroup").val(userInfo.workgroup);
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
    let idField = $("input[name='user-id']");
    let fullnameField = $("input[name='user-fullname']");
    let roleField = $("#user-role");
    let workgroupField = $("#user-workgroup");
    let nicknameField = $("input[name='user-nickname-edit']");
    let passwordField = $("input[name='user-password-edit']");

    idField.val(defaultUserInfoObj.id);
    setReadOnly(idField);
    fullnameField.val(defaultUserInfoObj.fullname);
    setReadOnly(fullnameField);
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
  function submitModifiedUserInfo(userInfoObj, oldId) {
    let userInfoUpdate = {};
    $(".form-control").each(function(){
      let self = $(this);
      switch(self.attr("id")) {
        case "user-id-input":
          userInfoUpdate.id = isDataModified(self, userInfoObj.id) ? self.val() : userInfoObj.id;
          break;
        case "user-fullname-input":
          userInfoUpdate.fullname = isDataModified(self, userInfoObj.fullname) ? self.val() : userInfoObj.fullname;
          break;
        case "user-role":
          userInfoUpdate.role = isDataModified(self, userInfoObj.role) ? self.val() : userInfoObj.role;
          break;
        case "user-workgroup":
          userInfoUpdate.workgroup = isDataModified(self, userInfoObj.workgroup) ? self.val() : userInfoObj.workgroup;
          break;
        case "nickname-input":
          userInfoUpdate.nickname = isDataModified(self, userInfoObj.nickname) ? self.val() : userInfoObj.nickname;
          break;
        case "password-input":
          userInfoUpdate.password = self.val();
          break;
      }
    });

    updateUserInfo(userInfoUpdate).done(function(response) {
      if(response == "success") {
        jqInfo("成功", "用户信息修改成功!");
      } else {
        jqAlert("失败", "用户信息修改失败,请重试!");
      }
    })
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
    removeOldClass($("eye-icon-disabled"), "hide");
  }
});



