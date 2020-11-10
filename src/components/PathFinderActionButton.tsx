import React from "react";
import { PathFinderState } from "./PokemonPathFinder";

const PathFinderActionButton: React.FC<Readonly<{
  pathFinderState: PathFinderState;
}>> = ({ pathFinderState }) => {
  switch (pathFinderState) {
    case PathFinderState.UserPickingMapSize:
      return <button type="submit">Set Map Size</button>;
    case PathFinderState.UserMarkingImpassables:
      return <button type="submit">Done Marking Impassables</button>;
    case PathFinderState.UserMarkingStart:
      return <button type="submit">Done Marking Start</button>;
    case PathFinderState.UserMarkingEnd:
      return <button type="submit">Done Marking End</button>;
    case PathFinderState.DoneCreatingMap:
      return <button type="submit">Find Poke Path!</button>;
    case PathFinderState.LoadingPathHome:
      return <button disabled={true}>Loading...</button>;
    case PathFinderState.LoadingPathHomeComplete:
      return <button type="submit">Reset</button>;
    case PathFinderState.LoadingPathHomeFailed:
      return <button type="submit">Path Failed, try again?</button>;
  }
};

export default PathFinderActionButton;
