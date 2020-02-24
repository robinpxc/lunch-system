$(document).ready(function() {
  let yearArray = fetchExistYear(false);
  let dayArray = new Array();

  initUI();
  setCustomYearSelect();
  setCardClickEvent();

  function initUI() {
    $("#date-today").text(getDateTodayChinese(true));
    $("#last-month").text((getLastMonth() >= 10) ? toString(getLastMonth()) : ("0" + getLastMonth()));
  }

  function setCardClickEvent() {
    $("#daily-statistics").click(function() {
      $.cookie("daily-statistics-date", getDateToday());
      window.location.href = "admin-daily-statistic.php";
    });

    $("#monthly-statistics").click(function() {
      $.cookie("monthly-statistics-month", getLastMonth());
      window.location.href = "admin-monthly-statistic.php";
    });
  }

  function setCustomYearSelect() {
    for(let i = 0; i < yearArray.length; i++) {
      $(".year-select").append("<option class='year-option-" + i + "'>");
      $(".year-option-" + i).text(yearArray[i]);
    }
  }

  function setCustomMonthSelect(type) {
    let monthArray = new Array();
    let selectedElement= "";
    if(type == "daily") {
      monthArray = fetchExistMonth($("#daily-date-select").val(), false);
      selectdElement = ".daily-date-select .month-select";
    } else if(type == "monthly") {
      monthArray = fetchExistMonth($("#monthly-date-select").val(), false);
      selectdElement = ".monthly-date-select .month-select";
    }
    for(let i = 0; i < monthArray.length; i++) {
     $(selectedElement).append("<option class='month-option-" + i + "'>");
     $(".month-option-" + i).text(monthArray[i]);
    }
  }

  function getLastMonth() {
    return new Date().getMonth();
  }
});