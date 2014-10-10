// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// init skrollr for parallax scrolling
var s = skrollr.init(),
  winHeight = $(window).height(),
  elements = $(".adapt-height"),
  arrow = $("#awesome-arrow");

// init skrollr menu
skrollr.menu.init(s);

// initially set proper box height and fit text
adaptBoxHeight(elements, winHeight);
//$("#resp-hl-home").fitText(1.23);

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


$(".top-bar-section a").on("click", function() {
  changeNavActive(this);
});

$(document).on("click", function() {
  $("#email-field").removeClass("active");
});

$("#email-field").on("click", function(e) {
  e.stopPropagation();
  selectText("email-field");
  $(this).addClass("active");
});



/*  --------------------
    function definitions
    --------------------
*/
function changeNavActive(clickedElm) {
  $(clickedElm).parent("li").addClass("active").siblings().removeClass("active");
}

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

  //s.refresh($("#parallax-1"), $("#parallax-2"));
}

// http://stackoverflow.com/questions/11128130/select-text-in-javascript
function selectText(element) {
    var doc = document, 
      text = doc.getElementById(element), 
      range, selection;

    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
