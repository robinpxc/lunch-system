// Jquery confirm related functions
function jqAlert(title, content) {
  $.alert({
    title: title,
    content: content,
    icon:"fa fa-exclamation-triangle",
    buttons: {
      confirm: {
        btnClass: "btn-danger",
        text: "确认"
      }
    }
  });
}

function jqConfirm(title, content, iconType, confirmText, confirmFunction) {
  jqCommonConfirmDialog(title, content, icon, confirmText, confirmFunction(), false);
}

function jqCommonConfirmDialog(title, content, iconType, confirmText, confirmFunction, backgroundDismiss) {
  let icon;
  switch (iconType) {
    case "alert":
      icon = "fa fa-exclamation-triangle";
      break;
    case "info":
      icon = "fa fa-info-circle";
      break;
    case "warning":
      icon = "fa fa-exclamation-triangle";
    default:
      icon = "";
  }

  $.confirm({
    title:title,
    content: content,
    icon: icon,
    theme: "white",
    animation: "top",
    buttons: {
      confirm: {
        text: confirmText,
        keys: ["enter"],
        action: function() {
          confirmFunction();
        }
      },
      cancel: {
        text: "取消"
      }
    },
    backgroundDismiss: backgroundDismiss
  });
}
