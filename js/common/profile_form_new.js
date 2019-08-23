$(document).ready(function () {
  var defaultUserInfo = {};
  getUserInfo(defaultUserInfo);

  var modifyButtonGroup = $(".modify-btn");
  var userRoleSelect = $("#user-role");
  var userRoleValue = $("#user-role-value").val();
  var userWorkgroupSelect = $("#user-workgroup");
  var userWorkgroupValue = $("#user-workgroup-value").val();
  var discardBtn = $("#discard-btn");
  var submitBtn = $("#submit-btn");

  var eyeBtn = $("#show-hide-pwd-btn");

  userRoleSelect.val(userRoleValue);
  userWorkgroupSelect.val(userWorkgroupValue);
  modifyButtonClickEvent(modifyButtonGroup);

  // Discard button click event
  discardBtn.click(function () {
    discardChanges(modifyButtonGroup, defaultUserInfo);
  });

  // Submit button click event
  submitBtn.click(function () {
    submitModifiedUserInfo(defaultUserInfo);
  });

  // Function of password eye button
  eyeBtn.click(function () {
    eyeBtnClickEvent();
  });
});

// Function to save default user info 
function getUserInfo(userInfoObject) {
  userInfoObject.id = $("input[name='user-id']").val();
  userInfoObject.fullname = $("input[name='user-fullname']").val();
  userInfoObject.role = $("#user-role-value").val();
  userInfoObject.workgroup = $("#user-workgroup-value").val();
  userInfoObject.nickname = $("input[name='user-nickname-edit']").val();
}

// Function to handle all modify button click events
function modifyButtonClickEvent(btnGroup) {
  btnGroup.each(function () {
    var self = $(this);
    var btnId = self.attr("id");
    self.click(function () {
      setEnable($("#discard-btn"));
      setEnable($("#submit-btn"));
      switch (btnId) {
        case "id-edit-btn":
          setDisable(self);
          setEnable($("input[name='user-id']"));
          break;
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
function discardChanges(modifyBtnGtoup, defaultUserInfoObj) {
  var idField = $("input[name='user-id']");
  var fullnameField = $("input[name='user-fullname']");
  var roleField = $("#user-role");
  var workgroupField = $("#user-workgroup");
  var nicknameField = $("input[name='user-nickname-edit']");
  var passwordField = $("input[name='user-password-edit']");

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
  modifyBtnGtoup.each(function () {
    setEnable($(this));
  });

  setDisable($("#discard-btn"));
  setDisable($("#submit-btn"));
  resetEyeBtn();
}

// Function to submit modified user information
function submitModifiedUserInfo(userInfoObj) {
  var idField = $("input[name='user-id']");
  var fullnameField = $("input[name='user-fullname']");
  var roleField = $("#user-role");
  var workgroupField = $("#user-workgroup");
  var nicknameField = $("input[name='user-nickname-edit']");
  var passwordField = $("input[name='user-password-edit']");
  var updatedUserInfo = {};


  $(".form-control").each(function(){
    var self = $(this);
    switch(self.attr("id")) {
      case "user-id-input":
        break;
      case "user-fullname-input":
        break;
      case "user-role":
        break;
      case ""
    }
  });


  if (isEnable(idField) && idField.val() != userInfoObj.id & idField.val() != "") {
    updatedUserInfo.id = idField.val();
  }

  if (isEnable(fullnameField) && fullnameField.val() != userInfoObj.val() != "") {

  }
}

// Function to judge if the modified data
function isDataModified(element, userInfoObj) {
  if(!isEnable(element)) {
    return false;
  } else {
    if(element.val() != "") {
      switch(element.attr("id")) {

      }
    }
  }
}

// Function to handle eye button click event
function eyeBtnClickEvent() {
  var eyeIcon = $("#eye-icon");
  var eyeIconDisabled = $("#eye-icon-disabled");
  var passwordInput = $("input[name='user-password-edit']");
  var inputType = passwordInput.attr("type");
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