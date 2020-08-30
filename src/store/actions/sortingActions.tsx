import { IObject } from "../../interfaces";
export const toggleActiveSorting = (sortingId: number | string) => {
  return {
    type: "TOGGLE_ACTIVE_SORTING",
    sortingId,
  };
};
