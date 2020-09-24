import { IFilterItem } from "../../interfaces";

export interface IFilters {
  className?: string;
  filters: IFilterItem[];
  toggleCheckedFilter(id: number): void;
  setIsFetching(isFetcing: boolean): void;
  setFiltersList(filters: IFilterItem[]): void;
}

export interface IState {
  filters: Array<IFilterItem>;
  isFetching: boolean;
}
