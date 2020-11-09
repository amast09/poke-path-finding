import {
  ActionType,
  EndPickedAction,
  ImpassableToggledAction,
  SizeSetAction,
  StartPickedAction,
} from "./PokemonMapAction";
import {
  MapComplete,
  MapNotSized,
  MapState,
  MapWithImpassables,
  MapWithPathHome,
  MapWithStartAndImpassables,
} from "./PokemonMapState";
import pokemonMapReducer from "./pokemonMapReducer";

const mapNotSized: MapNotSized = {
  currentState: MapState.NotSized,
};

const mapWithImpassables: MapWithImpassables = {
  size: 4,
  currentState: MapState.WithImpassables,
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
  describe("SizeSet Action", () => {
    const action: SizeSetAction = {
      type: ActionType.SizeSet,
      size: 4,
    };

    describe("when map is 'NotSized'", () => {
      it("noops when the size is less than 2", () => {
        const size1Action: SizeSetAction = {
          type: ActionType.SizeSet,
          size: 1,
        };
        expect(pokemonMapReducer(mapNotSized, size1Action)).toEqual(
          mapNotSized
        );
      });

      it("noops when the size is greater than 10", () => {
        const size11Action: SizeSetAction = {
          type: ActionType.SizeSet,
          size: 11,
        };
        expect(pokemonMapReducer(mapNotSized, size11Action)).toEqual(
          mapNotSized
        );
      });

      it("updates the map to be a sized map with no impassibles with a size between 3-10", () => {
        const size5Action: SizeSetAction = {
          type: ActionType.SizeSet,
          size: 5,
        };
        const expectedState: MapWithImpassables = {
          currentState: MapState.WithImpassables,
          impassables: new Set<number>(),
          size: size5Action.size,
        };

        expect(pokemonMapReducer(mapNotSized, size5Action)).toEqual(
          expectedState
        );
      });
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

  describe("ImpassableToggled Action", () => {
    const action: ImpassableToggledAction = {
      type: ActionType.ImpassableToggled,
      squareIdx: 15,
    };

    it("noops when the map is 'NotSized'", () => {
      expect(pokemonMapReducer(mapNotSized, action)).toEqual(mapNotSized);
    });

    describe("when the map is 'WithImpassables'", () => {
      it("noops when the squareIdx is not on the map", () => {
        const actionWithIdxNotOnMap: ImpassableToggledAction = {
          type: ActionType.ImpassableToggled,
          squareIdx: mapWithImpassables.size * mapWithImpassables.size,
        };

        expect(
          pokemonMapReducer(mapWithImpassables, actionWithIdxNotOnMap)
        ).toEqual(mapWithImpassables);
      });

      it("noops when there are only 2 open squares (1 for start and 1 for end)", () => {
        const currentState: MapWithImpassables = {
          size: 2,
          currentState: MapState.WithImpassables,
          impassables: new Set([0, 1]),
        };
        const action: ImpassableToggledAction = {
          type: ActionType.ImpassableToggled,
          squareIdx: 2,
        };

        expect(pokemonMapReducer(currentState, action)).toEqual(currentState);
      });

      it("adds the square as an impassible when the squareIdx is on the map", () => {
        const currentState: MapWithImpassables = {
          ...mapWithImpassables,
          currentState: MapState.WithImpassables,
          impassables: new Set([3]),
        };
        const expectedNextState: MapWithImpassables = {
          ...mapWithImpassables,
          currentState: MapState.WithImpassables,
          impassables: new Set([3, action.squareIdx]),
        };

        expect(pokemonMapReducer(currentState, action)).toEqual(
          expectedNextState
        );
      });

      it("removes the square as an impassible when the squareIdx is already an impassible", () => {
        const currentState: MapWithImpassables = {
          ...mapWithImpassables,
          currentState: MapState.WithImpassables,
          impassables: new Set([action.squareIdx]),
        };
        const expectedNextState: MapWithImpassables = {
          ...mapWithImpassables,
          currentState: MapState.WithImpassables,
          impassables: new Set(),
        };

        expect(pokemonMapReducer(currentState, action)).toEqual(
          expectedNextState
        );
      });

      it("removes the square as an impassible when the squareIdx is already an impassible and the squares have reached the limit of impassables", () => {
        const action: ImpassableToggledAction = {
          type: ActionType.ImpassableToggled,
          squareIdx: 2,
        };
        const currentState: MapWithImpassables = {
          size: 2,
          currentState: MapState.WithImpassables,
          impassables: new Set([0, action.squareIdx]),
        };
        const expectedNextState: MapWithImpassables = {
          size: 2,
          currentState: MapState.WithImpassables,
          impassables: new Set([0]),
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

  describe("StartPicked Action", () => {
    const action: StartPickedAction = {
      type: ActionType.StartPicked,
      squareIdx: 3,
    };

    it("noops when the map is 'NotSized'", () => {
      expect(pokemonMapReducer(mapNotSized, action)).toEqual(mapNotSized);
    });

    describe("when the map is 'ImpassablesMarked'", () => {
      it("noops for an invalid square index", () => {
        const actionWithInvalidSquareIndex: StartPickedAction = {
          type: ActionType.StartPicked,
          squareIdx: 1000,
        };

        expect(
          pokemonMapReducer(mapWithImpassables, actionWithInvalidSquareIndex)
        ).toEqual(mapWithImpassables);
      });

      it("sets the start state when the square index is in the map", () => {
        const expectedNextState: MapWithStartAndImpassables = {
          ...mapWithImpassables,
          currentState: MapState.ImpassablesAndStartMarked,
          start: action.squareIdx,
        };

        expect(pokemonMapReducer(mapWithImpassables, action)).toEqual(
          expectedNextState
        );
      });
    });

    describe("when the map is 'ImpassablesAndStartMarked'", () => {
      it("noops for an invalid square index", () => {
        const actionWithInvalidSquareIndex: StartPickedAction = {
          type: ActionType.StartPicked,
          squareIdx: -1,
        };

        expect(
          pokemonMapReducer(
            mapWithStartAndImpassables,
            actionWithInvalidSquareIndex
          )
        ).toEqual(mapWithStartAndImpassables);
      });

      it("overrides the start state when the square index is in the map", () => {
        const expectedNextState: MapWithStartAndImpassables = {
          ...mapWithStartAndImpassables,
          start: action.squareIdx,
        };

        expect(pokemonMapReducer(mapWithStartAndImpassables, action)).toEqual(
          expectedNextState
        );
      });
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

  describe("EndPicked Action", () => {
    const action: EndPickedAction = {
      type: ActionType.EndPicked,
      squareIdx: 3,
    };

    it("noops when the map is 'NotSized'", () => {
      expect(pokemonMapReducer(mapNotSized, action)).toEqual(mapNotSized);
    });

    it("noops when the map is 'ImpassablesMarked'", () => {
      expect(pokemonMapReducer(mapWithImpassables, action)).toEqual(
        mapWithImpassables
      );
    });

    describe("when the map is 'ImpassablesAndStartMarked'", () => {
      it("noops for an invalid square index", () => {
        const actionWithInvalidSquareIndex: EndPickedAction = {
          type: ActionType.EndPicked,
          squareIdx: -1,
        };

        expect(
          pokemonMapReducer(
            mapWithStartAndImpassables,
            actionWithInvalidSquareIndex
          )
        ).toEqual(mapWithStartAndImpassables);
      });

      it("sets the end state when the square index is in the map", () => {
        const expectedNextState: MapComplete = {
          ...mapWithStartAndImpassables,
          currentState: MapState.Complete,
          end: action.squareIdx,
        };

        expect(pokemonMapReducer(mapWithStartAndImpassables, action)).toEqual(
          expectedNextState
        );
      });
    });

    describe("noops when the map is 'Complete'", () => {
      it("noops for an invalid square index", () => {
        const actionWithInvalidSquareIndex: EndPickedAction = {
          type: ActionType.EndPicked,
          squareIdx: -1,
        };

        expect(
          pokemonMapReducer(mapComplete, actionWithInvalidSquareIndex)
        ).toEqual(mapComplete);
      });

      it("sets the end state when the square index is in the map", () => {
        const expectedNextState: MapComplete = {
          ...mapComplete,
          end: action.squareIdx,
        };

        expect(pokemonMapReducer(mapComplete, action)).toEqual(
          expectedNextState
        );
      });
    });

    it("noops when the map is 'WithPathHome'", () => {
      expect(pokemonMapReducer(mapWithPathHome, action)).toEqual(
        mapWithPathHome
      );
    });
  });
});
