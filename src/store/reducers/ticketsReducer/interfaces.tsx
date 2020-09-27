import { ITicket } from "../../../interfaces";

export interface IAction {
  tickets: ITicket[];
  isFetching: boolean;
  isError: boolean;
  type: string;
}
