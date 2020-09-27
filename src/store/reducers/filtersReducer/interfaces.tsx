import { IFilterItem } from "../../../interfaces";

export interface IAction {
  type: string;
  list: IFilterItem[];
  filterId: number;
}
