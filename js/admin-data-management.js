$(document).ready(function() {
  let yearArray = fetchExistYear(false);

  initUI();
  setCustomYearSelect();
  setSelectChangeEvent();
  setCardClickEvent();

  function initUI() {
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
      $.cookie("monthly-statistics-year", getCurrentYear());
      $.cookie("monthly-statistics-month", getLastMonth());
      window.location.href = "admin-monthly-statistic.php";
    });

    $("#custom-monthly-statistics").click(function(){
      $.cookie("monthly-statistics-year", $("#m-year-select option:selected").val());
      $.cookie("monthly-statistics-month", $("#m-month-select option:selected").val());
      window.location.href = "admin-monthly-statistic.php";
    });
  }

  function setCustomYearSelect() {
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
    let selectedElement = "";
    if(type == "daily") {
      monthArray = fetchExistMonth($("#d-year-select option:selected").val(), false);
      selectedElement = "#d-month-select";
    } else if(type == "monthly") {
      monthArray = fetchExistMonth($("#m-year-select option:selected").val(), false);
      selectedElement = "#m-month-select";
    }
    $(selectedElement).empty();
    for(let i = 0; i < monthArray.length; i++) {
     $(selectedElement).append("<option class='month-option-" + i + "'>");
     $(selectedElement + " .month-option-" + i).text(monthArray[i]);
    }
    if(type == "daily") {
      setCustomDaySelect();
    }
  }

  function setCustomDaySelect() {
    let selectedElement = "#d-day-select";
    $(selectedElement).empty();
    let dayArray = fetchExistDays($("#d-year-select option:selected").val(), $("#d-month-select option:selected").val(), false);
    for(let i = 0; i < dayArray.length; i++) {
      $(selectedElement).append("<option class='day-option-" + i + "'>");
      $(".day-option-" + i).text(dayArray[i]);
    }
  }

  function setSelectChangeEvent() {
    $("#d-year-select").change(function() {
      setCustomMonthSelect("daily");
    });

    $("#m-year-select").change(function() {
      setCustomMonthSelect("monthly");
    });
  }

  function getLastMonth() {
    return new Date().getMonth();
  }
});