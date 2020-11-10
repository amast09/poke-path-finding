import NoPathHome from "./types/NoPathHome";

export enum MapState {
  NotSized = "NotSized",
  WithImpassables = "WithImpassables",
  ImpassablesAndStartMarked = "ImpassablesAndStartMarked",
  Complete = "Complete",
  WithPathHome = "WithPathHome",
}

export interface MapNotSized {
  readonly currentState: MapState.NotSized;
}

export interface MapWithImpassables {
  readonly currentState: MapState.WithImpassables;
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
  | MapWithImpassables
  | MapWithStartAndImpassables
  | MapComplete
  | MapWithPathHome;

export default PokemonMapState;
