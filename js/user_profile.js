$(document).ready(function () {

});

// Function to display or remove
function setNavBarWidth() {
  var windowWidth = $(window).width();
  if (windowWidth >= 768 && !($("body").hasClass("container"))) {
   
  } else if (windowWidth < 768 && ($("body").hasClass("container"))) {
    
  }
}