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

  $(".logout-btn").click(function() {
    logout();
  });
});

// Function to show current date and time.
function showTime() {
  $("#current_date").html(getDateTodayCN(false));
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
  if (!(element.hasClass("hide"))) {
    element.addClass("hide");
  }
}

// Function to unhide element
function unhideElement(element) {
  if (element.hasClass("hide")) {
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

function isElementExist(element) {
  return element.length > 0 ? true : false;
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
  addNewClass(element, newCLass);
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

function getDateTodayCN(withWeekDay) {
  let date = new Date();
  return convertDateCN(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getDay(), withWeekDay);
}

function getDateTomorrowCN(withWeekDay) {
  let date = new Date();
  return convertDateCN(date.getFullYear(), date.getMonth() + 1, date.getDate() + 1, date.getDay() + 1, withWeekDay);
}

function convertDateCN(year, month, day, weekDay, withWeekDay) {
  let formattedMonth = (month.toString())[1] ? month : '0' + month;
  let formattedDay = (day.toString())[1] ? day : '0' + day;

  return year + "年" + formattedMonth + "月" + formattedDay + "日 " + (withWeekDay ? getWeekDayCN(weekDay) : "");
}

function getWeekDayCN(weekDay) {
  switch (weekDay) {
    case 0:
      return "星期日";
    case 1:
      return "星期一";
    case 2:
      return "星期二";
    case 3:
      return "星期三";
    case 4:
      return "星期四";
    case 5:
      return "星期五";
    case 6:
      return "星期六";
  }
}

function getDateTomorrow() {
  let today = new Date(getDateToday());
  let y = today.getFullYear();
  let m = isLastDay(getDateToday()) ? today.getMonth() + 2 : today.getMonth() + 1;
  let d = isLastDay(getDateToday()) ? "01" : today.getDate() + 1;
  return formatDate(y, m, d);
}

function getTimeNow() {
  let currentDate = new Date();
  return formatTime(currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
}

function getCurrentYear() {
  return new Date().getFullYear();
}

function getCurrentMonth() {
  return (new Date().getMonth()) + 1;
}

function isLastDay(dateString) {
  let date = new Date(dateString);
  let endDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return date.getDate() == endDayOfMonth;
}

// Function to decode unicode (Chinese chars)
function decodeUnicode(text) {
  return unescape(text.toString().replace(/\u/g, "%u"));
}

// Function to convert group number to text
function groupToText(groupNum) {
  switch (groupNum) {
    case "group0":
      return "巡察办";
    case "group1":
      return "第一巡察组";
    case "group2":
      return "第二巡察组";
    case "group3":
      return "第三巡察组";
    case "group4":
      return "第四巡察组";
    case "group5":
      return "第五巡察组";
    case "group6":
      return "临时人员";
    default:
      return "其他";
  }
}

function roleToText(userRole) {
  switch(userRole) {
    case CONSTANTS.USER.ROLE.USER:
      return "用户";
    case CONSTANTS.USER.ROLE.ADMIN_GROUP:
      return "组管理员";
    case CONSTANTS.USER.ROLE.ADMIN_SUPER:
      return "高级管理员";
    default:
      return "未知类型";
  }
}


// Spinner related functions
function addSpinner() {
  if (!isElementExist($(".spinner-container"))) {
    $("body").append("<div class='spinner-container'>");
    $(".spinner-container").append("<div class='spinner-border text-primary circle-spinner' role='status'>");
    $(".spinner-border").append("<span class='sr-only'>");
  }
}

function removeSpinner() {
  if (isElementExist($(".spinner-container"))) {
    $($(".spinner-container")).remove();
  }
}

// Sign out related functions
function logout() {
  clearCookies();
}

function clearCookies() {
  let cookies = $.cookie();
  for(let cookie in cookies) {
    $.removeCookie(cookie);
  }
}