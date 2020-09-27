import { combineReducers } from "redux";
import filtersReducer from "./reducers/filtersReducer";
import sortingReducer from "./reducers/sortingReducer";
import ticketsReducer from "./reducers/ticketsReducer";

export default combineReducers({
  filters: filtersReducer,
  sorting: sortingReducer,
  ticketsObj: ticketsReducer,
});
