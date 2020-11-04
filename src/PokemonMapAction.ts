import MapCoordinate from "./MapCoordinate";
import Move from "./Move";
import { NoPathHome } from "./PokemonMapState";

export enum ActionType {
  MapSizeSet = "MapSizeSet",
  ImpassablePicked = "impassablePicked",
  StartCoordinatePicked = "StartCoordinatePicked",
  EndCoordinatePicked = "EndCoordinatePicked",
  PathHomeCalculated = "PathHomeCalculated",
}

export interface MapSizeSetAction {
  readonly type: ActionType.MapSizeSet;
  readonly size: number;
}

interface ImpassablePicked {
  readonly type: ActionType.ImpassablePicked;
  readonly coordinate: MapCoordinate;
}

interface StartCoordinatePicked {
  readonly type: ActionType.StartCoordinatePicked;
  readonly coordinate: MapCoordinate;
}

interface EndCoordinatePicked {
  readonly type: ActionType.EndCoordinatePicked;
  readonly coordinate: MapCoordinate;
}

interface PathHomeCalculated {
  readonly type: ActionType.PathHomeCalculated;
  readonly path: Move[] | NoPathHome;
}

type PokemonMapAction =
  | MapSizeSetAction
  | ImpassablePicked
  | StartCoordinatePicked
  | EndCoordinatePicked
  | PathHomeCalculated;

export default PokemonMapAction;
