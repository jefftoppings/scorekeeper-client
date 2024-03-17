import { combineReducers } from "redux";
import gameReducer from "./reducers";

const rootReducer = combineReducers({
  game: gameReducer,
  // Other reducers can be combined here if needed
});

export default rootReducer;
