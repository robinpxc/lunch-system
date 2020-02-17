$(document).ready(function() {
  initUI();
  setCardClickEvent();

  function initUI() {
    let date = new Date();
    $("#date-today").text(getDateTodayChinese(true));
  }

  function setCardClickEvent() {
    $("#daily-statistics").click(function() {
      window.location.href = "admin-daily-statistic.php";
    });

    $("#monthly-statistics").click(function() {
      window.location.href = "admin-daily-statistic.php";
    });
  }
});