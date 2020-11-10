import React from "react";
import MapSquare, { MapSquareState } from "./MapSquare";

const PokemonMap: React.FC<Readonly<{
  onSquareToggle: (squareIdx: number) => void;
  mapSize: number;
  getMapSquareState: (squareIdx: number) => MapSquareState;
}>> = ({ onSquareToggle, mapSize, getMapSquareState }) => (
  <div
    style={{
      display: "grid",
      gridTemplate: `repeat(${mapSize}, auto) / repeat(${mapSize}, auto)`,
      width: "100%",
      height: "100%",
    }}
  >
    {Array.from({ length: mapSize * mapSize }, (_, idx) => (
      <MapSquare
        key={idx}
        onClick={() => onSquareToggle(idx)}
        mapSquareState={getMapSquareState(idx)}
      />
    ))}
  </div>
);

export default PokemonMap;
