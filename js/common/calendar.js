$(document).ready(function () {
  var mySchedule = new Schedule({
    el: '#schedule-box',
    clickCb: function (y,m,d) {
      if(document.getElementById("date-value")) {
        alert(formatDate(y, m, d));
        $("#date-value").val(formatDate(y, m, d));
      }
    },
    nextMonthCb: function (y,m,d) {
    },
    nextYeayCb: function (y,m,d) {
    },
    prevMonthCb: function (y,m,d) {
    },
    prevYearCb: function (y,m,d) {
    }
  });
});
