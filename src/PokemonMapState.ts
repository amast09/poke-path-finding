import MapCoordinate from "./MapCoordinate";

export enum MapState {
  NotSized = "NotSized",
  Sized = "Sized",
  ImpassablesMarked = "ImpassablesMarked",
  ImpassablesAndStartMarked = "ImpassablesAndStartMarked",
  Complete = "Complete",
  WithPathHome = "WithPathHome",
}

export type NoPathHome = "NoPathHome";

export interface MapNotSized {
  readonly currentState: MapState.NotSized;
}

export interface MapSized {
  readonly currentState: MapState.Sized;
  readonly size: number;
}

export interface MapWithImpassables {
  readonly currentState: MapState.ImpassablesMarked;
  readonly size: number;
  readonly impassables: MapCoordinate[];
}

export interface MapWithStartAndImpassables {
  readonly currentState: MapState.ImpassablesAndStartMarked;
  readonly size: number;
  readonly impassables: MapCoordinate[];
  readonly start: MapCoordinate;
}

export interface MapComplete {
  readonly currentState: MapState.Complete;
  readonly size: number;
  readonly impassables: MapCoordinate[];
  readonly start: MapCoordinate;
  readonly end: MapCoordinate;
}

export interface MapWithPathHome {
  readonly currentState: MapState.WithPathHome;
  readonly size: number;
  readonly impassables: MapCoordinate[];
  readonly start: MapCoordinate;
  readonly end: MapCoordinate;
  readonly pathHome: MapCoordinate[] | NoPathHome;
}

type PokemonMapState =
  | MapNotSized
  | MapSized
  | MapWithImpassables
  | MapWithStartAndImpassables
  | MapComplete
  | MapWithPathHome;

export default PokemonMapState;
