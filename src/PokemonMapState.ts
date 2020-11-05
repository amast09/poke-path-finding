export enum MapState {
  NotSized = "NotSized",
  Sized = "Sized",
  ImpassablesMarked = "ImpassablesMarked",
  ImpassablesAndStartMarked = "ImpassablesAndStartMarked",
  Complete = "Complete",
  WithPathHome = "WithPathHome",
}

export type NoPathHome = "NoPathHome";

export const NO_PATH_HOME: NoPathHome = "NoPathHome";

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
  readonly impassables: Set<number>;
}

export interface MapWithStartAndImpassables {
  readonly currentState: MapState.ImpassablesAndStartMarked;
  readonly size: number;
  readonly impassables: Set<number>;
  readonly start: number;
}

export interface MapComplete {
  readonly currentState: MapState.Complete;
  readonly size: number;
  readonly impassables: Set<number>;
  readonly start: number;
  readonly end: number;
}

export interface MapWithPathHome {
  readonly currentState: MapState.WithPathHome;
  readonly size: number;
  readonly impassables: Set<number>;
  readonly start: number;
  readonly end: number;
  readonly pathHome: number[] | NoPathHome;
}

type PokemonMapState =
  | MapNotSized
  | MapSized
  | MapWithImpassables
  | MapWithStartAndImpassables
  | MapComplete
  | MapWithPathHome;

export default PokemonMapState;
