import Move from "./Move";
import getNextSquareInPath from "./getNextSquareInPath";

describe("getNextSquareInPath", () => {
  it.each`
    mapSize | currentSquareIdx | nextMove  | expectedNextSquarePathIndex
    ${3}    | ${0}             | ${Move.R} | ${1}
    ${3}    | ${1}             | ${Move.R} | ${2}
    ${3}    | ${2}             | ${Move.D} | ${5}
    ${3}    | ${5}             | ${Move.D} | ${8}
    ${3}    | ${8}             | ${Move.L} | ${7}
    ${3}    | ${7}             | ${Move.U} | ${4}
    ${3}    | ${4}             | ${Move.L} | ${3}
    ${3}    | ${3}             | ${Move.D} | ${6}
    ${18}   | ${76}            | ${Move.R} | ${77}
    ${18}   | ${76}            | ${Move.L} | ${75}
    ${18}   | ${76}            | ${Move.U} | ${58}
    ${18}   | ${76}            | ${Move.D} | ${94}
  `(
    "should return index `$expectedNextSquarePathIndex` for a map of size `$mapSize` when the current square index is `$currentSquareIdx` for a `$nextMove` next move",
    ({ mapSize, currentSquareIdx, nextMove, expectedNextSquarePathIndex }) => {
      expect(
        getNextSquareInPath({ mapSize, currentSquareIdx, nextMove })
      ).toEqual(expectedNextSquarePathIndex);
    }
  );
});
