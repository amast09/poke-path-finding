import {
  ActionType,
  ImpassableToggledAction,
  MapSizeSetAction,
} from "./PokemonMapAction";
import {
  MapComplete,
  MapNotSized,
  MapSized,
  MapState,
  MapWithImpassables,
  MapWithPathHome,
  MapWithStartAndImpassables,
} from "./PokemonMapState";
import pokemonMapReducer from "./pokemonMapReducer";

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
  start: 1,
};

const mapComplete: MapComplete = {
  ...mapWithStartAndImpassables,
  currentState: MapState.Complete,
  end: 15,
};

const mapWithPathHome: MapWithPathHome = {
  ...mapComplete,
  currentState: MapState.WithPathHome,
  pathHome: [4, 8, 12, 13, 14],
};

describe("pokemonMapReducer", () => {
  describe("MapSizeSet Action", () => {
    const action: MapSizeSetAction = {
      type: ActionType.MapSizeSet,
      size: 4,
    };

    describe("when map is 'NotSized'", () => {
      it("noops when the size is less than 2", () => {
        const size1Action: MapSizeSetAction = {
          type: ActionType.MapSizeSet,
          size: 1,
        };
        expect(pokemonMapReducer(mapNotSized, size1Action)).toEqual(
          mapNotSized
        );
      });

      it("noops when the size is greater than 10", () => {
        const size11Action: MapSizeSetAction = {
          type: ActionType.MapSizeSet,
          size: 11,
        };
        expect(pokemonMapReducer(mapNotSized, size11Action)).toEqual(
          mapNotSized
        );
      });

      it("updates the map to be a sized map with a size between 3-10", () => {
        const size5Action: MapSizeSetAction = {
          type: ActionType.MapSizeSet,
          size: 5,
        };
        const expectedState: MapSized = {
          currentState: MapState.Sized,
          size: size5Action.size,
        };

        expect(pokemonMapReducer(mapNotSized, size5Action)).toEqual(
          expectedState
        );
      });
    });

    it("noops when the map is 'Sized'", () => {
      expect(pokemonMapReducer(mapSized, action)).toEqual(mapSized);
    });

    it("noops when the map is 'ImpassablesMarked'", () => {
      expect(pokemonMapReducer(mapWithImpassables, action)).toEqual(
        mapWithImpassables
      );
    });

    it("noops when the map is 'ImpassablesAndStartMarked'", () => {
      expect(pokemonMapReducer(mapWithStartAndImpassables, action)).toEqual(
        mapWithStartAndImpassables
      );
    });

    it("noops when the map is 'Complete'", () => {
      expect(pokemonMapReducer(mapComplete, action)).toEqual(mapComplete);
    });

    it("noops when the map is 'WithPathHome'", () => {
      expect(pokemonMapReducer(mapWithPathHome, action)).toEqual(
        mapWithPathHome
      );
    });
  });

  describe("MapSizeSet Action", () => {
    const action: ImpassableToggledAction = {
      type: ActionType.ImpassableToggled,
      squareIdx: 2,
    };

    it("noops when the map is 'NotSized'", () => {
      expect(pokemonMapReducer(mapNotSized, action)).toEqual(mapNotSized);
    });

    describe("when the map is 'Sized'", () => {
      it("noops when the squareIdx is not on the map", () => {
        const actionWithIdxNotOnMap: ImpassableToggledAction = {
          type: ActionType.ImpassableToggled,
          squareIdx: mapSized.size,
        };

        expect(pokemonMapReducer(mapSized, actionWithIdxNotOnMap)).toEqual(
          mapSized
        );
      });

      it("adds the square as an impassible when the squareIdx is on the map", () => {
        const currentState: MapWithImpassables = {
          ...mapSized,
          currentState: MapState.ImpassablesMarked,
          impassables: new Set([3]),
        };
        const expectedNextState: MapWithImpassables = {
          ...mapSized,
          currentState: MapState.ImpassablesMarked,
          impassables: new Set([3, action.squareIdx]),
        };

        expect(pokemonMapReducer(currentState, action)).toEqual(
          expectedNextState
        );
      });

      it("removes the square as an impassible when the squareIdx is already an impassible", () => {
        const currentState: MapWithImpassables = {
          ...mapSized,
          currentState: MapState.ImpassablesMarked,
          impassables: new Set([action.squareIdx]),
        };
        const expectedNextState: MapWithImpassables = {
          ...mapSized,
          currentState: MapState.ImpassablesMarked,
          impassables: new Set(),
        };

        expect(pokemonMapReducer(currentState, action)).toEqual(
          expectedNextState
        );
      });
    });

    it("noops when the map is 'ImpassablesAndStartMarked'", () => {
      expect(pokemonMapReducer(mapWithStartAndImpassables, action)).toEqual(
        mapWithStartAndImpassables
      );
    });

    it("noops when the map is 'Complete'", () => {
      expect(pokemonMapReducer(mapComplete, action)).toEqual(mapComplete);
    });

    it("noops when the map is 'WithPathHome'", () => {
      expect(pokemonMapReducer(mapWithPathHome, action)).toEqual(
        mapWithPathHome
      );
    });
  });
});
