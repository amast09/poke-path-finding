import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MapSquare, { MapSquareState } from "./MapSquare";

const MAP_SQUARE_TEST_ID = "map-square";

describe("<MapSquare />", () => {
  let onClickMock: any;

  beforeEach(() => {
    onClickMock = jest.fn();
  });

  it("renders an empty tile when it has a state 'Open'", () => {
    const state = MapSquareState.Open;
    const { container } = render(
      <MapSquare onClick={onClickMock} mapSquareState={state} />
    );

    expect(container.firstChild).toBeEmpty();
  });

  it("renders a bulbasaur when it has a state 'Start'", () => {
    const state = MapSquareState.Start;
    const expectedSrc = "bulbasaur.png";
    render(<MapSquare onClick={onClickMock} mapSquareState={state} />);

    expect(screen.getByAltText(state)).toHaveAttribute("src", expectedSrc);
  });

  it("renders a finish tile when it has a state 'End'", () => {
    const state = MapSquareState.End;
    const expectedSrc = "finishtile.png";
    render(<MapSquare onClick={onClickMock} mapSquareState={state} />);

    expect(screen.getByAltText(state)).toHaveAttribute("src", expectedSrc);
  });

  it("renders the rock tile when it has a state 'Impassible'", () => {
    const state = MapSquareState.Impassible;
    const expectedSrc = "rocktile.png";
    render(<MapSquare onClick={onClickMock} mapSquareState={state} />);

    expect(screen.getByAltText(state)).toHaveAttribute("src", expectedSrc);
  });

  it("renders the grass tile when it has a state 'OnPathHome'", () => {
    const state = MapSquareState.OnPathHome;
    const expectedSrc = "grasstile.png";
    render(<MapSquare onClick={onClickMock} mapSquareState={state} />);

    expect(screen.getByAltText(state)).toHaveAttribute("src", expectedSrc);
  });

  it("fires the onClick when it has a state 'Open'", () => {
    render(
      <MapSquare onClick={onClickMock} mapSquareState={MapSquareState.Open} />
    );

    fireEvent.click(screen.getByTestId(MAP_SQUARE_TEST_ID));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("does not fire the onClick when it has a state 'Start'", () => {
    render(
      <MapSquare onClick={onClickMock} mapSquareState={MapSquareState.Start} />
    );

    fireEvent.click(screen.getByTestId(MAP_SQUARE_TEST_ID));

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("does not fire the onClick when it has a state 'End'", () => {
    render(
      <MapSquare onClick={onClickMock} mapSquareState={MapSquareState.End} />
    );

    fireEvent.click(screen.getByTestId(MAP_SQUARE_TEST_ID));

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("does not fire the onClick when it has a state 'Impassible'", () => {
    render(
      <MapSquare
        onClick={onClickMock}
        mapSquareState={MapSquareState.Impassible}
      />
    );

    fireEvent.click(screen.getByTestId(MAP_SQUARE_TEST_ID));

    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("does not fire the onClick when it has a state 'OnPathHome'", () => {
    render(
      <MapSquare
        onClick={onClickMock}
        mapSquareState={MapSquareState.OnPathHome}
      />
    );

    fireEvent.click(screen.getByTestId(MAP_SQUARE_TEST_ID));

    expect(onClickMock).not.toHaveBeenCalled();
  });
});
