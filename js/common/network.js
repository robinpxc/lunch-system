function ajaxCall(url, data, successFun, errMsg) {
  $.ajax({
    type: "post",
    url: url,
    data: data,
    dataType: "json",
    async: false,
    success: function (response) {
      successFun();
    },
    error: function (errorMsg) {
      alert(errMsg);
    }
  });
}