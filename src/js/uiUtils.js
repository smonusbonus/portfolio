import * as $ from "jquery";

function getActiveSectionId(sections, currentScrollHeight) {
  var activeId = "";

  sections.positions.forEach(function(position, index) {
    if (currentScrollHeight >= position) {
      activeId = sections.ids[index];
    }
  });

  return activeId;
}

function getSectionPositions(nav) {
  var sections = {};
  var ids = [];
  var positions = [];

  ids.push("#homepage");
  positions.push(0.0);

  $(nav)
    .find("li")
    .each(function() {
      var elmId = this.children[0].hash;
      ids.push(elmId);
      var elmPosition = $(elmId).offset();
      positions.push(elmPosition.top);
    });

  sections.ids = ids;
  sections.positions = positions;

  return sections;
}

export { getActiveSectionId, getSectionPositions };
