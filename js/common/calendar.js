$(document).ready(function () {
  var mySchedule = new Schedule({
    el: '#schedule-box',
    //date: '2018-9-20',
    clickCb: function (y,m,d) {
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

function displayDate(y, m, d) {
   document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
}
