/**
 * @jest-environment node
 */
import axios from "axios";
import nock from "nock";
import { MapComplete, MapState } from "./PokemonMapState";
import getPathHome, { GetPathHome200ApiResponse } from "./getPathHome";
import { NO_PATH_HOME } from "./NoPathHome";
import Move from "./Move";

const CITRINE_INFORMATICS_API_BASE_URL =
  "https://frozen-reef-96768.herokuapp.com";
axios.defaults.baseURL = CITRINE_INFORMATICS_API_BASE_URL;

const GET_PATH_HOME_END_POINT = "/find-path";

const completeMap: MapComplete = {
  currentState: MapState.Complete,
  size: 3,
  start: 0,
  end: 8,
  impassables: new Set([1, 3]),
};

const expectedRequestBody = {
  startingLoc: { x: 0, y: 0 },
  endingLoc: { x: 2, y: 2 },
  sideLength: 3,
  impassables: [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ],
};

describe("getPathHome", () => {
  it("rejects when the API returns a `500`", async () => {
    nock(CITRINE_INFORMATICS_API_BASE_URL)
      .post(GET_PATH_HOME_END_POINT, expectedRequestBody)
      .reply(500);

    await expect(getPathHome(completeMap)).rejects.toThrow();
  });

  it("resolves to `NoPathHome` when the API returns a `400`", async () => {
    nock(CITRINE_INFORMATICS_API_BASE_URL)
      .post(GET_PATH_HOME_END_POINT, expectedRequestBody)
      .reply(400);

    await expect(getPathHome(completeMap)).resolves.toEqual(NO_PATH_HOME);
  });

  it("resolves to the returned response when the API returns a 200", async () => {
    const mockedResponse: GetPathHome200ApiResponse = {
      moves: [Move.D, Move.D, Move.D, Move.R, Move.R],
    };

    nock(CITRINE_INFORMATICS_API_BASE_URL)
      .post(GET_PATH_HOME_END_POINT, expectedRequestBody)
      .reply(200, mockedResponse);

    await expect(getPathHome(completeMap)).resolves.toEqual(
      mockedResponse.moves
    );
  });
});
