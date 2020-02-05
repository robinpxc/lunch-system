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
  $("#current_date").html(getDateToday());
  $("#current_time").html(getTimeNow());
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

// Function to judge if the element has current attr name
function hasAttribute(currentElement, attrName) {
  var attribute = currentElement.attr(attrName);
  if (typeof (attribute.attr(attrName)) == "undefined") {
    return false;
  } else {
    return true;
  }
}

// Function to hide element
function hideElement(element) {
  if(!(element.hasClass("hide"))) {
    element.addClass("hide");
  }
}

// Function to unhide element 
function unhideElement(element) {
  if(element.hasClass("hide")) {
    element.removeClass("hide");
  }
}

// Function to do both disable and hide operation for an element
function hideAndDisableElement(element) {
  setDisable(element);
  hideElement(element);
}

// Function to do both enable and unhide for an element
function unhideAndEnableElement(element) {
  unhideElement(element);
  setEnable(element);
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

// Function to judge if an element is enabled
function isEnable(currentElement) {
  return !(typeof (currentElement.attr("disabled")) != "undefined" || typeof (currentElement.attr("readonly")) != "undefined");
}

// Functions to set element enabled or disabled
function setEnable(currentElement) {
  if (typeof (currentElement.attr("disabled")) != "undefined") {
    currentElement.removeAttr("disabled")
  } else if (typeof (currentElement.attr("readonly")) != "undefined") {
    currentElement.removeAttr("readonly");
  }
}

function setDisable(currentElement) {
  if (typeof (currentElement.attr("disabled")) == "undefined") {
    currentElement.attr("disabled", "disabled");
  }
}

function setReadOnly(currentElement) {
  if (typeof (currentElement.attr("readonly")) == "undefined") {
    currentElement.attr("readonly", "readonly");
  }
}

function addNewClass(element, newClass) {
  if (!element.hasClass(newClass)) {
    element.addClass(newClass);
  }
}

function removeOldClass(element, oldClass) {
  if (element.hasClass(oldClass)) {
    element.removeClass(oldClass);
  }
}

function replaceClass(element, oldClass, newCLass) {
  removeOldClass(element, oldClass);
  addNewClass(element,newCLass);
}

// Date related functions
function formatDate(y, m, d, symbol) {
  var symbol = symbol || '-';
  var m = (m.toString())[1] ? m : '0' + m;
  var d = (d.toString())[1] ? d : '0' + d;
  return y + symbol + m + symbol + d;
}

function formatTime(h, m, s, symbol) {
  var symbol = symbol || ':';
  var m = (m.toString())[1] ? m : '0' + m;
  var s = (s.toString())[1] ? s : '0' + s;

  return h + symbol + m + symbol + s;
}


// Date & time related function
function getDateToday() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1;
  var currentDay = currentDate.getDate();

  return formatDate(currentYear, currentMonth, currentDay);
}

function getDateTomorrow() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth() + 1;
  var currentDay = currentDate.getDate() + 1;

  return formatDate(currentYear, currentMonth, currentDay);
}

function getTimeNow() {
  var currentDate = new Date();
  var currentHour = currentDate.getHours();
  var currentMinute = currentDate.getMinutes();
  var currentSecond = currentDate.getSeconds();

  return formatTime(currentHour, currentMinute, currentSecond);
}

// Function to decode unicode (Chinese chars)
function decodeUnicode(text) {
  return unescape(text.toString().replace(/\u/g, "%u"));
}