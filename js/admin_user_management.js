$(document).ready(function () {
  showHideExtraCols();

  $('.del-btn').on('click', function () {
    showConfirmDeleteDialog(this);
  });

  $(window).resize(function () {
    showHideExtraCols();
    adjustCreationFormSize();
  });

  $("#create-new-user-btn").click(function () {
    addUser();
  });

  $("#new-fullname, #new-nickname, #new-user-password-edit").bind('input propertychange', function () {
    enableCreateUserBtn();
  });

  $("form-control").on("click", function() {
    formControlBtnClick();
  });

  adjustCreationFormSize();

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
      alert(response);
      switch (response) {
        case 1:
          alert("添加用户" + username + "成功！");
          showAlert();
          break;
        case 2:
          // alert("昵称 " + userNickName + " 已经被他人使用了!");
          showAlert();
          break;
      }
    }
  });
}

// Function to show confirm dialog when deleting a user.
function showConfirmDeleteDialog(btn) {
  var userId = $(btn).parent().find("input").val();
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
}

// Function to show general alert
function showAlert() {
  $.alert({
    title: 'Alert!',
    content: 'Simple alert!',
    confirm: function(){
    }
});
}

// Function to enable submit button when all require filed has done.
function enableCreateUserBtn() {
  $fullname = $("#new-fullname").val();
  $nickname = $("#new-nickname").val();
  $password = $("#new-user-password-edit").val();
  $createUserBtn = $("#create-new-user-btn");

  if ($fullname != "" && $nickname != "" && $password != "") {
    setEnable($createUserBtn);
  } else {
    setDisable($createUserBtn);
  }
}

// Function to show/hide create user when screen width <= 768
function adjustCreationFormSize() {
  var formContent = $(".form-content");
  var extendContentBtn = $(".extend-content");
  var hideContentBtn = $(".hide-content");
  if (getWindowWidth() > 768) {
    removeOldClass(formContent, "hide");
    addNewClass(extendContentBtn, "hide");
    addNewClass(hideContentBtn, "hide");
  } else if (getWindowWidth() <= 768) {
    addNewClass(formContent, "hide");
    removeOldClass(extendContentBtn, "hide");
  }
}

// TODO: fix this function
function formControlBtnClick(button) {
  var formContent = $(".form-content");
  var extendBtn = $("#extend-btn");
  var hideBtn = $("#hide-btn");
  switch(button.attr("id")) {
    case "extend-btn":
      addNewClass(button, "hide");
      removeOldClass(hideBtn, "hide");
      break;
    case "hide-btn":
      addNewClass(formContent, "hide");
      addNewClass(button, "hide");
      removeOldClass(extendBtn, "hide");
      break;
  }
}