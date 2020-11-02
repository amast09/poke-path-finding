import MapCoordinate from "./MapCoordinate";

export enum MapState {
  "NotSized" = "NotSized",
  "Sized" = "Sized",
  "ImpassiblesMarked" = "ImpassiblesMarked",
  "ImpassiblesAndStartMarked" = "ImpassiblesAndStartMarked",
  "Built" = "Built",
  "WithPathHome" = "WithPathHome",
  "WithNoPathHome" = "WithNoPathHome",
}

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

interface MapWithNoPathHome {
  readonly currentState: MapState.WithNoPathHome;
  readonly size: number;
  readonly impassibles: MapCoordinate[];
  readonly start: MapCoordinate;
  readonly end: MapCoordinate;
}

interface MapWithPathHome {
  readonly currentState: MapState.WithPathHome;
  readonly size: number;
  readonly impassibles: MapCoordinate[];
  readonly start: MapCoordinate;
  readonly end: MapCoordinate;
  readonly pathHome: MapCoordinate[];
}

type PokemonMapState =
  | UnsizedMap
  | SizedMap
  | MapWithImpassibles
  | MapWithStartAndImpassibles
  | MapBuilt
  | MapWithNoPathHome
  | MapWithPathHome;

export default PokemonMapState;
