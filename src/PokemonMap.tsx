import React, { Reducer, useReducer, useState } from "react";
import PokemonMapState, { MapNotSized, MapState } from "./PokemonMapState";
import pokemonMapReducer from "./pokemonMapReducer";
import PokemonMapAction, {
  ActionType,
  EndPickedAction,
  ImpassableToggledAction,
  PathHomeCalculated,
  SizeSetAction,
  StartPickedAction,
} from "./PokemonMapAction";
import MapSquare from "./MapSquare";
import getMapSquareState from "./getMapSquareState";
import getPathHome from "./getPathHome";

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

enum PathFinderState {
  UserPickingMapSize = "UserPickingMapSize",
  UserMarkingImpassables = "UserMarkingImpassables",
  UserMarkingStart = "UserMarkingStart",
  UserMarkingEnd = "UserMarkingEnd",
  DoneCreatingMap = "DoneCreatingMap",
  LoadingPathHome = "LoadingPathHome",
  LoadingPathHomeComplete = "LoadingPathHomeComplete",
  LoadingPathHomeFailed = "LoadingPathHomeFailed",
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

const PathFinderActionButton: React.FC<Readonly<{
  pathFinderState: PathFinderState;
}>> = ({ pathFinderState }) => {
  switch (pathFinderState) {
    case PathFinderState.UserPickingMapSize:
      return <button type="submit">Set Map Size</button>;
    case PathFinderState.UserMarkingImpassables:
      return <button type="submit">Done Marking Impassables</button>;
    case PathFinderState.UserMarkingStart:
      return <button type="submit">Done Marking Start</button>;
    case PathFinderState.UserMarkingEnd:
      return <button type="submit">Done Marking End</button>;
    case PathFinderState.DoneCreatingMap:
      return <button type="submit">Find Poke Path!</button>;
    case PathFinderState.LoadingPathHome:
      return <button disabled={true}>Loading...</button>;
    case PathFinderState.LoadingPathHomeComplete:
      return <button type="submit">Reset</button>;
    case PathFinderState.LoadingPathHomeFailed:
      return <button type="submit">Path Failed, try again?</button>;
  }
};

const PokemonMap: React.FC<Readonly<{ size: number }>> = () => {
  const [pathFinderState, setPathFinderState] = useState<PathFinderState>(
    PathFinderState.UserPickingMapSize
  );
  const [state, dispatch] = useReducer<
    Reducer<PokemonMapState, PokemonMapAction>
  >(pokemonMapReducer, initialState);

  const onSquareToggle = (squareIdx: number) => (): void => {
    if (pathFinderState === PathFinderState.UserMarkingImpassables) {
      const impassableToggledAction: ImpassableToggledAction = {
        type: ActionType.ImpassableToggled,
        squareIdx,
      };

      dispatch(impassableToggledAction);
    } else if (pathFinderState === PathFinderState.UserMarkingStart) {
      const startPicked: StartPickedAction = {
        type: ActionType.StartPicked,
        squareIdx,
      };

      dispatch(startPicked);
    } else if (pathFinderState === PathFinderState.UserMarkingEnd) {
      const endPicked: EndPickedAction = {
        type: ActionType.EndPicked,
        squareIdx,
      };

      dispatch(endPicked);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pathFinderState === PathFinderState.UserPickingMapSize) {
      const mapSizeSetAction: SizeSetAction = {
        type: ActionType.SizeSet,
        size: Number(
          (e.currentTarget.elements as any)[SIZE_SELECT_INPUT_NAME].value
        ),
      };

      dispatch(mapSizeSetAction);
      setPathFinderState(PathFinderState.UserMarkingImpassables);
    } else if (pathFinderState === PathFinderState.UserMarkingImpassables) {
      setPathFinderState(PathFinderState.UserMarkingStart);
    } else if (pathFinderState === PathFinderState.UserMarkingStart) {
      setPathFinderState(PathFinderState.UserMarkingEnd);
    } else if (pathFinderState === PathFinderState.UserMarkingEnd) {
      setPathFinderState(PathFinderState.DoneCreatingMap);
    } else if (
      (pathFinderState === PathFinderState.DoneCreatingMap ||
        pathFinderState === PathFinderState.LoadingPathHomeFailed) &&
      state.currentState === MapState.Complete
    ) {
      setPathFinderState(PathFinderState.LoadingPathHome);

      getPathHome(state)
        .then((moves) => {
          const pathHomeCalculatedAction: PathHomeCalculated = {
            type: ActionType.PathHomeCalculated,
            moves,
          };

          dispatch(pathHomeCalculatedAction);
          setPathFinderState(PathFinderState.LoadingPathHomeComplete);
        })
        .catch(() => {
          setPathFinderState(PathFinderState.LoadingPathHomeFailed);
        });
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ width: "100%", height: "100%" }}>
      {pathFinderState === PathFinderState.UserPickingMapSize && (
        <MapSizeSelect />
      )}
      {state.currentState !== MapState.NotSized &&
        pathFinderState !== PathFinderState.UserPickingMapSize && (
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
      <PathFinderActionButton pathFinderState={pathFinderState} />
    </form>
  );
};

export default PokemonMap;
