import MapCoordinate from "./MapCoordinate";
import Move from "./Move";

export enum ActionType {
  "SetMapSize" = "SetMapSize",
  "SetImpassible" = "SetImpassible",
  "SetStart" = "SetStart",
  "SetEnd" = "SetEnd",
  "SetPathHome" = "SetPathHome",
  "SetNoPathHome" = "SetNoPathHome",
}

interface SetMapSizeAction {
  readonly type: ActionType.SetMapSize;
  readonly size: number;
}

interface SetImpassible {
  readonly type: ActionType.SetMapSize;
  readonly coordinate: MapCoordinate;
}

interface SetStart {
  readonly type: ActionType.SetStart;
  readonly coordinate: MapCoordinate;
}

interface SetEnd {
  readonly type: ActionType.SetEnd;
  readonly coordinate: MapCoordinate;
}

interface SetPathHome {
  readonly type: ActionType.SetPathHome;
  readonly path: Move[];
}

interface SetNoPathHome {
  readonly type: ActionType.SetNoPathHome;
}

type PokemonMapAction =
  | SetMapSizeAction
  | SetImpassible
  | SetStart
  | SetEnd
  | SetPathHome
  | SetNoPathHome;

export default PokemonMapAction;
