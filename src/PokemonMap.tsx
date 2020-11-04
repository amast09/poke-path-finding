import React, { Reducer, useReducer } from "react";
import PokemonMapState, { MapState, MapNotSized } from "./PokemonMapState";
import pokemonMapReducer from "./pokemonMapReducer";
import PokemonMapAction, {
  ActionType,
  MapSizeSetAction,
} from "./PokemonMapAction";
import PokemonMapSquare from "./PokemonMapSquare";
import MapSizeSelection from "./MapSizeSelection";

const initialState: MapNotSized = {
  currentState: MapState.NotSized,
};

const PokemonMap: React.FC<Readonly<{ size: number }>> = () => {
  const [state, dispatch] = useReducer<
    Reducer<PokemonMapState, PokemonMapAction>
  >(pokemonMapReducer, initialState);

  const onSizeSelect = (size: number): void => {
    const mapSizeSetAction: MapSizeSetAction = {
      type: ActionType.MapSizeSet,
      size,
    };

    dispatch(mapSizeSetAction);
  };

  switch (state.currentState) {
    case MapState.NotSized:
      return <MapSizeSelection onSizeSet={onSizeSelect} />;
    case MapState.Sized:
    case MapState.ImpassablesMarked:
    case MapState.ImpassablesAndStartMarked:
    case MapState.Complete:
    case MapState.WithPathHome:
      return (
        <div
          style={{
            display: "grid",
            gridTemplate: `repeat(${state.size}, auto) / repeat(${state.size}, auto)`,
            width: "100%",
            height: "100%",
          }}
        >
          {Array.from({ length: state.size * state.size }, () => (
            <PokemonMapSquare />
          ))}
        </div>
      );
  }
};

export default PokemonMap;
