import React from "react";
import PokemonMap from "./PokemonMap";

const App: React.FC = () => (
  <div
    style={{
      display: "flex",
      width: "80vw",
      height: "80vh",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <PokemonMap size={3} />
  </div>
);

export default App;
