$(document).ready(function() {
  let userRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
  let userGroup = $.cookie(CONSTANTS.COOKIE.USER.KEY_GROUP);

  initUI();
  fetchExistYear().done(function(yearArray) {
    setCustomYearSelect(yearArray);
    setSelectChangeEvent();
    setCardClickEvent();
  });

  function initUI() {
    addAdminHighlight($(".admin-item-data"));
    $("#date-today").text(getDateTodayCN(true));
    $("#date-tomorrow").text(getDateTomorrowCN(true));
    $("#last-month").text((getLastMonth() >= 10) ? toString(getLastMonth()) : ("0" + getLastMonth()));
  }

  function setCardClickEvent() {
    $("#daily-statistics").click(function() {
      if(hasHighPermission(userRole)) {
        selectDataRange(function(){
          $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_GROUP);
          jumpToDailyStatistic(getDateToday());
        }, function() {
          $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_ALL);
          jumpToDailyStatistic(getDateToday());
        });
      } else {
        $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_GROUP);
        jumpToDailyStatistic(getDateToday());
      }
    });

    $("#tomorrow-statistics").click(function() {
      if(hasHighPermission(userRole)) {
        selectDataRange(function(){
          $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_GROUP);
          jumpToDailyStatistic(getDateTomorrow());
        }, function() {
          $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_ALL);
          jumpToDailyStatistic(getDateTomorrow());
        });
      } else {
        jumpToDailyStatistic(getDateTomorrow());
      }
    });

    $("#custom-daily-statistics").click(function(){
      let selectedYear = $("#d-year-select option:selected").val();
      let selectMonth = $("#d-month-select option:selected").val();
      let selectDay = $("#d-day-select option:selected").val();
      selectMonth = selectMonth.length == 1 ? "0" + selectMonth : selectMonth;
      selectDay = selectDay.length == 1 ? "0" + selectDay : selectDay;
      let selectedDate = selectedYear + "-" + selectMonth + "-" + selectDay;

      if(hasHighPermission(userRole)) {
        selectDataRange(function(){
          $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_GROUP);
          jumpToDailyStatistic(selectedDate);
        }, function() {
          $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_ALL);
          jumpToDailyStatistic(selectedDate);
        });
      } else {
        jumpToDailyStatistic(selectedDate);
      }
    });

    $("#monthly-statistics").click(function() {
      if(hasHighPermission(userRole)) {
        selectDataRange(function(){
          $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_GROUP);
          jumpToMonthlyStatistic(getCurrentYear(), getLastMonth());
        }, function() {
          $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_ALL);
          jumpToMonthlyStatistic(getCurrentYear(), getLastMonth());
        });
      } else {
        jumpToMonthlyStatistic(getCurrentYear(), getLastMonth());
      }
    });

    $("#custom-monthly-statistics").click(function() {
      if(hasHighPermission(userRole)) {
        selectDataRange(function(){
          $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_GROUP);
          jumpToMonthlyStatistic($("#m-year-select option:selected").val(), $("#m-month-select option:selected").val());
        }, function() {
          $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATA_RANGE, CONSTANTS.STATISTICS.RANGE_ALL);
          jumpToMonthlyStatistic($("#m-year-select option:selected").val(), $("#m-month-select option:selected").val());
        });
      } else {
        jumpToMonthlyStatistic($("#m-year-select option:selected").val(), $("#m-month-select option:selected").val());
      }
    });
  }

  function jumpToDailyStatistic(date) {
    $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATE, date);
    window.location.href = "admin-daily-statistic.php";
  }

  function jumpToMonthlyStatistic(year, month) {
    $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_YEAR, year);
    $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_MONTH, month);
    window.location.href = "admin-monthly-statistic.php";
  }

  function setCustomYearSelect(yearArray) {
    if(yearArray.length != 0) {
      for(let i = 0; i < yearArray.length; i++) {
        $(".year-select").append("<option class='year-option-" + i + "'>");
        $(".year-option-" + i).text(yearArray[i]);
      }
      setCustomMonthSelect("daily");
      setCustomMonthSelect("monthly");
    }
  }

  function setCustomMonthSelect(type) {
    let monthArray = new Array();
    let selectedElement;
    if(type == "daily") {
      fetchExistMonth($("#d-year-select option:selected").val()).done(function(existMonths) {
        setMonthList($("#d-month-select"), existMonths);
        setCustomDaySelect();
      });

    } else if(type == "monthly") {
      fetchExistMonth($("#d-year-select option:selected").val()).done(function(existMonths) {
        monthArray = existMonths;
        setMonthList($("#m-month-select"), monthArray);
      });
    }
  }

  function setMonthList(element, existMonths) {
    element.empty();
    for(let i = 0; i < existMonths.length; i++) {
      element.append("<option class='month-option-" + i + "'>");
      $("#" + element.attr("id") + " .month-option-" + i).text(existMonths[i]);
    }
  }

  function setCustomDaySelect() {
    let selectedElement = $("#d-day-select");
    let selectYear = $("#d-year-select option:selected").val();
    let selectMonth = $("#d-month-select option:selected").val();
    selectedElement.empty();
    fetchExistDays(selectYear, selectMonth).done(function(existDays) {
      for(let i = 0; i < existDays.length; i++) {
        selectedElement.append("<option class='day-option-" + i + "'>");
        $(".day-option-" + i).text(existDays[i]);
      }
    });
  }

  function setSelectChangeEvent() {
    $("#d-year-select").change(function() {
      setCustomMonthSelect("daily");
    });

    $("#m-year-select").change(function() {
      setCustomMonthSelect("monthly");
    });

    $("#d-month-select").change(function() {
      setCustomDaySelect();
    });
  }

  function selectDataRange(func1, func2) {
    if(hasHighPermission(userRole)) {
      jqDialog("数据选择", "请选择要查看的数据", "本部门数据统计", "所有部门数据统计", function() {
        func1();
      }, function() {
        func2();
      });
    }
  }
});