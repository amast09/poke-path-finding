import {
  MapState,
  MapWithImpassables,
  MapWithStartAndImpassables,
  MapSized,
  MapNotSized,
  MapComplete,
  MapWithPathHome,
} from "./PokemonMapState";
import { MapSquareState } from "./MapSquare";
import getMapSquareState from "./getMapSquareState";

const size = 4;
const ALL_MAP_INDEXES = Array.from({ length: size }).map((_, idx) => idx);
const PATH_HOME = [4, 8, 12, 13, 14];

const mapNotSized: MapNotSized = {
  currentState: MapState.NotSized,
};

const mapSized: MapSized = {
  currentState: MapState.Sized,
  size: 4,
};

const mapWithImpassables: MapWithImpassables = {
  ...mapSized,
  currentState: MapState.ImpassablesMarked,
  impassables: new Set([1, 2]),
};

const mapWithStartAndImpassables: MapWithStartAndImpassables = {
  ...mapWithImpassables,
  currentState: MapState.ImpassablesAndStartMarked,
  start: 0,
};

const mapComplete: MapComplete = {
  ...mapWithStartAndImpassables,
  currentState: MapState.Complete,
  end: 15,
};

const mapWithPathHome: MapWithPathHome = {
  ...mapComplete,
  currentState: MapState.WithPathHome,
  pathHome: PATH_HOME,
};

describe("getMapSquareState", () => {
  describe("when the map is not sized", () => {
    it("returns 'Open' for all squares", () => {
      expect(
        ALL_MAP_INDEXES.every(
          (idx) => getMapSquareState(mapNotSized)(idx) === MapSquareState.Open
        )
      ).toEqual(true);
    });
  });

  describe("when the map is sized", () => {
    it("returns 'Open' for all squares", () => {
      expect(
        ALL_MAP_INDEXES.every(
          (idx) => getMapSquareState(mapSized)(idx) === MapSquareState.Open
        )
      ).toEqual(true);
    });
  });

  describe("when the map is sized with impassables", () => {
    const impassables = Array.from(mapWithImpassables.impassables.values());
    const opens = ALL_MAP_INDEXES.filter(
      (idx) => impassables.indexOf(idx) === -1
    );

    it("returns 'Open' for all open squares", () => {
      expect(
        opens.every(
          (idx) =>
            getMapSquareState(mapWithImpassables)(idx) === MapSquareState.Open
        )
      ).toEqual(true);
    });

    it("returns 'Impassible' for all impassible squares", () => {
      expect(
        impassables.every(
          (idx) =>
            getMapSquareState(mapWithImpassables)(idx) ===
            MapSquareState.Impassible
        )
      ).toEqual(true);
    });
  });

  describe("when the map is sized with impassables and a start", () => {
    const impassables = Array.from(
      mapWithStartAndImpassables.impassables.values()
    );
    const opens = ALL_MAP_INDEXES.filter(
      (idx) =>
        impassables.indexOf(idx) === -1 &&
        mapWithStartAndImpassables.start !== idx
    );

    it("returns 'Open' for all open squares", () => {
      expect(
        opens.every(
          (idx) =>
            getMapSquareState(mapWithStartAndImpassables)(idx) ===
            MapSquareState.Open
        )
      ).toEqual(true);
    });

    it("returns 'Impassible' for all impassible squares", () => {
      expect(
        impassables.every(
          (idx) =>
            getMapSquareState(mapWithStartAndImpassables)(idx) ===
            MapSquareState.Impassible
        )
      ).toEqual(true);
    });

    it("returns 'Start' for the start square", () => {
      expect(
        getMapSquareState(mapWithStartAndImpassables)(
          mapWithStartAndImpassables.start
        )
      ).toEqual(MapSquareState.Start);
    });
  });

  describe("when the map is complete", () => {
    const impassables = Array.from(mapComplete.impassables.values());
    const opens = ALL_MAP_INDEXES.filter(
      (idx) =>
        impassables.indexOf(idx) === -1 &&
        mapComplete.start !== idx &&
        mapComplete.end !== idx
    );

    it("returns 'Open' for all open squares", () => {
      expect(
        opens.every(
          (idx) => getMapSquareState(mapComplete)(idx) === MapSquareState.Open
        )
      ).toEqual(true);
    });

    it("returns 'Impassible' for all impassible squares", () => {
      expect(
        impassables.every(
          (idx) =>
            getMapSquareState(mapComplete)(idx) === MapSquareState.Impassible
        )
      ).toEqual(true);
    });

    it("returns 'Start' for the start square", () => {
      expect(getMapSquareState(mapComplete)(mapComplete.start)).toEqual(
        MapSquareState.Start
      );
    });

    it("returns 'End' for the end square", () => {
      expect(getMapSquareState(mapComplete)(mapComplete.end)).toEqual(
        MapSquareState.End
      );
    });
  });

  describe("when the map has a path home", () => {
    const impassables = Array.from(mapWithPathHome.impassables.values());
    const opens = ALL_MAP_INDEXES.filter(
      (idx) =>
        impassables.indexOf(idx) === -1 &&
        mapWithPathHome.start !== idx &&
        mapWithPathHome.end !== idx &&
        PATH_HOME.indexOf(idx) === -1
    );

    it("returns 'Open' for all open squares", () => {
      expect(
        opens.every(
          (idx) =>
            getMapSquareState(mapWithPathHome)(idx) === MapSquareState.Open
        )
      ).toEqual(true);
    });

    it("returns 'Impassible' for all impassible squares", () => {
      expect(
        impassables.every(
          (idx) =>
            getMapSquareState(mapWithPathHome)(idx) ===
            MapSquareState.Impassible
        )
      ).toEqual(true);
    });

    it("returns 'Start' for the start square", () => {
      expect(getMapSquareState(mapWithPathHome)(mapWithPathHome.start)).toEqual(
        MapSquareState.Start
      );
    });

    it("returns 'End' for the start square", () => {
      expect(getMapSquareState(mapWithPathHome)(mapWithPathHome.end)).toEqual(
        MapSquareState.End
      );
    });

    it("returns 'OnPathHome' for all squares on the path home", () => {
      expect(
        PATH_HOME.every(
          (idx) =>
            getMapSquareState(mapWithPathHome)(idx) ===
            MapSquareState.OnPathHome
        )
      ).toEqual(true);
    });
  });
});
