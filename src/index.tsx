import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import App from "./components/App/App";
import "./main.scss";
import store from "./store/store";
import { fetchTickets } from "./store/actions/ticketsActions";

const filters = [
  {
    name: "Все",
    id: 1,
    checked: false,
    main: true,
  },
  {
    name: "Без пересадок",
    id: 2,
    checked: true,
  },
  {
    name: "1 пересадка",
    id: 3,
    checked: true,
  },
  {
    name: "2 пересадки",
    id: 4,
    checked: true,
  },
  {
    name: "3 пересадки",
    id: 5,
    checked: true,
  },
];

const sortingList = [
  {
    name: "Самый дешёвый",
    id: 1,
    active: true,
  },
  {
    name: "Самый быстрый",
    id: 2,
    active: false,
  },
];

store.dispatch({
  type: "SET_FILTERS_LIST",
  list: filters,
});

store.dispatch({
  type: "SET_SORTING_LIST",
  list: sortingList,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
