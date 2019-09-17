$(document).ready(function () {
  checkTodayMenuStatus(getDateToday());
});

function checkTodayMenuStatus(dateToday) {
  $.ajax({
    type: "post",
    url: "../php/functions/check-menu-status.php",
    data: {
      "today": dateToday
    },
    dataType: "json",
    success: function (response) {
      if(response === null) {
        alert("空的");
      } else {
        
      }
    }
  });
}