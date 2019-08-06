$(document).ready(function () {
  showHideExtraCols();

  $('.del-btn').on('click', function () {
    var userId = $(this).parent().find("input").val();
    $.confirm({
      title: "用户删除确认",
      content: '确认从数据库中删除该用户吗？',
      buttons: {
        confirm: {
          btnClass: "btn-danger",
          text: "确认删除",
          keys: ["enter"],
          action: function () {
            var delUrl = "delete_user.php?user_id=" + userId;
            window.location.href = delUrl;
          }
        },
        cancel: {
          btnClass: "btn-primary",
          text: "取消",
          keys: ["esc"],
        }
      }
    });
  });

  $(window).resize(function () {
    showHideExtraCols();
  });

  $("#create-new-user-btn").click(function (e) {
    addUser();
  });
});

// Function to show/hide extra table contents
function showHideExtraCols() {
  var roleInfo = $(".role-info");
  var workgroupInfo = $(".workgroup-info");
  var nickNameInfo = $(".nickname-info");

  if (getWindowWidth() >= 768 && roleInfo.hasClass("hide")) {
    roleInfo.removeClass("hide");
    workgroupInfo.removeClass("hide");
    nickNameInfo.removeClass("hide");
  } else if (getWindowWidth() < 768 && !roleInfo.hasClass("hide")) {
    roleInfo.addClass("hide");
    workgroupInfo.addClass("hide");
    nickNameInfo.addClass("hide");
  }
}

// Function to add a new user 
function addUser() {
  var username = $("#new-fullname").val();
  var userNickName = $("#new-nickname").val();
  var password = $("#new-user-password-edit").val();
  var role = $("#new-user-role option:selected").val();
  var workgroup = $("#new-user-group option:selected").val();
  $.ajax({
    type: "post",
    url: "../php/add_user.php",
    data: {
      "username": username,
      "nickname": userNickName,
      "password": password,
      "role": role,
      "workgroup": workgroup
    },
    dataType: "json",
    success: function (response) {
      switch(response) {
        case 1:
          break;
        case 2:
          break;
      }
    }
  });
}