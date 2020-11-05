import React from "react";
import grassTilePath from "./images/grasstile.png";
import rockTilePath from "./images/rocktile.png";
import bulbasaurPath from "./images/bulbasaur.png";
import finishTilePath from "./images/finishtile.png";

export enum MapSquareState {
  Open = "Open",
  Start = "Start",
  End = "End",
  Impassible = "Impassible",
  OnPathHome = "OnPathHome",
}

const MAP_SQUARE_IMAGES: Readonly<Record<MapSquareState, JSX.Element>> = {
  [MapSquareState.Open]: <></>,
  [MapSquareState.Start]: (
    <img src={bulbasaurPath} alt={MapSquareState.Start} />
  ),
  [MapSquareState.End]: <img src={finishTilePath} alt={MapSquareState.End} />,
  [MapSquareState.Impassible]: (
    <img src={rockTilePath} alt={MapSquareState.Impassible} />
  ),
  [MapSquareState.OnPathHome]: (
    <img src={grassTilePath} alt={MapSquareState.OnPathHome} />
  ),
};

const MapSquare: React.FC<{
  onClick: () => void;
  mapSquareState: MapSquareState;
}> = ({ onClick, mapSquareState }) => (
  <div
    data-testid="map-square"
    className={`map-square map-square--${mapSquareState}`}
    onClick={mapSquareState === MapSquareState.Open ? onClick : undefined}
  >
    {MAP_SQUARE_IMAGES[mapSquareState]}
  </div>
);

export default MapSquare;
