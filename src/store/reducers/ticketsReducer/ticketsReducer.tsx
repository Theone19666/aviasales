import { IAction } from "./interfaces";
import { ITicketsStore } from "../../../interfaces";

export default function ticketsReducer(
  state: ITicketsStore = { tickets: [], isFetching: false, isError: false },
  action: IAction
): ITicketsStore {
  switch (action.type) {
    case "SET_TICKETS":
      return {
        ...state,
        tickets: action.tickets,
      };
    case "SET_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_IS_ERROR":
      return {
        ...state,
        isError: action.isError,
      };
    default:
      return state;
  }
}
