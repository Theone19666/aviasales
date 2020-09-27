import { IAction } from "./interfaces";
import { ISortingItem } from "../../../interfaces";
import { toggleActiveSorting } from "./utils";

export default function sortingReducer(
  state: ISortingItem[] = [],
  action: IAction
): ISortingItem[] {
  switch (action.type) {
    case "SET_SORTING_LIST":
      return [...state, ...action.sortingList];
    case "TOGGLE_ACTIVE_SORTING":
      return toggleActiveSorting(state, action.sortingId);
    default:
      return state;
  }
}
