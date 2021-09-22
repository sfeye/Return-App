import rootReducer from "./reducers/root.js";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, composeEnhancers(middleware));

export default store;
