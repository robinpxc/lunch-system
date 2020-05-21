// Jquery confirm related functions

function confirm(title, content, icon, type, draggable, closeIcon, backgroundDismiss, autoClose, actionButtons) {
  $.confirm({
    title: title,
    content: content,
    icon: icon,
    type: type,
    draggable: draggable,
    closeIcon: closeIcon,
    backgroundDismiss: backgroundDismiss,
    backgroundDismissAnimation: 'glow',
    autoClose: autoClose,
    buttons: actionButtons
  });
}

function jqAlert(title, content) {
  let confirmBtn = {
    confirm: {
      text: '确认',
      btnClass: 'btn-red',
      action: function() {
        refresh();
      }
    }
  };
  confirm(title, content, 'fa fa-exclamation-triangle', false, false, false, false, false, confirmBtn);
}

function jqInfo(title, content, func) {
  jqueryInfo(title, content, true, 'confirm|3000', func);
}

function jqueryInfo(title, content, backgroundDismiss, autoClose, func) {
  let actionBtn = {
    confirm: {
      text: '确认',
      btnClass: 'btn-blue',
      action: function() {
        func();
      }
    }
  };
  confirm(title, content, 'fa fa-info-circle','blue', false, true, backgroundDismiss, autoClose, actionBtn);
}

function jqWarning(title, content, func) {
  let actionBtn = {
    confirm: {
      text: '确认',
      btnClass: 'btn-orange',
      action: function() {
        func();
      }
    },
    cancel: {
      text: '取消',
      btnClass: 'btn-default'
    }
  };
  confirm(title, content, 'fa fa-info-circle','orange', false, true, true, 'confirm|10000', actionBtn);
}

function jqConfirm(title, content, confirmFunction) {
  let actionBtns = {
    confirm: {
      text: '确认',
      btnClass: 'btn-red',
      action: function() {
        confirmFunction()
      }
    },
    cancel: {
      text: '取消',
      keys: ['enter']
    }
  }

  confirm(title, content, 'fa fa-warning', 'red', false,false, true, false, actionBtns);
}

function jqDialog(title, content, btnText1, btnText2, func1, func2) {
  let actionBtns = {
    today: {
      text: btnText1,
      btnClass: 'btn-purple',
      action: function() {
        func1();
      }
    },
    tomorrow: {
      text: btnText2,
      btnClass: 'btn-green',
      action: function() {
        func2();
      }
    }
  }
  confirm(title, content, 'fa fa-warning', 'red', false, true, true, false, actionBtns);
}
