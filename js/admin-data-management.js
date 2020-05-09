$(document).ready(function() {
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
      $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATE, getDateToday());
      window.location.href = "admin-daily-statistic.php";
    });

    $("#tomorrow-statistics").click(function() {
      $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATE, getDateTomorrow());
      window.location.href = "admin-daily-statistic.php";
    });

    $("#custom-daily-statistics").click(function(){
      let selectedYear = $("#d-year-select option:selected").val();
      let selectMonth = $("#d-month-select option:selected").val();
      let selectDay = $("#d-day-select option:selected").val();
      selectMonth = selectMonth.length == 1 ? "0" + selectMonth : selectMonth;
      selectDay = selectDay.length == 1 ? "0" + selectDay : selectDay;
      let selectedDate = selectedYear + "-" + selectMonth + "-" + selectDay;
      $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_DATE, selectedDate);
      window.location.href = "admin-daily-statistic.php";
    });

    $("#monthly-statistics").click(function() {
      $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_YEAR, getCurrentYear());
      $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_MONTH, getLastMonth());
      window.location.href = "admin-monthly-statistic.php";
    });

    $("#custom-monthly-statistics").click(function(){
      $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_YEAR, $("#m-year-select option:selected").val());
      $.cookie(CONSTANTS.COOKIE.STATISTICS.KEY_MONTH, $("#m-month-select option:selected").val());
      window.location.href = "admin-monthly-statistic.php";
    });
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

  function getLastMonth() {
    return new Date().getMonth();
  }
});