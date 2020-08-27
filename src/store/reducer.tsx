import { combineReducers } from "redux";

import filtersReducer from "./reducers/filtersReducer";
import sortingReducer from "./reducers/sortingReducer";

export default combineReducers({
  filters: filtersReducer,
  sorting: sortingReducer,
});
