export interface IObject {
  [key: string]: any;
}

export interface IFilterItem {
  id: number;
  name: string;
  checked: boolean;
}

export interface ISortingItem {
  id: number;
  name: string;
  active: boolean;
}
