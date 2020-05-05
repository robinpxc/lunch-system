$(document).ready(function () {
  var backupArray = new Array();
  loadCalendar();
  var currentDateButton = $(".currentDate[title='" + $.cookie('selected-date') + "']");
  addNewClass(currentDateButton, "selected-style");

  // Function to load calendar
  function loadCalendar() {
    var savedDate = $.cookie('selected-date');
    var initDate = (savedDate == null || savedDate == undefined || savedDate == '') ? getDateToday() : savedDate;
    
    initEditArea(initDate);

    new Schedule({
      el: '#schedule-box',
      clickCb: function (y,m,d) {
        if(document.getElementById("date-value")) {
          var clickedDate = formatDate(y, m, d);
          $.cookie('selected-date',clickedDate);
          refresh();
        }
      }
    });
  }

  function initEditArea(initDate) {
    
    var dateSelected = initDate;
    var menuStatus;

    if (dateSelected == null || dateSelected == undefined || dateSelected == '') {
      dateSelected = getDateToday();
    }
  
    $(".combo-content").each(function () {
      $(this).focus(function () {
        dataBeforeEdit = $(this).val();
      });
    });
  
    checkMenuStatus();
    setInputTextChangeListener();
    setClearBtnOnClickListener();
    setDiscardButtonClickListener();

  // Function to check menu status based on user selected date
  function checkMenuStatus() {
    $.ajax({
      type: CONSTANTS.AJAX.TYPE.POST,
      url: "../php/functions/check-menu-status.php",
      data: {
        "selected-date": dateSelected
      },
      dataType: "json",
      success: function (response) {
        menuStatus = response;
        configMenu(menuStatus);
      },
      error: function (errorMsg) {
        alert("Ajax菜单状态检查错误，请刷新页面或者切换网络环境，或联系开发者");
        $(".menu-title").html(errorMsg.responseText);
      }
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

  // Function to show menu based on menu status
  function configMenu(menuStatus) {
    // UI part
    initMenuUI(menuStatus);

    // Function part
    initMenuFunction(menuStatus);
  }

  // Function to init menu UI
  function initMenuUI() {
    clearMenu();
    var updateBtnGroup = $(".menu-update-btn-group");
    var modifyBtnGroup = $(".menu-modify-btn-group");
    var delBtn = $("#btn-delete-menu");

    setMenuTitle();
    $("#btn-update-menu").text(menuStatus == "no-menu" ? "创建菜单" : "更新菜单");
    menuStatus == "no-menu" ? hideElement(modifyBtnGroup) : unhideElement(modifyBtnGroup);
    menuStatus == "no-menu" ? unhideElement(updateBtnGroup) : hideElement(updateBtnGroup);
    menuStatus == "no-menu" ? setDisable(delBtn) : setEnable(delBtn);
  }

  // Function to init menu functions
  function initMenuFunction() {
    if (menuStatus == "menu-exist") {
      fetchMenu(dateSelected);
      setModifyButtonClickListener();
      setDeleteBtnClickListener(dateSelected);
    }
    setMenuEditable(menuStatus === "no-menu" ? true : false);
  }

  // Function to clear menu
  function clearMenu() {
    $(".combo-content").each(function () {
      $(this).val("");
    });
  }

  // Function to set menu title span based on menu status
  function setMenuTitle() {
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

  // -------------------------- Event listeners ------------------------
  // Set clear button function 
  function setClearBtnOnClickListener() {
    $("#btn-clear-menu").click(function () {
      clearMenu();
      if (isFiledEmpty) {
        setDisable($("#btn-update-menu"));
        setDisable($("#btn-clear-menu"));
      }
    });
  }

  

  // Set modify button click function
  function setModifyButtonClickListener() {
    $("#btn-modify-menu").click(function () {
      unhideElement($(".menu-update-btn-group"));
      unhideAndEnableElement($("#btn-discard-menu"));
      setEnable($("#btn-clear-menu"));

      // Disable and hide modify button
      setDisable($(this));
      hideElement($(this));

      // Change delete button style and size
      removeOldClass($("#btn-delete-menu"), "col-md-6");
      addNewClass($("#btn-delete-menu"), "col-md-12");
      addNewClass($("#btn-delete-menu"), "left-radius");

      // Enable edit area
      setMenuEditable(true);

      // Change label text and color
      $(".menu-title").text("修改中...请注意保存");
      $(".menu-title").css("color", "#FFC107");
    });
  }

  // Set update button click listener
  function setUpdateBtnClickListener() {
    var menuArray = new Array(5);
    $("#btn-update-menu").click(function () {
      for (var i = 0; i < 5; i++) {
        menuArray[i] = new Array(3);
        for (var j = 0; j < 3; j++) {
          var foodId = "#" + "food" + "-" + "0" + (i + 1) + "-" + "0" + (j + 1);
          menuArray[i][j] = $(foodId).val();
        }
      }
      updateMenu(menuArray, dateSelected);
      menuArray = null;
      
    });
  }

  // Function to set delete button click listener
  function setDeleteBtnClickListener(date) {
    $("#btn-delete-menu").click(function () {
      deleteMenu(date);
    });
  }

  // Set operation when user typing in inputs
  function setInputTextChangeListener() {
    $(".combo-content").each(function () {
      $(this).bind('input propertychange', function () {
        // When all required input fields has been filled, then enable update menu button.
        if (isRequiredFieldFinished()) {
          setEnable($("#btn-update-menu"));
          setEnable($("#btn-discard-menu"));
          setUpdateBtnClickListener();
        } else {
          setDisable($("#btn-update-menu"));
        }

        // If any required field(s) has data, then enable clear menu button.
        if (!isFiledEmpty()) {
          setEnable($("#btn-clear-menu"));
        } else {
          setDisable($("#btn-clear-menu"));
        }
      });
    });
  }

  // Set discard button click listener
  function setDiscardButtonClickListener() {
    $("#btn-discard-menu").click(function () {
      setMenuData(backupArray);
      hideAndDisableElement($(this));
      unhideAndEnableElement($("#btn-modify-menu"));

      // Change delete button style and size
      removeOldClass($("#btn-delete-menu"), "col-md-12");
      addNewClass($("#btn-delete-menu"), "col-md-6");
      initMenuUI();
    });
  }

  // -------------------------- Menu operation functions ------------------------
  // Function to set menu data
  function setMenuData(menuArray) {
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 3; j++) {
        var foodId = "#" + "food" + "-" + "0" + (i + 1) + "-" + "0" + (j + 1);
        $(foodId).val(decodeUnicode(menuArray[i][j]).split(','));
      }
    }
  }

  // Function to fetch menu from server
  function fetchMenu(date) {
    $.ajax({
      type: CONSTANTS.AJAX.TYPE.POST,
      url: "../php/functions/fetch-menu.php",
      data: {
        'date': date
      },
      dataType: "json",
      timeout: 30000,
      success: function (response) {
        if (response != null) {
          var menuArray = response;
          backupArray = menuArray;
          setMenuData(menuArray);
        } else {
          alert("获取菜单失败，请重试！");
        }
      },
      error: function (errorMsg) {
        alert("Ajax获取菜单数据错误，请刷新页面或者切换网络环境，或联系开发者");
        $(".menu-title").html(errorMsg.responseText);
      }
    });
  }

  // Function to create / update menu
  function updateMenu(menuList, date) {
    $.ajax({
      type: CONSTANTS.AJAX.TYPE.POST,
      url: "../php/functions/update-menu.php",
      data: {
        'date': date,
        'menu-list': JSON.stringify(menuList)
      },
      dataType: "json",
      async: false,
      error: function (errorMsg) {
        alert("Ajax菜单创建/更新错误，请刷新页面或者切换网络环境，或联系开发者");
      },
      complete: function() {
        refresh();
      }
    });
  }

  // Function to delete menu
  function deleteMenu(date) {
    $.ajax({
      type: CONSTANTS.AJAX.TYPE.POST,
      url: '../php/functions/delete-menu.php',
      data: {
        'date': date
      },
      dataType: "JSON",
      success: function (response) {
        alert(response == true ? "菜单删除成功！" : "菜单删除失败，请重试");
        location.reload();
      },
      error: function (errorMsg) {
        alert("Ajax菜单删除错误，请刷新页面或者切换网络环境，或联系开发者");
      }
    });
  }
  }  
});