import axios from "axios";
import { MapComplete } from "./PokemonMapState";
import Move from "./Move";
import NoPathHome, { NO_PATH_HOME } from "./NoPathHome";
import getMapCoordinatesForSquareIndex from "./getMapCoordinatesForSquareIndex";

const CITRINE_INFORMATICS_API_BASE_URL =
  "https://frozen-reef-96768.herokuapp.com";

const GET_PATH_HOME_END_POINT = "find-path";

export interface MapCoordinate {
  readonly x: number;
  readonly y: number;
}

export interface GetPathHomeApiRequest {
  readonly sideLength: number;
  readonly impassables: MapCoordinate[];
  readonly startingLoc: MapCoordinate;
  readonly endingLoc: MapCoordinate;
}

export interface GetPathHome200ApiResponse {
  readonly moves: Move[];
}

export type PathHome = Move[] | NoPathHome;

const getPathHome = (completeMap: MapComplete): Promise<PathHome> => {
  const getMapCoordinate = getMapCoordinatesForSquareIndex(completeMap.size);
  const requestBody: GetPathHomeApiRequest = {
    impassables: Array.from(completeMap.impassables).map(getMapCoordinate),
    sideLength: completeMap.size,
    startingLoc: getMapCoordinate(completeMap.start),
    endingLoc: getMapCoordinate(completeMap.end),
  };

  return axios
    .post<GetPathHome200ApiResponse>(
      `${CITRINE_INFORMATICS_API_BASE_URL}/${GET_PATH_HOME_END_POINT}`,
      requestBody,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )
    .then((response) => response.data.moves)
    .catch((e: any) => {
      if (
        "response" in e &&
        "status" in e.response &&
        e.response.status === 400
      ) {
        return NO_PATH_HOME;
      } else {
        throw e;
      }
    });
};

export default getPathHome;
