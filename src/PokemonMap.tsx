import React, { Reducer, useReducer, useState } from "react";
import PokemonMapState, { MapNotSized, MapState } from "./PokemonMapState";
import pokemonMapReducer from "./pokemonMapReducer";
import PokemonMapAction, {
  ActionType,
  EndPickedAction,
  ImpassableToggledAction,
  SizeSetAction,
  StartPickedAction,
} from "./PokemonMapAction";
import MapSquare from "./MapSquare";
import getMapSquareState from "./getMapSquareState";

const SIZE_SELECT_INPUT_NAME = "sizeSelect";
const MIN_MAP_SIZE = 2;
const MAX_MAP_SIZE = 10;
const VALID_SIZES = Array.from(
  { length: MAX_MAP_SIZE + 1 - MIN_MAP_SIZE },
  (_, idx) => idx + MIN_MAP_SIZE
);

const initialState: MapNotSized = {
  currentState: MapState.NotSized,
};

enum UserSquareSelection {
  PickingSquareSize = "PickingSquareSize",
  MarkingImpassables = "MarkingImpassables",
  MarkingStart = "MarkingStart",
  MarkingEnd = "MarkingEnd",
  DoneCreatingMap = "DoneCreatingMap",
}

const MapSizeSelect: React.FC = () => (
  <>
    <label htmlFor="size-select">Pick a Map Size</label>
    <select id="size-select" name={SIZE_SELECT_INPUT_NAME}>
      {VALID_SIZES.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  </>
);

const PokemonMap: React.FC<Readonly<{ size: number }>> = () => {
  const [userSquareSelection, setUserSquareSelection] = useState<
    UserSquareSelection
  >(UserSquareSelection.PickingSquareSize);
  const [state, dispatch] = useReducer<
    Reducer<PokemonMapState, PokemonMapAction>
  >(pokemonMapReducer, initialState);

  const onSquareToggle = (squareIdx: number) => (): void => {
    if (userSquareSelection === UserSquareSelection.MarkingImpassables) {
      const impassableToggledAction: ImpassableToggledAction = {
        type: ActionType.ImpassableToggled,
        squareIdx,
      };

      dispatch(impassableToggledAction);
    } else if (userSquareSelection === UserSquareSelection.MarkingStart) {
      const startPicked: StartPickedAction = {
        type: ActionType.StartPicked,
        squareIdx,
      };

      dispatch(startPicked);
    } else if (userSquareSelection === UserSquareSelection.MarkingEnd) {
      const endPicked: EndPickedAction = {
        type: ActionType.EndPicked,
        squareIdx,
      };

      dispatch(endPicked);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userSquareSelection === UserSquareSelection.PickingSquareSize) {
      const mapSizeSetAction: SizeSetAction = {
        type: ActionType.SizeSet,
        size: Number(
          (e.currentTarget.elements as any)[SIZE_SELECT_INPUT_NAME].value
        ),
      };

      dispatch(mapSizeSetAction);
      setUserSquareSelection(UserSquareSelection.MarkingImpassables);
    } else if (userSquareSelection === UserSquareSelection.MarkingImpassables) {
      setUserSquareSelection(UserSquareSelection.MarkingStart);
    } else if (userSquareSelection === UserSquareSelection.MarkingStart) {
      setUserSquareSelection(UserSquareSelection.MarkingEnd);
    } else if (userSquareSelection === UserSquareSelection.MarkingEnd) {
      setUserSquareSelection(UserSquareSelection.DoneCreatingMap);
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ width: "100%", height: "100%" }}>
      {userSquareSelection === UserSquareSelection.PickingSquareSize && (
        <MapSizeSelect />
      )}
      {state.currentState !== MapState.NotSized &&
        userSquareSelection !== UserSquareSelection.PickingSquareSize && (
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
                onClick={onSquareToggle(idx)}
                mapSquareState={getMapSquareState(state, idx)}
              />
            ))}
          </div>
        )}
      {userSquareSelection !== UserSquareSelection.DoneCreatingMap && (
        <button type="submit">Done</button>
      )}
      {/*TODO*/}
      {userSquareSelection === UserSquareSelection.DoneCreatingMap && (
        <button>Reset</button>
      )}
    </form>
  );
};

export default PokemonMap;
