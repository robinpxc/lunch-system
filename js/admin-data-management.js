$(document).ready(function() {
  initUI();
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

  function getLastMonth() {
    return new Date().getMonth();
  }
});