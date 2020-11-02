import React, { Reducer, useReducer } from "react";
import PokemonMapState, { MapState, UnsizedMap } from "./PokemonMapState";
import pokemonMapReducer from "./pokemonMapReducer";
import PokemonMapAction from "./PokemonMapAction";
import PokemonMapSquare from "./PokemonMapSquare";

const initialState: UnsizedMap = {
  currentState: MapState.NotSized,
};

const PokemonMap: React.FC<Readonly<{ size: number }>> = () => {
  const [state] = useReducer<Reducer<PokemonMapState, PokemonMapAction>>(
    pokemonMapReducer,
    initialState
  );

  switch (state.currentState) {
    case MapState.NotSized:
      return <div>Not Sized</div>;
    case MapState.Sized:
    case MapState.ImpassiblesMarked:
    case MapState.ImpassiblesAndStartMarked:
    case MapState.Built:
    case MapState.WithNoPathHome:
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
          {Array.from({ length: state.size * 3 }, () => (
            <PokemonMapSquare />
          ))}
        </div>
      );
  }
};

export default PokemonMap;
