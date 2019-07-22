$(document).ready(function () {
  removeAdminCard();
});

function removeAdminCard() {
  var userRole = $("#user-role-input").val();
  if (userRole === "user") {
    $("#admin-card").remove();
  }
}