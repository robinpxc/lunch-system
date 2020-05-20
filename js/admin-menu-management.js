$(document).ready(function () {
  let backupArray = new Array();
  loadCalendar();
  initTableForm();
  let currentDateButton = $(".currentDate[title='" + $.cookie(CONSTANTS.COOKIE.MENU.KEY_SELECTED_DATE) + "']");
  addNewClass(currentDateButton, "selected-style");

  // Function to load calendar
  function loadCalendar() {
    let savedDate = $.cookie(CONSTANTS.COOKIE.MENU.KEY_SELECTED_DATE);
    let initDate = (savedDate == null || savedDate == undefined || savedDate == '') ? getDateToday() : savedDate;

    initEditArea(initDate);

    new Schedule({
      el: '#schedule-box',
      clickCb: function (y, m, d) {
        if (document.getElementById("date-value")) {
          let clickedDate = formatDate(y, m, d);
          $.cookie(CONSTANTS.COOKIE.MENU.KEY_SELECTED_DATE, clickedDate);
          window.location.reload();
        }
      }
    });
  }

  function initTableForm() {
    let form = $(".group-input");
    for (let i = 1; i <= CONSTANTS.MENU.COUNT; i++) {
      form.append("<div class='form-row combo-container combo-container-" + i + "'>");
      let combo = $(".combo-container-" + i);
      combo.append("<div class='col-md-2 mb-3 combo-head-" + i + "'>");
      $(".combo-head-" + i).append("<input type='text' class='form-control menu-label' value='套餐【" + i + "】' disabled='disabled'>");
      combo.append("<div class='form-row col-md-10 combo-" + i + "'>");

      for (let j = 1; j <= CONSTANTS.MENU.SUB_COUNT; j++) {
        $(".combo-" + i).append("<div class='col-md-4 mb-3 combo-item-" + j + "'>");
        $(".combo-" + i + " .combo-item-" + j).append("<input type='text' class='form-control combo-content' id='food-" + i + "-" + j + "' placeholder='" + j + "号菜' required>");
      }
    }
  }

  function initEditArea(initDate) {
    let dateSelected = initDate;
    let menuStatus;
    if (dateSelected == null || dateSelected == undefined || dateSelected == '') {
      dateSelected = getDateToday();
    }

    checkMenuStatus(dateSelected).done(function (status) {
      menuStatus = status;
      configMenu(menuStatus);
      setInputTextChangeListener();
      setClearBtnOnClickListener();
      setDiscardButtonClickListener();
      setUpdateBtnClickListener();
    })

    // Judge if all required input has been filled
    function isRequiredFieldFinished() {
      let isInputFinished = true;
      $(".combo-content").each(function () {
        if ($(this).val() === "") {
          isInputFinished = false;
        }
      });
      return isInputFinished;
    }

    // To judge if at least one field is not empty
    function isFiledEmpty() {
      let isFiledEmpty = true;
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
      let updateBtnGroup = $(".menu-update-btn-group");
      let modifyBtnGroup = $(".menu-modify-btn-group");
      let delBtn = $("#btn-delete-menu");

      setMenuTitle();
      $("#btn-update-menu").text(menuStatus == "no-menu" ? "创建菜单" : "更新菜单");
      menuStatus == "no-menu" ? hideElement(modifyBtnGroup) : unhideElement(modifyBtnGroup);
      menuStatus == "no-menu" ? unhideElement(updateBtnGroup) : hideElement(updateBtnGroup);
      menuStatus == "no-menu" ? setDisable(delBtn) : setEnable(delBtn);
    }

    // Function to init menu functions
    function initMenuFunction() {
      if (menuStatus == "menu-exist") {
        fetchMenu(dateSelected).done(function (menuArray) {
          backupArray = menuArray;
          setMenuData(menuArray);
          setModifyButtonClickListener();
          setDeleteBtnClickListener(dateSelected);
          setMenuEditable(menuStatus === "no-menu" ? true : false);
        });
      }
    }

    // Function to clear menu
    function clearMenu() {
      $(".combo-content").each(function () {
        $(this).val("");
      });
    }

    // Function to set menu title span based on menu status
    function setMenuTitle() {
      let menuTitle = $(".menu-title");
      menuTitle.text(menuStatus === CONSTANTS.MENU.STATUS.NO_MENU ? "尚未创建菜单，添加内容并创建新菜单" : "已创建菜单，点击黄色按钮修改菜单");
      menuTitle.css("font-weight", "bold");
      menuTitle.css("color", menuStatus === "no-menu" ? "#BD2130" : "green");
      setStatusBar();
    }

    function setStatusBar() {
      if(menuStatus == CONSTANTS.MENU.STATUS.EXIST) {
        removeOldClass($(".menu-status-bar"), "alert-danger");
        removeOldClass($(".menu-status-bar"), "alert-warning");
        addNewClass($(".menu-status-bar"), "alert-success");
        unhideElement($(".menu-exist-icon"));
        hideElement($(".no-menu-icon"));
        hideElement($(".menu-modify-icon"));
      } else {
        removeOldClass($(".menu-status-bar"), "alert-warning");
        removeOldClass($(".menu-status-bar"), "alert-success");
        addNewClass($(".menu-status-bar"), "alert-danger");
        unhideElement($(".no-menu-icon"));
        hideElement($(".menu-modify-icon"));
        hideElement($(".menu-exist-icon"));
      }
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
        removeOldClass($(".menu-status-bar"), "alert-success");
        removeOldClass($(".menu-status-bar"), "alert-dnager");
        addNewClass($(".menu-status-bar"), "alert-warning");
        unhideElement($(".menu-modify-icon"));
        hideElement($(".menu-exist-icon"));
        hideElement($(".no-menu-icon"));
      });
    }

    // Set update button click listener
    function setUpdateBtnClickListener() {
      let menuArray = new Array(CONSTANTS.MENU.COUNT);
      $("#btn-update-menu").click(function () {
        for (let i = 0; i < CONSTANTS.MENU.COUNT; i++) {
          menuArray[i] = new Array(CONSTANTS.MENU.SUB_COUNT);
          for (let j = 0; j < CONSTANTS.MENU.SUB_COUNT; j++) {
            let foodId = "#" + "food" + "-" + (i + 1) + "-" + (j + 1);
            menuArray[i][j] = $(foodId).val();
          }
        }
        updateMenu(menuArray, dateSelected).done(function (response) {
          if (response) {
            jqueryInfo("修改成功", (menuStatus == CONSTANTS.MENU.STATUS.EXIST ? "成功修改菜单!" : "成功创建菜单!"), false, false, function () {
              menuArray = null;
              refresh();
            });
          }
        });
      });
    }

    // Function to set delete button click listener
    function setDeleteBtnClickListener(date) {
      $("#btn-delete-menu").click(function () {
        let selectedDate = new Date($.cookie(CONSTANTS.COOKIE.MENU.KEY_SELECTED_DATE));
        let selectedDateCN = selectedDate.getFullYear() + "年" + (Number(selectedDate.getMonth()) + 1) + "月" + selectedDate.getDate() + "日" + " " + getWeekDayCN(selectedDate.getDay());
        jqConfirm("删除确认", "确定要删除" + "【" + selectedDateCN + "】" + "的菜单吗?", function () {
          deleteMenu(date).done(function(success) {
            if(success) {
              jqInfo("删除成功", "已成功删除菜单", function() {
                refresh();
              });
            } else {
              jqAlert("删除失败", "未成功删除菜单，请重试!");
            }
          });
        });
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
        initMenuUI();
        setMenuData(backupArray);
        hideAndDisableElement($(this));
        unhideAndEnableElement($("#btn-modify-menu"));

        // Change delete button style and size
        removeOldClass($("#btn-delete-menu"), "col-md-12");
        addNewClass($("#btn-delete-menu"), "col-md-6");
        setStatusBar();
      });
    }

    // -------------------------- Menu operation functions ------------------------
    // Function to set menu data
    function setMenuData(menuArray) {
      for (let i = 0; i < CONSTANTS.MENU.COUNT; i++) {
        for (let j = 0; j < CONSTANTS.MENU.SUB_COUNT; j++) {
          let foodId = "#" + "food" + "-" + (i + 1) + "-" + (j + 1);
          if (menuArray[i][j] == null) {
            menuArray[i][j] = "";
          }
          $(foodId).val(decodeUnicode(menuArray[i][j]).split(','));
        }
      }
    }
  }
});