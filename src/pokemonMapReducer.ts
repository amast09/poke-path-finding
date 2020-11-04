import PokemonMapState, { MapState } from "./PokemonMapState";
import PokemonMapAction, { ActionType } from "./PokemonMapAction";
import { Reducer } from "react";

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
    case ActionType.ImpassablePicked:
    case ActionType.EndCoordinatePicked:
    case ActionType.StartCoordinatePicked:
    case ActionType.PathHomeCalculated:
      return state;
  }
};

export default pokemonMapReducer;
