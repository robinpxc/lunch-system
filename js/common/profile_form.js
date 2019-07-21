$(document).ready(function () {
    // Variables
    // Buttons
    var nicknameBtn = $("#nickname-edit-btn");
    var pwdBtn = $("#password-edit-btn");
    var discardBtn =  $("#discard-btn");
    var submitBtn =  $("#submit-btn");
  
    // Inputs
    var nicknameInput = $("input[name='user-nickname']");
    var nickNameInputValue = nicknameInput.val();
    var passwordInput = $("input[name='user-password']");
    var passwordInputValue = passwordInput.val();
  
    // Groups
    var modifyBtnGroup = $(".modify-btn");
    var profileInputGroup = $(".profile-input");
  
    setPermissionText();
  
    $(window).resize(function () {
      setPermissionText();
    });
  
    nicknameBtn.click(function () { 
      setEnable(nicknameInput);
      modifyBtnClickEvent(nicknameBtn); 
      nicknameInput.focus();
      nicknameInput.select();
    });
  
    pwdBtn.click(function() {
      setEnable(passwordInput);
      modifyBtnClickEvent(pwdBtn); 
      passwordInput.focus();
    });
  
    discardBtn.click(function() {
      setDisable(discardBtn);
      setDisable(submitBtn);
      nicknameInput.val(nickNameInputValue);
      modifyBtnGroup.each(function() {
        setModifyBtnStatus($(this), "unclicked");
      });
      profileInputGroup.each(function() {
        setDisable($(this));
      });
      window.getSelection().empty();
    });
  
    submitBtn.click(function(){
      setDisable(submitBtn);
      setDisable(discardBtn);
      modifyBtnGroup.each(function() {
        setModifyBtnStatus($(this), "unclicked");
      });
      profileInputGroup.each(function() {
        setDisable($(this));
      });
      window.getSelection().empty();
    });
  
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
  