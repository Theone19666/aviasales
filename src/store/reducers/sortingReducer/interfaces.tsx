import { ISortingItem } from "../../../interfaces";

export interface IAction {
  type: string;
  sortingList: ISortingItem[];
  sortingId: number;
}
