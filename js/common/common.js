$(document).ready(function () {
  // Variables
  var headerMenuList = $("#nav-bar-list");
  setNavBarWidth();
  willShowPricingHeader();

  // Hide nav list when click on blank.
  $(document).click(function (event) {
    if (headerMenuList.hasClass("show")) {
      headerMenuList.removeClass("show");
    }
  });

  // Display current date and time.
  showTime();

  $(window).resize(function () {
    setNavBarWidth();
    willShowPricingHeader();
  });

  disableZoom();
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

// Function to set header bar full screen width or same as body
function setNavBarWidth() {
  var windowWidth = getWindowWidth();
  if (windowWidth >= 768 && !($("body").hasClass("container"))) {
    $("body").addClass("container");
  } else if (windowWidth < 768 && ($("body").hasClass("container"))) {
    $("body").removeClass("container");
  }
}

// Function to show/hode pricing-header 
function willShowPricingHeader() {
  var windowWidth = getWindowWidth();
  if (windowWidth >= 575 && ($(".pricing-header").hasClass("hide"))) {
    $(".pricing-header").removeClass("hide");
  } else if (windowWidth < 575 && !($("body").hasClass("hide"))) {
    $(".pricing-header").addClass("hide");
  }
}

// Function to judge if the element has current attrname
function hasAttribute(currentElement, attrName) {
  var attribute = currentElement.attr(attrName);
  if (typeof (attribute.attr(attrName)) == "undefined") {
    return false;
  } else {
    return true;
  }
}

// Function to get window width
function getWindowWidth() {
  return $(window).width();
}

// Function to disable safari zoom
function disableZoom() {
  var lastTouchEnd = 0;
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });
}

// Functions to set element enabled or disabled
function setEnable(currentElement) {
  if (typeof (currentElement.attr("disabled")) != "undefined") {
    currentElement.removeAttr("disabled")
  }
}

function setDisable(currentElement) {
  if (typeof (currentElement.attr("disabled")) == "undefined") {
    currentElement.attr("disabled", "disabled");
  }
}
