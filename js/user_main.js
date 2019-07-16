$(document).ready(function () {

});

function showTime() {
    var serverDate = new Date();
    var year = serverDate.getFullYear();
    var month = serverDate.getMonth();
    var day = serverDate.getDate();
    var hours = serverDate.getHours();
    var minutes = serverDate.getMinutes();
    var seconds = serverDate.getSeconds();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("current_time").innerHTML = year + "年" + " " + month + "月" + day + "日" + " " + hours + ":" + minutes + ":" +seconds;
    setTimeout(showTime, 1000);
}