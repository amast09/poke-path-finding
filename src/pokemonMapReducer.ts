import PokemonMapState from "./PokemonMapState";
import PokemonMapAction, { ActionType } from "./PokemonMapAction";
import { Reducer } from "react";

// TODO: TDD in
// return {
//   currentState: MapState.Sized,
//   size: action.size,
// };

const pokemonMapReducer: Reducer<PokemonMapState, PokemonMapAction> = (
  state: PokemonMapState,
  action: PokemonMapAction
): PokemonMapState => {
  switch (action.type) {
    case ActionType.MapSizeSet:
    case ActionType.ImpassiblePicked:
    case ActionType.EndCoordinatePicked:
    case ActionType.StartCoordinatePicked:
    case ActionType.PathHomeCalculated:
      return state;
  }
};

export default pokemonMapReducer;
