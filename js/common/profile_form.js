$(document).ready(function () {
  // Variables
  // Buttons
  var nicknameBtn = $("#nickname-edit-btn");
  var passwordModifyBtn = $("#password-edit-btn");
  var discardBtn = $("#discard-btn");
  var submitBtn = $("#submit-btn");
  var eyeBtn = $("#show-hide-pwd-btn");

  var eyeIcon = $("#eye-icon");
  var eyeIconDisabled = $("#eye-icon-disabled");

  // Inputs
  var nicknameInput = $("input[name='user-nickname-edit']");
  var nickNameInputValue = nicknameInput.val();
  var passwordInput = $("input[name='user-password-edit']");

  // Groups
  var modifyBtnGroup = $(".modify-btn");
  var profileInputGroup = $(".profile-input");

  setPermissionText();

  $(window).resize(function () {
    setPermissionText();
  });

  // Function of nick name modify button
  nicknameBtn.click(function () {
    setEnable(nicknameInput);
    modifyBtnClickEvent(nicknameBtn);
    nicknameInput.focus();
    nicknameInput.select();
  });

  // Function of password modify button
  passwordModifyBtn.click(function () {
    setEnable(passwordInput);
    setEnable(eyeBtn);
    modifyBtnClickEvent(passwordModifyBtn);
    passwordInput.focus();
  });

  // Function of password eye button
  eyeBtn.click(function() {
    var inputType = passwordInput.attr("type");
    if(inputType === "password") {
      passwordInput.attr("type", "text");
      eyeIcon.addClass("hide");
      eyeIconDisabled.removeClass("hide");
    } else {
      passwordInput.attr("type", "password");
      eyeIconDisabled.addClass("hide");
      eyeIcon.removeClass("hide");
    }
  });

  // Function of discard button
  discardBtn.click(function () {
    nicknameInput.val(nickNameInputValue);
    resetForm();
  });

  // Common function to handle reset operation.
  function resetForm() {
    passwordInput.val("");
    setDisable(submitBtn);
    setDisable(discardBtn);
    setDisable(eyeBtn);
    modifyBtnGroup.each(function () {
      setModifyBtnStatus($(this), "unclicked");
    });
    profileInputGroup.each(function () {
      setDisable($(this));
    });
    window.getSelection().empty();
  }

  // Common function to handle common operation when modify button clicked.
  function modifyBtnClickEvent(selfBtn) {
    setEnable(discardBtn);
    setEnable(submitBtn);
    setModifyBtnStatus(selfBtn, "clicked");
  }
});

// Function to show/hide permission info text
function setPermissionText() {
  var permissionText = $(".permission-text");
  var lessPermissionInput = $(".less-permission-input");
  var windowWidth = getWindowWidth();

  if (windowWidth >= 768 && permissionText.hasClass("hide")) {
    permissionText.removeClass("hide");
    lessPermissionInput.removeClass("right-radius");
  } else if (windowWidth < 768 && !permissionText.hasClass("hide")) {
    permissionText.addClass("hide");
    lessPermissionInput.addClass("right-radius");
  }
}

// Function to set form item modify button status
function setModifyBtnStatus(button, status) {
  switch (status) {
    case "clicked":
      setDisable(button);
      break;
    case "unclicked":
      setEnable(button);
      break;
  }
}