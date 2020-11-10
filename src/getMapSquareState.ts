import PokemonMapState, { MapState } from "./PokemonMapState";
import { MapSquareState } from "./MapSquare";
import { NO_PATH_HOME } from "./NoPathHome";

const getMapSquareState = (
  map: PokemonMapState,
  squareIdx: number
): MapSquareState => {
  switch (map.currentState) {
    case MapState.NotSized:
      return MapSquareState.Open;
    case MapState.WithImpassables:
      return map.impassables.has(squareIdx)
        ? MapSquareState.Impassible
        : MapSquareState.Open;
    case MapState.ImpassablesAndStartMarked:
      if (map.impassables.has(squareIdx)) {
        return MapSquareState.Impassible;
      } else if (map.start === squareIdx) {
        return MapSquareState.Start;
      } else {
        return MapSquareState.Open;
      }
    case MapState.Complete:
      if (map.impassables.has(squareIdx)) {
        return MapSquareState.Impassible;
      } else if (map.start === squareIdx) {
        return MapSquareState.Start;
      } else if (map.end === squareIdx) {
        return MapSquareState.End;
      } else {
        return MapSquareState.Open;
      }
    case MapState.WithPathHome:
      if (map.impassables.has(squareIdx)) {
        return MapSquareState.Impassible;
      } else if (map.start === squareIdx) {
        return MapSquareState.Start;
      } else if (map.end === squareIdx) {
        return MapSquareState.End;
      } else if (
        map.pathHome !== NO_PATH_HOME &&
        map.pathHome.indexOf(squareIdx) !== -1
      ) {
        return MapSquareState.OnPathHome;
      } else {
        return MapSquareState.Open;
      }
  }
};

export default getMapSquareState;
