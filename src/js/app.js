// Load assets
import "../scss/styles.scss";

// Load dependencies
import * as $ from "jquery";
import * as Flickity from "flickity";

// Load utils
import { getActiveSectionId, getSectionPositions } from "./uiUtils.js";

// global variables
var timeoutID;

$(document).ready(function() {
  window.setTimeout(function() {
    $("#headline-fade").fadeTo(500, 1);
    $("#paragraph-fade").fadeTo(500, 1);
    $("#button-fade").fadeTo(500, 1, function() {
      $("#image-fade").fadeTo(700, 1);
    });
  }, 0);
});

/*  --------------------
    event listeners
    --------------------
*/

// Event listeners for modal
$("[data-reveal-id]").on("click", function(e) {
  var modalId =
    e.target.dataset.revealId || e.target.parentElement.dataset.revealId;

  var slideshow = document.querySelector(".modal__slideshow." + modalId);
  var flkty = new Flickity(slideshow, {
    // options
    cellAlign: "left",
    contain: true
  });

  // Open modal
  $("#" + modalId).css({ display: "block" });
  $(".project__modal-wrapper").css({ opacity: 1, display: "flex" });
});

$(".modal__close-button").on("click", function(e) {
  var modalId = e.target.parentElement.id;
  $("#" + modalId).css({ display: "none" });
  $(".project__modal-wrapper").css({ opacity: 0, display: "none" });
});

// when user scrolls
$(window).on("scroll", function() {
  updateTopBarScrollStatus();

  // clear timeout before starting new one
  // prohibits function from triggering all the time
  // when user scrolls
  window.clearTimeout(timeoutID);
  timeoutID = window.setTimeout(function() {
    var scrollTop = $(document).scrollTop();
    var sections = getSectionPositions($(".top-bar"));
    var activeSectionId = getActiveSectionId(sections, scrollTop);
    updateUrl(activeSectionId);
    changeNavActive($('a[href$="' + activeSectionId + '"]'));
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
  $(clickedElm)
    .parents(".top-bar")
    .find("li.active")
    .removeClass("active");
  $(clickedElm)
    .parents("li")
    .addClass("active");
}

function updateUrl(id) {
  var stateObj = { stateId: id };
  try {
    history.pushState(stateObj, "", id);
  } catch (err) {
    // Handle error(s) here
  }
}

function updateTopBarScrollStatus() {
  var scrollTop = $(document).scrollTop();
  var topBar = $(".top-bar");

  if (scrollTop > 50 && $(topBar).not(".scrolled").length > 0) {
    $(topBar).addClass("scrolled");
  } else if (scrollTop <= 50 && $(topBar).hasClass("scrolled")) {
    $(topBar).removeClass("scrolled");
  }
}

// http://stackoverflow.com/questions/11128130/select-text-in-javascript
function selectText(element) {
  var doc = document,
    text = doc.getElementById(element),
    range,
    selection;

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
