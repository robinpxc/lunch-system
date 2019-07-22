$(document).ready(function () {
  removeAdminCard();

  $("#user-manage-btn").click(function() {
    window.location.href = "admin_user_management.php";
  });
});

function removeAdminCard() {
  var userRole = $("#user-role-input").val();
  if (userRole === "user") {
    $("#admin-card").remove();
  }
}