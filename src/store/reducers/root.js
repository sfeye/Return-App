import { combineReducers } from "redux";
import userReducer from "./userReducer.js";
import jobReducer from "./jobReducer.js";

export default combineReducers({
  userReducer,
  jobReducer,
});
