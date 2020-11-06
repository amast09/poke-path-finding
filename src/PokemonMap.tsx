import React, { Reducer, useReducer } from "react";
import PokemonMapState, { MapNotSized, MapState } from "./PokemonMapState";
import pokemonMapReducer from "./pokemonMapReducer";
import PokemonMapAction, {
  ActionType,
  ImpassableToggledAction,
  MapSizeSetAction,
} from "./PokemonMapAction";
import MapSquare from "./MapSquare";
import MapSizeSelection from "./MapSizeSelection";
import getMapSquareState from "./getMapSquareState";

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

  const onImpassibleToggled = (squareIdx: number) => (): void => {
    const impassableToggledAction: ImpassableToggledAction = {
      type: ActionType.ImpassableToggled,
      squareIdx,
    };

    dispatch(impassableToggledAction);
  };

  switch (state.currentState) {
    case MapState.NotSized:
      return <MapSizeSelection onSizeSet={onSizeSelect} />;
    case MapState.WithImpassables:
      return (
        <div
          style={{
            display: "grid",
            gridTemplate: `repeat(${state.size}, auto) / repeat(${state.size}, auto)`,
            width: "100%",
            height: "100%",
          }}
        >
          {Array.from({ length: state.size * state.size }, (_, idx) => (
            <MapSquare
              key={idx}
              onClick={onImpassibleToggled(idx)}
              mapSquareState={getMapSquareState(state, idx)}
            />
          ))}
        </div>
      );
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
          {Array.from({ length: state.size * state.size }, (_, idx) => (
            <MapSquare
              key={idx}
              onClick={() => {}}
              mapSquareState={getMapSquareState(state, idx)}
            />
          ))}
        </div>
      );
  }
};

export default PokemonMap;
