// Jquery confirm related functions
function jqAlert(title, content) {
  $.alert({
    title: title,
    content: content,
    icon:"fa fa-exclamation-triangle",
    animation: "top",
    buttons: {
      confirm: {
        btnClass: "btn-danger",
        text: "确认",
        action: function() {
          window.location.reload();
        }
      }
    }
  });
}

function jqInfo(title, content, fun) {
  $.confirm({
    title: title,
    content: content,
    icon:"fa fa-info-circle",
    animation: "top",
    buttons: {
      confirm: {
        btnClass: "btn-primary",
        text: "确认",
        action: function() {
          fun();
        }
      }
    }
  });
}

function jqConfirm(title, content, confirmFunction) {
  $.confirm({
    title:title,
    content: content,
    icon: "fa fa-exclamation-triangle",
    animation: "top",
    buttons: {
      confirm: {
        text: "确认",
        btnClass: "btn-danger",
        keys: ["enter"],
        action: function() {
          confirmFunction();
        }
      },
      cancel: {
        text: "取消"
      }
    }
  });
}
