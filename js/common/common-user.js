function deleteUser(userId) {
  let deferred = $.Deferred();
  $.ajax({
    type: "post",
    url: "../php/functions/delete-user.php",
    data: {
      "userId": userId
    },
    dataType: "json",
    beforeSend: function() {
      addSpinner();
    },
    success: function (response) {
      deferred.resolve(response);
    },
    error: function (errorMsg) {
      alert("用户删除失败，请刷新页面或者切换网络环境，或联系开发者");
    },
    complete: function() {
      removeSpinner();
    }
  });
  return deferred.promise();
}