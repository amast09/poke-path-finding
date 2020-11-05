import MapCoordinate from "./MapCoordinate";
import getMapCoordinatesForSquareIndex from "./getMapCoordinatesForSquareIndex";

describe("getMapCoordinatesForSquareIndex", () => {
  it.each`
    squareSize | squareIdx | expectedXCoordinate | expectedYCoordinate
    ${3}       | ${0}      | ${0}                | ${0}
    ${3}       | ${1}      | ${1}                | ${0}
    ${3}       | ${2}      | ${2}                | ${0}
    ${3}       | ${3}      | ${0}                | ${1}
    ${3}       | ${4}      | ${1}                | ${1}
    ${3}       | ${5}      | ${2}                | ${1}
    ${3}       | ${6}      | ${0}                | ${2}
    ${3}       | ${7}      | ${1}                | ${2}
    ${3}       | ${8}      | ${2}                | ${2}
    ${18}      | ${263}    | ${11}               | ${14}
  `(
    "should return `{x: $expectedXCoordinate, y: expectedYCoordinate}` at index $squareIdx for a square of size `$squareSize`",
    ({ squareSize, squareIdx, expectedXCoordinate, expectedYCoordinate }) => {
      const expectedCoordinate: MapCoordinate = {
        x: expectedXCoordinate,
        y: expectedYCoordinate,
      };
      expect(getMapCoordinatesForSquareIndex(squareSize)(squareIdx)).toEqual(
        expectedCoordinate
      );
    }
  );
});
