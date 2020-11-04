import React from "react";

const INPUT_NAME = "sizeSelect";
const MIN_MAP_SIZE = 2;
const MAX_MAP_SIZE = 10;
const VALID_SIZES = Array.from(
  { length: MAX_MAP_SIZE + 1 - MIN_MAP_SIZE },
  (_, idx) => idx + MIN_MAP_SIZE
);

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
      {VALID_SIZES.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
    <button type="submit">Select Size</button>
  </form>
);

export default MapSizeSelection;
