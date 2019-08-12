$(document).ready(function () {
  // variables
  var buttonGroup = $(".modify-btn");

  // User role select
  var userRoleSelect = $("#user-role");
  var userRoleValue = $("#user-role-value").val();

  // User workgroup select
  var userWorkgroupSelect = $("#user-workgroup");
  var userWorkgroupValue = $("#user-workgroup-value").val();

  userRoleSelect.val(userRoleValue);
  userWorkgroupSelect.val(userWorkgroupValue);
  modifyButtonClickEvent(buttonGroup);


});

// Function to handle all modify button click events
function modifyButtonClickEvent(btnGroup) {
  btnGroup.each(function () {
    var self = $(this);
    var btnId = self.attr("id");
    self.click(function () {
      switch (btnId) {
        case "id-edit-btn":
          break;
        case "fullname-edit-btn":
          break;
        case "role-edit-btn":
          break;
        case "workgroup-edit-btn":
          break;
        case "nickname-edit-btn":
          break;
        case "password-edit-btn":
          break;
      }
    });
  });
}