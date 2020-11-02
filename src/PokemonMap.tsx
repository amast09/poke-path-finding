import React from "react";
import PokemonMapSquare from "./PokemonMapSquare";

const PokemonMap: React.FC<Readonly<{ size: number }>> = ({ size }) => (
  <div
    style={{
      display: "grid",
      gridTemplate: `repeat(${size}, auto) / repeat(${size}, auto)`,
      width: "100%",
      height: "100%",
    }}
  >
    {Array.from({ length: size * 3 }, () => (
      <PokemonMapSquare />
    ))}
  </div>
);

export default PokemonMap;
