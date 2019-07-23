$(document).ready(function () {
  $('.del-btn').on('click', function () {
    var userId = $(this).parent().parent().find("input").val();
    console.log()
    $.confirm({
      title: "用户删除确认",
      content: '确认从数据库中删除该用户吗？',
      buttons: {
        confirm: {
          btnClass: "btn-danger",
          text: "确认删除",
          keys: ["enter"],
          action: function () {
            
            console.log(userId);
            var delUrl = "del_user.php?user_id=" + userId;
            alert(delUrl);
            window.location.href = url;
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

});