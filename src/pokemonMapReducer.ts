import PokemonMapState, { MapState } from "./PokemonMapState";
import PokemonMapAction, { ActionType } from "./PokemonMapAction";
import { Reducer } from "react";
import Move from "./Move";
import getNextSquareInPath from "./getNextSquareInPath";
import { NO_PATH_HOME } from "./NoPathHome";

const isSquareInMap = (mapSize: number, squareIdx: number): boolean =>
  squareIdx >= 0 && squareIdx < mapSize * mapSize;

const hasSquaresAvailable = (
  mapSize: number,
  currentImpassables: Set<number>
): boolean => mapSize * mapSize - currentImpassables.size > 2;

const immutablyRemoveValueFromSet = (
  set: Set<number>,
  value: number
): Set<number> =>
  new Set<number>(
    Array.from(set.values()).filter((setValue) => setValue !== value)
  );

const immutablyAddValueToSet = (set: Set<number>, value: number): Set<number> =>
  new Set<number>([...Array.from(set.values()), value]);

// Immutable Set XOR
const xorValueIntoSet = (set: Set<number>, value: number): Set<number> =>
  set.has(value)
    ? immutablyRemoveValueFromSet(set, value)
    : immutablyAddValueToSet(set, value);

const pokemonMapReducer: Reducer<PokemonMapState, PokemonMapAction> = (
  state: PokemonMapState,
  action: PokemonMapAction
): PokemonMapState => {
  switch (action.type) {
    case ActionType.SizeSet:
      if (
        state.currentState === MapState.NotSized &&
        action.size >= 2 &&
        action.size <= 10
      ) {
        return {
          currentState: MapState.WithImpassables,
          impassables: new Set(),
          size: action.size,
        };
      } else {
        return state;
      }
    case ActionType.ImpassableToggled:
      if (
        state.currentState === MapState.WithImpassables &&
        isSquareInMap(state.size, action.squareIdx)
      ) {
        return {
          ...state,
          currentState: MapState.WithImpassables,
          impassables: hasSquaresAvailable(state.size, state.impassables)
            ? xorValueIntoSet(state.impassables, action.squareIdx)
            : immutablyRemoveValueFromSet(state.impassables, action.squareIdx),
        };
      } else {
        return state;
      }
    case ActionType.StartPicked:
      if (
        (state.currentState === MapState.WithImpassables ||
          state.currentState === MapState.ImpassablesAndStartMarked) &&
        isSquareInMap(state.size, action.squareIdx)
      ) {
        return {
          ...state,
          currentState: MapState.ImpassablesAndStartMarked,
          start: action.squareIdx,
        };
      } else {
        return state;
      }
    case ActionType.EndPicked:
      if (
        (state.currentState === MapState.ImpassablesAndStartMarked ||
          state.currentState === MapState.Complete) &&
        isSquareInMap(state.size, action.squareIdx)
      ) {
        return {
          ...state,
          currentState: MapState.Complete,
          end: action.squareIdx,
        };
      } else {
        return state;
      }
    case ActionType.PathHomeCalculated:
      if (state.currentState === MapState.Complete) {
        return {
          ...state,
          currentState: MapState.WithPathHome,
          pathHome:
            action.moves === NO_PATH_HOME
              ? NO_PATH_HOME
              : action.moves.reduce(
                  (partialPathHome: number[], nextMove: Move) => {
                    const currentSquareIdx =
                      partialPathHome[partialPathHome.length - 1] ??
                      state.start;
                    const nextSquareInPathHome = getNextSquareInPath({
                      mapSize: state.size,
                      currentSquareIdx,
                      nextMove,
                    });

                    return partialPathHome.concat(nextSquareInPathHome);
                  },
                  new Array<number>()
                ),
        };
      } else {
        return state;
      }
  }
};

export default pokemonMapReducer;
