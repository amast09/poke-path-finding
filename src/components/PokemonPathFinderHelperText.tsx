import React from "react";
import { PathFinderState } from "./PokemonPathFinder";

const PokemonPathFinderHelperText: React.FC<Readonly<{
  pathFinderState: PathFinderState;
  pathHomeExists?: boolean;
}>> = ({ pathFinderState, pathHomeExists }) => {
  switch (pathFinderState) {
    case PathFinderState.UserPickingMapSize:
      return <h2>Pick a Map Size</h2>;
    case PathFinderState.UserMarkingImpassables:
      return <h2>Pick Impassable Squares on the Map</h2>;
    case PathFinderState.UserMarkingStart:
      return <h2>Pick Start Square on the Map</h2>;
    case PathFinderState.UserMarkingEnd:
      return <h2>Pick End Square on the Map</h2>;
    case PathFinderState.DoneCreatingMap:
      return <h2>Click Below to Find Path Home</h2>;
    case PathFinderState.LoadingPathHome:
      return <h2>Loading the Path Home</h2>;
    case PathFinderState.LoadingPathHomeComplete:
      return (
        <h2>
          {pathHomeExists ? "Path Home Calculated" : "No Path Home Possible"}
        </h2>
      );
    case PathFinderState.LoadingPathHomeFailed:
      return <h2>Path Calculation Failed Unexpectedly</h2>;
  }
};

export default PokemonPathFinderHelperText;
