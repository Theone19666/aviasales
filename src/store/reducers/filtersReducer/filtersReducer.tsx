import { IAction } from "./interfaces";
import { IFilterItem } from "../../../interfaces";
import { toggleCheckedAttrFilter } from "./utils";

export default function filtersReducer(
  state: IFilterItem[] = [],
  action: IAction
): IFilterItem[] {
  switch (action.type) {
    case "SET_FILTERS_LIST":
      return [...state, ...action.list];
    case "TOGGLE_CHECKED_ATTR_FILTER":
      return toggleCheckedAttrFilter(state, action.filterId);
    default:
      return state;
  }
}
