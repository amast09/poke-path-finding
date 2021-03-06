import Move from "./Move";
import NoPathHome from "./NoPathHome";

export enum ActionType {
  SizeSet = "SizeSet",
  ImpassableToggled = "ImpassableToggled",
  StartPicked = "StartPicked",
  EndPicked = "EndPicked",
  PathHomeCalculated = "PathHomeCalculated",
  Reset = "Reset",
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

export interface PathHomeCalculated {
  readonly type: ActionType.PathHomeCalculated;
  readonly moves: Move[] | NoPathHome;
}

export interface Reset {
  readonly type: ActionType.Reset;
}

type PokemonMapAction =
  | SizeSetAction
  | ImpassableToggledAction
  | StartPickedAction
  | EndPickedAction
  | PathHomeCalculated
  | Reset;

export default PokemonMapAction;
