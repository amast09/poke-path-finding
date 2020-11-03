import MapCoordinate from "./MapCoordinate";

export enum MapState {
  NotSized = "NotSized",
  Sized = "Sized",
  ImpassiblesMarked = "ImpassiblesMarked",
  ImpassiblesAndStartMarked = "ImpassiblesAndStartMarked",
  Built = "Built",
  BuiltAndCalculated = "BuiltAndCalculated",
}

export type NoPathHome = "NoPathHome";

export interface UnsizedMap {
  readonly currentState: MapState.NotSized;
}

interface SizedMap {
  readonly currentState: MapState.Sized;
  readonly size: number;
}

interface MapWithImpassibles {
  readonly currentState: MapState.ImpassiblesMarked;
  readonly size: number;
  readonly impassibles: MapCoordinate[];
}

interface MapWithStartAndImpassibles {
  readonly currentState: MapState.ImpassiblesAndStartMarked;
  readonly size: number;
  readonly impassibles: MapCoordinate[];
  readonly start: MapCoordinate;
}

interface MapBuilt {
  readonly currentState: MapState.Built;
  readonly size: number;
  readonly impassibles: MapCoordinate[];
  readonly start: MapCoordinate;
  readonly end: MapCoordinate;
}

interface MapBuiltAndCalculated {
  readonly currentState: MapState.BuiltAndCalculated;
  readonly size: number;
  readonly impassibles: MapCoordinate[];
  readonly start: MapCoordinate;
  readonly end: MapCoordinate;
  readonly pathHome: MapCoordinate[] | NoPathHome;
}

type PokemonMapState =
  | UnsizedMap
  | SizedMap
  | MapWithImpassibles
  | MapWithStartAndImpassibles
  | MapBuilt
  | MapBuiltAndCalculated;

export default PokemonMapState;
