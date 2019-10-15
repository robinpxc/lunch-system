$(document).ready(function () {
  var dateSelected = $("#date-selected").val();
  if(dateSelected == null || dateSelected == undefined || dateSelected == '') {
    dateSelected = getDateToday();
  }
  checkMenuStatus(dateSelected);
  setInputTextChangeListener(dateSelected);
  setClearBtnOnClickListener();
});

// Function to check menu status based on user selected date
function checkMenuStatus(dateSelected) {
  $.ajax({
    type: "post",
    url: "../php/functions/check-menu-status.php",
    data: {
      "selected-date": dateSelected
    },
    dataType: "json",
    success: function (response) {
      var menuStatus = $("#menu-status");
      menuStatus.val(response);
      showMenuUI(menuStatus.val());
      if(menuStatus.val() === "menu-exist") {
        fetchMenu(dateSelected);
      }
    },
    error: function (errorMsg) {
      alert("Ajax菜单状态检查错误，请刷新页面或者切换网络环境，或联系开发者");
      $(".menu-title").html(errorMsg.responseText);
    }
  });
}

// Set operation when user typing in inputs
function setInputTextChangeListener(dateSelected) {
  $(".combo-content").each(function () {
    $(this).bind('input propertychange', function () {
      if (isRequiredFieldFinished()) {
        setEnable($("#btn-update-menu"));
        setUpdateBtnClickListener(dateSelected);
      } else {
        setDisable($("#btn-update-menu"));
      }

      if (!isFiledEmpty()) {
        setEnable($("#btn-clear-menu"));
      } else {
        setDisable($("#btn-clear-menu"));
      }
    });
  });
}

// Judge if all required input has been filled
function isRequiredFieldFinished() {
  var isInputFinished = true;
  $(".combo-content").each(function () {
    if ($(this).val() === "") {
      isInputFinished = false;
    }
  });
  return isInputFinished;
}

// To judge if at least one field is not empty
function isFiledEmpty() {
  var isFiledEmpty = true;
  $(".combo-content").each(function () {
    if ($(this).val() != "") {
      isFiledEmpty = false;
    }
  });
  return isFiledEmpty;
}

// Set clear button function 
function setClearBtnOnClickListener() {
  $("#btn-clear-menu").click(function () {
    $(".combo-content").each(function () {
      $(this).val("");
    });

    if (isFiledEmpty) {
      setDisable($("#btn-update-menu"));
      setDisable($("#btn-clear-menu"));
    }
  });
}

// Set modify button click function
function setModifyButtonClickListener() {
  $("#btn-modify-menu").click(function () {
    hideElement($(this));
    unhideElement($(".operation-btn-group"));
    unhideElement($(".menu-modify-btn-group"));

    setMenuEditable(true);
    $(".menu-title").text("修改中...请注意保存");
    $(".menu-title").css("color", "#FFC107");
  });
}

// Set update button click listener
function setUpdateBtnClickListener(date) {
  var menuArray = new Array();
  $("#btn-update-menu").click(function() {
    for(var i = 0; i < 7; i++) {
      for(var j = 0; j < 3; j++) {
        var foodId = "#" + "food" + "-" + "0" + (i + 1) + "-" + "0" + (j + 1); 
        menuArray[i] = $(foodId).val(); 
      }
    }
    updateMenu(menuArray, date);
  });
}

// Function to show menu based on menu status
function showMenuUI(menuStatus) {
  var modifyBtn = $("#btn-modify-menu");
  var operationBtnGroup = $(".menu-update-btn-group");
  setMenuTitle(menuStatus);
  menuStatus === "no-menu" ? addNewClass(modifyBtn, "hide") : removeOldClass(modifyBtn, "hide");
  menuStatus === "no-menu" ? removeOldClass(operationBtnGroup, "hide") : addNewClass(operationBtnGroup, "hide");
  if (menuStatus === "menu-exist") {
    setModifyButtonClickListener();
  }
  setMenuEditable(menuStatus === "no-menu" ? true : false);
}

// Function to set menu title span based on menu status
function setMenuTitle(menuStatus) {
  var menuTitle = $(".menu-title");
  menuTitle.text(menuStatus === "no-menu" ? "尚未创建菜单，添加内容并创建新菜单" : "已创建菜单，点击黄色按钮修改菜单");
  menuTitle.css("font-weight", "bold");
  menuTitle.css("color", menuStatus === "no-menu" ? "red" : "green");
}

// Function to set menu editable based on menu status.
function setMenuEditable(willEditable) {
  $(".combo-content").each(function () {
    willEditable === false ? setDisable($(this)) : setEnable($(this));
  });
}

// Function to fetch menu from server
function fetchMenu(date) {
  $.ajax({
    type: "POST",
    url: "../php/functions/fetch-menu.php",
    data: {
      'date': date
    },
    dataType: "json",
    success: function (response) {
      var menuArray = decodeUnicode(response).split(',');

      for(var i = 0; i < 7; i++) {
        for(var j = 0; j < 3; j++) {
          var foodId = "#" + "food" + "-" + "0" + (i + 1) + "-" + "0" + (j + 1); 
          $(foodId).val(menuArray[i]);
        }
      }
    },
    error: function (errorMsg) {
      alert("Ajax获取菜单数据错误，请刷新页面或者切换网络环境。多次重试无效请联系开发者");
      $(".menu-title").html(errorMsg.responseText);
      //alert(errorMsg.responseText);
    }
  });
}

// Function to create / update menu
function updateMenu(menuList, date) {
  $.ajax({
    type: "POST",
    url: "../php/functions/update-menu.php",
    data: {
      'date': date,
      'menu-list': JSON.stringify(menuList)
    },
    dataType: "json",
    success: function (response) {
      alert(response);
      location.reload();
    },
    error: function (errorMsg) {
      alert("Ajax菜单创建/更新错误，请刷新页面或者切换网络环境。多次重试无效请联系开发者");
      $(".menu-title").html(errorMsg.responseText);
    }
  });
}

// Function to delete menu
function deleteMenu(date) {

}

