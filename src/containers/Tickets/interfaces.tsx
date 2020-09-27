import { IFilterItem, ITicket } from "../../interfaces";

export interface ITickets {
  fetchTickets: Function;
  tickets: ITicket[];
  isError: boolean;
  isFetching: boolean;
  filters: IFilterItem[];
  setIsFetching: Function;
}
