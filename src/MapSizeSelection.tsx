import React from "react";

const INPUT_NAME = "sizeSelect";

const MapSizeSelection: React.FC<Readonly<{
  onSizeSet: (size: number) => void;
}>> = ({ onSizeSet }) => (
  <form
    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSizeSet(Number((e.currentTarget.elements as any)[INPUT_NAME].value));
    }}
  >
    <label htmlFor="size-select">Pick a Map Size</label>
    <select id="size-select" name={INPUT_NAME}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <button type="submit">Select Size</button>
  </form>
);

export default MapSizeSelection;
