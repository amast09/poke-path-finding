import React, { Reducer, useReducer } from "react";
import PokemonMapState, { MapState, UnsizedMap } from "./PokemonMapState";
import pokemonMapReducer from "./pokemonMapReducer";
import PokemonMapAction, {
  ActionType,
  MapSizeSetAction,
} from "./PokemonMapAction";
import PokemonMapSquare from "./PokemonMapSquare";
import MapSizeSelection from "./MapSizeSelection";

const initialState: UnsizedMap = {
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
    case MapState.ImpassiblesMarked:
    case MapState.ImpassiblesAndStartMarked:
    case MapState.Built:
    case MapState.BuiltAndCalculated:
      return (
        <div
          style={{
            display: "grid",
            gridTemplate: `repeat(${state.size}, auto) / repeat(${state.size}, auto)`,
            width: "100%",
            height: "100%",
          }}
        >
          {Array.from({ length: state.size * 3 }, () => (
            <PokemonMapSquare />
          ))}
        </div>
      );
  }
};

export default PokemonMap;
