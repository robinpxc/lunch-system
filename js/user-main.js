$(document).ready(function () {
  removeAdminCard();

  $("#user-manage-btn").click(function() {
    window.location.href = "admin-user-management.php";
  });

  $("#menu-manage-btn").click(function() {
    window.location.href = "admin-menu-management.php";
  });
});

function removeAdminCard() {
  var userRole = $("#user-role-input").val();
  if (userRole === "user") {
    $("#admin-card").remove();
  }
}