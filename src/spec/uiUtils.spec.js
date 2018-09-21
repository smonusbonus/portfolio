import { getActiveSectionId } from "../js/uiUtils.js";

describe("getActiveSectionId", () => {
  test("should return ID for homepage", () => {
    const sections = {
      positions: [0, 200, 400],
      ids: ["#homepage", "#who-am-i", "#portfolio"]
    };
    const currentScrollHeight = 100;
    expect(getActiveSectionId(sections, currentScrollHeight)).toEqual(
      "#homepage"
    );
  });

  test("should return ID for who-am-i", () => {
    const sections = {
      positions: [0, 200, 400],
      ids: ["#homepage", "#who-am-i", "#portfolio"]
    };
    const currentScrollHeight = 250;
    expect(getActiveSectionId(sections, currentScrollHeight)).toEqual(
      "#who-am-i"
    );
  });

  test("should return ID for projects", () => {
    const sections = {
      positions: [0, 200, 400],
      ids: ["#homepage", "#who-am-i", "#portfolio"]
    };
    const currentScrollHeight = 400;
    expect(getActiveSectionId(sections, currentScrollHeight)).toEqual(
      "#portfolio"
    );
  });
});
