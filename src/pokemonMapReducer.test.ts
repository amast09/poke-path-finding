import { ActionType, MapSizeSetAction } from "./PokemonMapAction";
import {
  MapState,
  MapWithImpassables,
  MapWithStartAndImpassables,
  MapSized,
  MapNotSized,
  MapComplete,
  MapWithPathHome,
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
  impassables: [{ x: 1, y: 1 }],
};

const mapWithStartAndImpassables: MapWithStartAndImpassables = {
  ...mapWithImpassables,
  currentState: MapState.ImpassablesAndStartMarked,
  start: { x: 0, y: 0 },
};

const mapComplete: MapComplete = {
  ...mapWithStartAndImpassables,
  currentState: MapState.Complete,
  end: { x: 3, y: 3 },
};

const mapWithPathHome: MapWithPathHome = {
  ...mapComplete,
  currentState: MapState.WithPathHome,
  pathHome: [
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
  ],
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
});
