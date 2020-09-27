export interface IObject {
  [key: string]: any;
}

export interface IFilterItem {
  id: number;
  name: string;
  main?: boolean;
  transfers?: number;
  checked: boolean;
}

export interface ISortingItem {
  id: number;
  name: string;
  active: boolean;
}
interface ISegments {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
}

export interface ITicket {
  segments: ISegments[];
  price: number;
  carrier: string;
}

export interface ITicketsStore {
  tickets: ITicket[];
  isFetching: boolean;
  isError: boolean;
}

export interface IState {
  ticketsObj: ITicketsStore;
  filters: IFilterItem[];
}
