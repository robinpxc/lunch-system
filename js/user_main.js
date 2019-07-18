$(document).ready(function () {
    // Variables
    var headerMenuList = $("#nav-bar-list"); 

    // Hide nav list when click on blank.
    $(document).click(function (event) {
        if (headerMenuList.hasClass("show")) {
            headerMenuList.removeClass("show");
        }
    });

    // Display current date and time.
    showTime();
});

// Function to show current date and time.
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
    $("#current_date").html(year + "-" + month + "-" + day);
    $("#current_time").html(hours + ":" + minutes + ":" + seconds);
    setTimeout(showTime, 1000);
}

// Function to show/hide header menu list
function showNavMenu(willShowMenu) {
    if (willShowMenu) {
        headerMenuList.addClass("show");
    } else {
        headerMenuList.removeClass("show");
    }
}