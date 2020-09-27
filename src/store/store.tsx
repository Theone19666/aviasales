import { applyMiddleware, compose, createStore } from "redux";

import reducer from "./reducer";
import thunk from "redux-thunk";

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
