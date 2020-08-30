import { IObject } from "../../interfaces";
export const toggleCheckedFilter = (filterId: number | string) => {
  return {
    type: "TOGGLE_CHECKED_ATTR_FILTER",
    filterId,
  };
};
