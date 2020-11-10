import React from "react";

export const SIZE_SELECT_INPUT_NAME = "sizeSelect";
const MIN_MAP_SIZE = 2;
const MAX_MAP_SIZE = 10;
const VALID_SIZES = Array.from(
  { length: MAX_MAP_SIZE + 1 - MIN_MAP_SIZE },
  (_, idx) => idx + MIN_MAP_SIZE
);

const MapSizeSelect: React.FC = () => (
  <select id="size-select" name={SIZE_SELECT_INPUT_NAME}>
    {VALID_SIZES.map((size) => (
      <option key={size} value={size}>
        {size}
      </option>
    ))}
  </select>
);

export default MapSizeSelect;
