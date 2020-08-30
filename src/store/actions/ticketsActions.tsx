import { IObject } from "../../interfaces";
import { cpuUsage } from "process";
export const setTickets = (tickets: IObject[]) => {
  return {
    type: "SET_TICKETS",
    tickets,
  };
};

export const setIsFetching = (isFetching: boolean) => {
  return {
    type: "SET_IS_FETCHING",
    isFetching,
  };
};

export const setIsError = (isError: boolean) => {
  return {
    type: "SET_IS_ERROR",
    isError,
  };
};

function getTickets(searchKey: string, dispatch: Function) {
  let resultList: IObject[] = [];
  function sendGetTicketsRequest() {
    return fetch(
      `https://front-test.beta.aviasales.ru/tickets?searchId=${searchKey}`
    )
      .then(
        (resp) => {
          if (typeof resp !== "string") {
            return resp.json();
          }
          throw new Error(resp);
        },
        (error) => {
          console.log("An error occurred.", error);
          dispatch(setIsFetching(false));
          dispatch(setIsError(true));
          return error;
        }
      )
      .then(
        (result) => {
          resultList = [...resultList, ...result?.tickets];
          /* if (!result.stop) {
            sendGetTicketsRequest();
          } else {
            return resultList;
          } */
          return resultList;
        },
        (error) => {
          console.log("An error occurred.", error);
          dispatch(setIsFetching(false));
          dispatch(setIsError(true));
          return error;
        }
      )
      .then((result) => {
        console.log("result getTickets", result);
        if (result) {
          dispatch(setIsFetching(false));
          dispatch(setTickets(result));
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  return sendGetTicketsRequest();
}

export function fetchTickets() {
  // Thunk middleware знает, как обращаться с функциями.
  // Он передает метод dispatch в качестве аргумента функции,
  // т.к. это позволяет отправить экшен самостоятельно.

  return function (dispatch: Function) {
    // Первая отправка: состояние приложения обновлено,
    // чтобы сообщить, что запускается вызов API.

    //    dispatch(getTickets(subreddit))

    // Функция, вызываемая Thunk middleware, может возвращать значение,
    // которое передается как возвращаемое значение метода dispatch.

    // В этом случае мы возвращаем promise.
    // Thunk middleware не требует этого, но это удобно для нас.
    dispatch(setIsFetching(true));
    const result: IObject[] = [];
    return fetch(`https://front-test.beta.aviasales.ru/search`)
      .then(
        (response) => {
          /*let result;
          if (typeof response === "object") {
            result = response.json();
          }
          return result; */
          if (typeof response === "string") {
            throw new Error(response);
          }
          return response.json();
        },
        // Не используйте catch, потому что это также
        // перехватит любые ошибки в диспетчеризации и в результате рендеринга, что приведет к                         // циклу ошибок «Unexpected batch number».
        // https://github.com/facebook/react/issues/6895
        (error) => {
          console.log("An error occurred.", error);
          dispatch(setIsFetching(false));
          dispatch(setIsError(true));
          return error;
        }
      )
      .then(
        (json) => {
          if (typeof json !== "object") {
            return json;
          }

          getTickets(
            json.searchId,
            dispatch
          ); /*.then((result) => {
            console.log("result getTickets", result);
            if (result) {
              dispatch(setIsFetching(false));
              dispatch(setTickets(result));
            }
          }); */
        },
        (error) => {
          console.log("An error occurred.", error);
          dispatch(setIsFetching(false));
          dispatch(setIsError(true));
          return error;
        }
      )
      .catch((error) => {
        dispatch(setIsFetching(false));
        dispatch(setIsError(true));
        throw new Error(error);
      });
  };
}
