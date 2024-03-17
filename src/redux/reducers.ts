import { SET_GAME_CONFIG } from "./actionTypes";
import { MexicanTrainGameConfig } from "./types";

interface GameState {
  gameConfig: MexicanTrainGameConfig | null;
}

const initialState: GameState = {
  gameConfig: null,
};

type GameAction = {
  type: typeof SET_GAME_CONFIG;
  payload: MexicanTrainGameConfig;
};

const gameReducer = (state = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case SET_GAME_CONFIG:
      return {
        ...state,
        gameConfig: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
