$(document).ready(function() {
  initUI();

  function initUI() {
    let date = new Date();
    $("#date-today").text(getDateTodayChinese(true));
  }
});