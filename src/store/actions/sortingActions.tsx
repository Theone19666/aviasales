import { ISortingItem } from "../../interfaces";

export const toggleActiveSorting = (payload: number | string) => {
  return {
    type: "TOGGLE_ACTIVE_SORTING",
    sortingId: payload,
  };
};

export const setSortingList = (payload: ISortingItem[] = []) => {
  return {
    type: "SET_SORTING_LIST",
    sortingList: payload,
  };
};
