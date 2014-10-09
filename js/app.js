// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// init skrollr for parallax scrolling
var s = skrollr.init(),
  winHeight = $(window).height(),
  elements = $(".adapt-height"),
  arrow = $("#awesome-arrow");

// initially set proper box height and fit text
adaptBoxHeight(elements, winHeight);
$("#resp-hl-home").fitText(1.23);

// awesome blinking arrow
/*var arrowIntvlId = window.setInterval(function() {
  $(arrow).animate({opacity: 0.3}, 800, function() {
    $(arrow).animate({opacity: 1.0}, 800);
  });
}, 2000);*/

// if window is resized update winHeight variable and 
// adapt min-height for boxes
$(window).on("resize", function() {
  winHeight = $(window).height()
  adaptBoxHeight(elements, winHeight);
});

// when user scrolls
$(window).on("scroll", function() {
  var scrollTop = $(document).scrollTop();

  checkTobBarStatus(scrollTop);
  
  // when user scrolls down hide arrow
  /*if(scrollTop > winHeight - 250) {
    window.clearInterval(arrowIntvlId);
    $(arrow).fadeOut();
  }*/
});


function checkTobBarStatus(scrollTop) {
  var topBar = $(".top-bar");

  if(scrollTop > 50 && $(topBar).not(".scrolled").length > 0) {
    $(topBar).addClass("scrolled");
  } else if(scrollTop <= 50 && $(topBar).hasClass("scrolled")) {
    $(topBar).removeClass("scrolled");
  }
}

// make sure boxes have min-height of browser window
function adaptBoxHeight(elements, winHeight) {

  if(winHeight < 480) { winHeight = 480; } 

  $(elements).css("min-height", winHeight);
  $(elements[0]).css("min-height", winHeight - 45);

  s.refresh($("#parallax-1"), $("#parallax-2"));
}
