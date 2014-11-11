// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

// init slick carousel
/*$(document).ready(function() {
  $('.project-fb-graph-slideshow').slick();
});*/

// global variables
var s = skrollr.init(),
  winHeight = $(window).height(),
  elements = $(".adapt-height"),
  timeoutID;

// init skrollr menu
skrollr.menu.init(s);

// initially set proper box height
adaptBoxHeight(elements, winHeight);



/*  --------------------
    event listeners
    --------------------
*/

/*$(".open-modal").on("click", function() {
  $(".project-fb-graph-slideshow").resize();
});*/
var firstTimeModal = true;
$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
  var modal = $(this);
  console.log(modal);
  //console.log(this);
  //$(".project-fb-graph-slideshow").slickSetOption({dots: true});
  //if(firstTimeModal === true) {
  $('#' + modal[0]['id'] + ' .project-slideshow').slick({dots: true});
  //}
  //firstTimeModal = false;
});


// if window is resized update winHeight variable and 
// adapt min-height for boxes
$(window).on("resize", function() {
  winHeight = $(window).height()
  adaptBoxHeight(elements, winHeight);
});

// when user scrolls
$(window).on("scroll", function() {
  var scrollTop = $(document).scrollTop(),
    sectionsArray;

  checkTobBarStatus(scrollTop);

  // clear timeout before starting new one
  // prohibits function from triggering all the time
  // when user scrolls
  window.clearTimeout(timeoutID);
  timeoutID = window.setTimeout(function() {
    sectionsArray = calcSectionsHeight($("#skrollr-nav"));
    activeSection = defineActiveSection(sectionsArray, scrollTop);
    changeNavActive($('a[href$="' + activeSection + '"]'));
  }, 100);
});


$(".top-bar a").on("click", function() {
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
  $(clickedElm).parents(".top-bar").find("li.active").removeClass("active");
  $(clickedElm).parents("li").addClass("active");
}

function defineActiveSection(sectionsArray, currentScrollHeight) {
  var index = 0,
    activeId = '';

  while(index < sectionsArray["pos"].length) {
    if((currentScrollHeight + 70) >= sectionsArray["pos"][index] && currentScrollHeight < sectionsArray["pos"][(index + 1)] && index < sectionsArray.length) {
      activeId = sectionsArray["ids"][index];
    } else if((currentScrollHeight + 70) >= sectionsArray["pos"][index]) {
      activeId = sectionsArray["ids"][index];
    }
    index++;
  }

  updateUrl(activeId);
  return activeId;
}

function updateUrl(id) {
  var stateObj = { stateId: id };
  history.pushState(stateObj, '', id);
  //window.location = id;
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


function calcSectionsHeight(nav) {
  var elmId,
    elmPos,
    sectionsArray = [],
    idArray = [],
    posArray = [];

  idArray.push('#homepage');
  posArray.push(0.0);

  $(nav).children('li').each(function() {
    elmId = this.children[0].hash;
    idArray.push(elmId);
    elmPos = $(elmId).offset();
    posArray.push(elmPos.top);
  });

  sectionsArray.ids = idArray;
  sectionsArray.pos = posArray;

  return sectionsArray;
}


