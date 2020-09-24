import { IObject } from "../../interfaces";
import { cloneDeep } from "lodash";

function toggleActiveSorting(state: IObject[], id: number): IObject[] {
  const stateClone = cloneDeep(state);
  const activeSorting = stateClone.find((item: IObject) => item.id === id);
  const notActiveSortings =
    stateClone.filter((item: IObject) => item.id !== id) || [];
  if (!activeSorting) return state;
  stateClone.forEach((item: IObject) => {
    item.active = false;
  });
  activeSorting.active = true;
  return stateClone;
}

export default function sortingReducer(
  state: IObject[] = [],
  action: IObject
): IObject[] {
  switch (action.type) {
    case "SET_SORTING_LIST":
      return [...state, ...action.sortingList];
    case "TOGGLE_ACTIVE_SORTING":
      return toggleActiveSorting(state, action.sortingId);
    default:
      return state;
  }
}
