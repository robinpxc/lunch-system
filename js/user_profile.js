$(document).ready(function () {
  setPermissionText();

  $(window).resize(function () {
    setPermissionText();
  });
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