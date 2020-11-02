import PokemonMapState from "./PokemonMapState";
import PokemonMapAction, { ActionType } from "./PokemonMapAction";
import { Reducer } from "react";

const pokemonMapReducer: Reducer<PokemonMapState, PokemonMapAction> = (
  state: PokemonMapState,
  action: PokemonMapAction
): PokemonMapState => {
  switch (action.type) {
    case ActionType.SetEnd:
    case ActionType.SetMapSize:
    case ActionType.SetNoPathHome:
    case ActionType.SetPathHome:
    case ActionType.SetStart:
      return state;
  }
};

export default pokemonMapReducer;
