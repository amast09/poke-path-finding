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
  readonly squareIdx: number;
}

interface StartCoordinatePicked {
  readonly type: ActionType.StartCoordinatePicked;
  readonly squareIdx: number;
}

interface EndCoordinatePicked {
  readonly type: ActionType.EndCoordinatePicked;
  readonly squareIdx: number;
}

interface PathHomeCalculated {
  readonly type: ActionType.PathHomeCalculated;
  readonly path: number[] | NoPathHome;
}

type PokemonMapAction =
  | MapSizeSetAction
  | ImpassablePicked
  | StartCoordinatePicked
  | EndCoordinatePicked
  | PathHomeCalculated;

export default PokemonMapAction;
