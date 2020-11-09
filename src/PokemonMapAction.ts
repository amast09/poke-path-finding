import { NoPathHome } from "./PokemonMapState";

export enum ActionType {
  SizeSet = "SizeSet",
  ImpassableToggled = "ImpassableToggled",
  StartPicked = "StartPicked",
  EndPicked = "EndPicked",
  PathHomeCalculated = "PathHomeCalculated",
}

export interface SizeSetAction {
  readonly type: ActionType.SizeSet;
  readonly size: number;
}

export interface ImpassableToggledAction {
  readonly type: ActionType.ImpassableToggled;
  readonly squareIdx: number;
}

export interface StartPickedAction {
  readonly type: ActionType.StartPicked;
  readonly squareIdx: number;
}

export interface EndPickedAction {
  readonly type: ActionType.EndPicked;
  readonly squareIdx: number;
}

interface PathHomeCalculated {
  readonly type: ActionType.PathHomeCalculated;
  readonly path: number[] | NoPathHome;
}

type PokemonMapAction =
  | SizeSetAction
  | ImpassableToggledAction
  | StartPickedAction
  | EndPickedAction
  | PathHomeCalculated;

export default PokemonMapAction;
