$(document).ready(function () {
  initUI();
});

$(window).resize(function(){
  initUI();
});

function initUI() {
  if(getWindowWidth() <= 768) {
    $("form").css({
      "display": "block",
      "flex-wrap": ""
    });
    $(".card").css("min-width", "100%");

  } else {
    $("form").css({
      "display": "flex",
      "flex-wrap": "wrap"
    });
    $(".card").css("min-width", "32%");
  }
}

