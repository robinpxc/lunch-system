$(document).ready(function () {
  // Variables
  var headerMenuList = $("#nav-bar-list");
  setNavBarWidth();
  setSystemConfigBtn();
  willShowPricingHeader();
  setFooterText();
  removeAdminNavItems();

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

// Reload page
function refresh() {
  window.location.reload();
}

function setSystemConfigBtn() {
  $(".btn-sys-config span").text("你好，" + $.cookie(CONSTANTS.COOKIE.USER.KEY_NAME));
}

function clearAdminNavHighlight() {
  $(".nav-link").css({
    "background-color": ""
  });
}

function addAdminHighlight(navElement) {
  navElement.css("background-color", "#cfcfcf");
}

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

function removeAdminNavItems() {
  let userRole = $.cookie(CONSTANTS.COOKIE.USER.KEY_ROLE);
  if(userRole == CONSTANTS.USER.ROLE.USER || userRole == CONSTANTS.USER.ROLE.GUEST) {
    $(".admin-nav").remove();
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
  clearAdminNavHighlight();
}

// Function to show/hode pricing-header
function willShowPricingHeader() {
  let windowWidth = getWindowWidth();
  if (windowWidth >= 575 && ($(".pricing-header").hasClass("hide"))) {
    $(".pricing-header").removeClass("hide");
  } else if (windowWidth < 575 && !($("body").hasClass("hide"))) {
    $(".pricing-header").addClass("hide");
  }
}

// Function to judge if the element has current attr name
function hasAttribute(currentElement, attrName) {
  let attribute = currentElement.attr(attrName);
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
  document.addEventListener('touchstart',function (event) {
    if(event.touches.length>1){
      event.preventDefault();
    }
  });
  let lastTouchEnd=0;
  document.addEventListener('touchend',function (event) {
    let now=(new Date()).getTime();
    if(now-lastTouchEnd<=300){
      event.preventDefault();
    }
    lastTouchEnd=now;
  },false);
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
function getCurrentHour() {
  return new Date().getHours();
}

function getCurrentMinute() {
  return new Date().getMinutes();
}

function formatDate(y, m, d, symbol) {
  let dateSymbol = symbol || '-';
  let month = (m.toString())[1] ? m : '0' + m;
  let day = (d.toString())[1] ? d : '0' + d;
  return y + dateSymbol +  month + dateSymbol + day;
}

function formatTime(h, m, s, symbol) {
  let dateSymbol = symbol || ':';
  let month = (m.toString())[1] ? m : '0' + m;
  let seconds = (s.toString())[1] ? s : '0' + s;

  return h + dateSymbol + month + dateSymbol + seconds;
}


// Date & time related function
function isToday(date) {
  return date == getDateToday();
}

function getDateToday() {
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDay = currentDate.getDate();

  return formatDate(currentYear, currentMonth, currentDay);
}

function getDateTodayCN(withWeekDay) {
  let date = new Date();
  return convertDateCN(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getDay(), withWeekDay);
}

function getDateTomorrowCN(withWeekDay) {
  let date = new Date(getDateTomorrow());
  return convertDateCN(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getDay(), withWeekDay);
}

function convertDateCN(year, month, day, weekDay, withWeekDay) {
  let formattedMonth = (month.toString())[1] ? month : '0' + month;
  let formattedDay = (day.toString())[1] ? day : '0' + day;

  return year + "年" + formattedMonth + "月" + formattedDay + "日 " + (withWeekDay ? "(" + getWeekDayCN(weekDay) + ")" : "");
}

function getWeekDayCN(weekDay) {
  switch (weekDay) {
    case 0:
      return "周日";
    case 1:
      return "周一";
    case 2:
      return "周二";
    case 3:
      return "周三";
    case 4:
      return "周四";
    case 5:
      return "周五";
    case 6:
      return "周六";
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

function getLastMonth() {
  return new Date().getMonth();
}

function isLastDay(dateString) {
  let date = new Date(dateString);
  let endDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return date.getDate() == endDayOfMonth;
}

function isOrderTodayTimeout() {
  if(getCurrentHour() < CONSTANTS.TIME_LIMIT.HOUR) {return false;}
  else if(getCurrentHour() == CONSTANTS.TIME_LIMIT.HOUR) {
    if(getCurrentMinute() > CONSTANTS.TIME_LIMIT.MINUTE) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

// Function to decode unicode (Chinese chars)
function decodeUnicode(text) {
  return unescape(text.toString().replace(/\u/g, "%u"));
}

// Function to convert group number to text
function groupToText(groupNum) {
  switch (groupNum) {
    case CONSTANTS.WORKGROUP.GROUP_0:
      return CONSTANTS.WORKGROUP.CN.GROUP_0;
    case CONSTANTS.WORKGROUP.GROUP_1:
      return CONSTANTS.WORKGROUP.CN.GROUP_1;
    case CONSTANTS.WORKGROUP.GROUP_2:
      return CONSTANTS.WORKGROUP.CN.GROUP_2;
    case CONSTANTS.WORKGROUP.GROUP_3:
      return CONSTANTS.WORKGROUP.CN.GROUP_3;
    case CONSTANTS.WORKGROUP.GROUP_4:
      return CONSTANTS.WORKGROUP.CN.GROUP_4;
    case CONSTANTS.WORKGROUP.GROUP_5:
      return CONSTANTS.WORKGROUP.CN.GROUP_5;
    case CONSTANTS.WORKGROUP.GROUP_6:
      return CONSTANTS.WORKGROUP.CN.GROUP_6;
    case CONSTANTS.WORKGROUP.GROUP_ALL:
      return CONSTANTS.WORKGROUP.CN.GROUP_ALL;
    default:
      return "数据异常";
  }
}

function groupToTextSimplify(groupNum) {
  switch (groupNum) {
    case CONSTANTS.WORKGROUP.GROUP_0:
      return CONSTANTS.WORKGROUP.CN.SIMPLIFY.GROUP_0;
    case CONSTANTS.WORKGROUP.GROUP_1:
      return CONSTANTS.WORKGROUP.CN.SIMPLIFY.GROUP_1;
    case CONSTANTS.WORKGROUP.GROUP_2:
      return CONSTANTS.WORKGROUP.CN.SIMPLIFY.GROUP_2;
    case CONSTANTS.WORKGROUP.GROUP_3:
      return CONSTANTS.WORKGROUP.CN.SIMPLIFY.GROUP_3;
    case CONSTANTS.WORKGROUP.GROUP_4:
      return CONSTANTS.WORKGROUP.CN.SIMPLIFY.GROUP_4;
    case CONSTANTS.WORKGROUP.GROUP_5:
      return CONSTANTS.WORKGROUP.CN.SIMPLIFY.GROUP_5;
    case CONSTANTS.WORKGROUP.GROUP_6:
      return CONSTANTS.WORKGROUP.CN.SIMPLIFY.GROUP_6;
    case CONSTANTS.WORKGROUP.GROUP_ALL:
      return CONSTANTS.WORKGROUP.CN.SIMPLIFY.GROUP_ALL;
    default:
      return "数据异常";
  }
}

function roleToText(userRole) {
  switch(userRole) {
    case CONSTANTS.USER.ROLE.USER:
      return CONSTANTS.USER.ROLE.CN.USER;
    case CONSTANTS.USER.ROLE.ADMIN_GROUP:
      return CONSTANTS.USER.ROLE.CN.ADMIN_GROUP;
    case CONSTANTS.USER.ROLE.ADMIN_SUPER:
      return CONSTANTS.USER.ROLE.CN.ADMIN_SUPER;
    case CONSTANTS.USER.ROLE.GUEST:
      return CONSTANTS.USER.ROLE.CN.GUEST;
    default:
      return "!数据异常";
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

function setFooterText() {
  $(".footer-text-copyright").html(CONSTANTS.STRING.FOOTER.COPY_RIGHT);
  $(".footer-text-contact").html(CONSTANTS.STRING.FOOTER.CONTACT_ME);
}

function hasHighPermission(role) {
  return (role == CONSTANTS.USER.ROLE.ADMIN_SUPER || role == CONSTANTS.USER.ROLE.ADMIN_MENU);
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
