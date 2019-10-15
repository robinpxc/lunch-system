$(document).ready(function () {
  new Schedule({
    el: '#schedule-box',
    clickCb: function (y,m,d) {
      if(document.getElementById("date-value")) {
        alert(formatDate(y, m, d));
        $("#date-value").val(formatDate(y, m, d));
      }
    }
  });
});
