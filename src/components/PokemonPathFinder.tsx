import React, { Reducer, useReducer, useState } from "react";
import PokemonMapState, {
  MapNotSized,
  MapState,
} from "../types/PokemonMapState";
import PokemonMapAction, {
  ActionType,
  EndPickedAction,
  ImpassableToggledAction,
  PathHomeCalculated,
  SizeSetAction,
  StartPickedAction,
} from "../types/PokemonMapAction";
import pokemonMapReducer from "../pokemonMapReducer";
import getPathHome from "../api/getPathHome";
import MapSizeSelect, { SIZE_SELECT_INPUT_NAME } from "./MapSizeSelect";
import PathFinderActionButton from "./PathFinderActionButton";
import MapSquare from "./MapSquare";
import getMapSquareState from "../selectors/getMapSquareState";

export enum PathFinderState {
  UserPickingMapSize = "UserPickingMapSize",
  UserMarkingImpassables = "UserMarkingImpassables",
  UserMarkingStart = "UserMarkingStart",
  UserMarkingEnd = "UserMarkingEnd",
  DoneCreatingMap = "DoneCreatingMap",
  LoadingPathHome = "LoadingPathHome",
  LoadingPathHomeComplete = "LoadingPathHomeComplete",
  LoadingPathHomeFailed = "LoadingPathHomeFailed",
}

const initialState: MapNotSized = {
  currentState: MapState.NotSized,
};

const PokemonPathFinder: React.FC = () => {
  const [pathFinderState, setPathFinderState] = useState<PathFinderState>(
    PathFinderState.UserPickingMapSize
  );
  const [state, dispatch] = useReducer<
    Reducer<PokemonMapState, PokemonMapAction>
  >(pokemonMapReducer, initialState);

  const onSquareToggle = (squareIdx: number): void => {
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
      <PathFinderActionButton pathFinderState={pathFinderState} />
      {state.currentState !== MapState.NotSized &&
        pathFinderState !== PathFinderState.UserPickingMapSize && (
          <div
            style={{
              display: "grid",
              gridTemplate: `repeat(${state.size}, auto) / repeat(${state.size}, auto)`,
            }}
          >
            {Array.from({ length: state.size * state.size }, (_, idx) => (
              <MapSquare
                key={idx}
                onClick={() => onSquareToggle(idx)}
                mapSquareState={getMapSquareState(state, idx)}
              />
            ))}
          </div>
        )}
    </form>
  );
};

export default PokemonPathFinder;
