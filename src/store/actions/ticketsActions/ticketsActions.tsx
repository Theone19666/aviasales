import { ITicket } from "../../../interfaces";

const searchUrl = "https://front-test.beta.aviasales.ru/search";
const ticketsUrl = `https://front-test.beta.aviasales.ru/tickets`;

export const setTickets = (payload: ITicket[]) => {
  return {
    type: "SET_TICKETS",
    tickets: payload,
  };
};

export const setIsFetching = (payload: boolean) => {
  return {
    type: "SET_IS_FETCHING",
    isFetching: payload,
  };
};

export const setIsError = (payload: boolean) => {
  return {
    type: "SET_IS_ERROR",
    isError: payload,
  };
};

function getTickets(searchKey: string, dispatch: Function) {
  if (!searchKey) {
    dispatch(setIsFetching(false));
    dispatch(setIsError(true));
    return;
  }
  let resultList: ITicket[] = [];
  function sendGetTicketsRequest() {
    return fetch(`${ticketsUrl}?searchId=${searchKey}`)
      .then((resp) => {
        if (typeof resp === "string") {
          throw new Error(resp);
        }
        let result: any = resp.json();
        resultList = [...resultList, ...result?.tickets];
        dispatch(setTickets(resultList));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setIsFetching(false));
      });
  }
  return sendGetTicketsRequest();
}

export function fetchTickets() {
  return function (dispatch: Function) {
    dispatch(setIsFetching(true));
    return fetch(searchUrl)
      .then((response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        let result: any = response.json();
        getTickets(result.searchId, dispatch);
      })
      .catch((error) => {
        dispatch(setIsError(true));
        console.log(error);
      })
      .finally(() => {
        dispatch(setIsFetching(false));
      });
  };
}
