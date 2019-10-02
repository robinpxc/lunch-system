$(document).ready(function () {
  checkMenuStatus(getDateToday());
  setInputTextChangeListener();
  setClearBtnOnClickListener();
});

// Function to check menu status based on user selected date
function checkMenuStatus(selectedDate) {
  $.ajax({
    type: "post",
    url: "../php/functions/check-menu-status.php",
    data: {
      "selected-date": selectedDate
    },
    dataType: "json",
    success: function (response) {
      var menuStatus = $("#menu-status");
      menuStatus.val(response);
      showMenu(menuStatus.val());
    },
    error: function (errorMsg) {
      alert("Ajax错误，请刷新页面或者切换网络环。多次重试无效请联系开发者");
    }
  });
}

// Set operation when user typing in inputs
function setInputTextChangeListener() {
  $(".combo-content").each(function () {
    $(this).bind('input propertychange', function () {
      if (isRequiredFieldFinished()) {
        setEnable($("#btn-update-menu"));
        setUpdateBtnClickListener();
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

// Judge if all requred input has been filled
function isRequiredFieldFinished() {
  var isInputFinished = true;
  $(".combo-content").each(function () {
    if ($(this).val() === "") {
      isInputFinished = false;
    }
  });
  return isInputFinished;
}

// TO judge if at least one field is not empty
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

// Set modify button click funtion
function setModifyButtonClickListener() {
  $("#btn-modify-menu").click(function () {
    hideElement($(this));
    unhideElement($(".menu-update-btn-group"));
    setMenuEditable(true);
    $(".menu-title").text("修改中...记得保存");
    $(".menu-title").css("color", "#FFC107");
  });
}

// Set update button click listener
function setUpdateBtnClickListener() {
  var menuArray = new Array();
  $("#btn-update-menu").click(function() {
    for(var i = 0; i < 7; i++) {
      menuArray[i] = new Array();
      for(var j = 0; j < 3; j++) {
        var foodId = "#" + "food" + "-" + "0" + (i + 1) + "-" + "0" + (j + 1); 
        menuArray[i][j] = $(foodId).val(); 
        alert(menuArray[i][j]);
      }
    }
  });
 
}

// Function to show menu based on menu status
function showMenu(menuStatus) {
  var modifyBtn = $("#btn-modify-menu");
  var operationBtnGroup = $(".menu-create-btn-group");
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