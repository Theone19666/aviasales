import { ISortingItem } from "../../interfaces";

export interface ISorting {
  sortings?: ISortingItem[];
  toggleActiveSorting(id: number): void;
  toggleSortingId(id: number): void;
  setSortingList(sortingList: ISortingItem[]): void;
}

export interface IState {
  sortingList: Array<ISortingItem>;
}
