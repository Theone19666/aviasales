import { IFilterItem } from "../../interfaces";

export const toggleCheckedFilter = (filterId: number | string) => {
  return {
    type: "TOGGLE_CHECKED_ATTR_FILTER",
    filterId,
  };
};

export const setFiltersList = (payload: IFilterItem[]) => {
  return {
    type: "SET_FILTERS_LIST",
    list: payload,
  };
};
