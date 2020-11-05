import PokemonMapState, { MapState } from "./PokemonMapState";
import PokemonMapAction, { ActionType } from "./PokemonMapAction";
import { Reducer } from "react";

const isSquareInMap = (mapSize: number, squareIdx: number): boolean =>
  squareIdx >= 0 && squareIdx < mapSize;

// Immutable Set XOR
const xorValueIntoSet = (set: Set<number>, value: number): Set<number> => {
  if (set.has(value)) {
    return new Set<number>(
      Array.from(set.values()).filter((setValue) => setValue !== value)
    );
  } else {
    return new Set<number>([...Array.from(set.values()), value]);
  }
};

const pokemonMapReducer: Reducer<PokemonMapState, PokemonMapAction> = (
  state: PokemonMapState,
  action: PokemonMapAction
): PokemonMapState => {
  switch (action.type) {
    case ActionType.MapSizeSet:
      if (
        state.currentState === MapState.NotSized &&
        action.size >= 2 &&
        action.size <= 10
      ) {
        return {
          currentState: MapState.Sized,
          size: action.size,
        };
      } else {
        return state;
      }
    case ActionType.ImpassableToggled:
      if (
        state.currentState === MapState.Sized &&
        isSquareInMap(state.size, action.squareIdx)
      ) {
        return {
          ...state,
          currentState: MapState.ImpassablesMarked,
          impassables: new Set([action.squareIdx]),
        };
      } else if (
        state.currentState === MapState.ImpassablesMarked &&
        isSquareInMap(state.size, action.squareIdx)
      ) {
        return {
          ...state,
          currentState: MapState.ImpassablesMarked,
          impassables: xorValueIntoSet(state.impassables, action.squareIdx),
        };
      } else {
        return state;
      }
    case ActionType.EndCoordinatePicked:
    case ActionType.StartCoordinatePicked:
    case ActionType.PathHomeCalculated:
      return state;
  }
};

export default pokemonMapReducer;
