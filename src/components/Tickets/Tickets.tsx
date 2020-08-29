import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Spin, Alert } from "antd";
import moment from "moment";

import { IObject } from "../../interfaces";
import classes from "./Tickets.module.scss";
import Ticket from "../Ticket";
import SortingContainer from "../../containers/SortingContainer";

const classNames = require("classnames");

function Tickets(props: IObject = {}) {
  const { fetchTickets, tickets, isError, isFetching } = props;
  //console.log("ticketsObj", ticketsObj);
  // const { tickets, isError, isFetching } = ticketsObj;
  console.log("tickets", tickets);
  const ticketClassName = classNames(classes.Ticket);

  /*const ticket = {
    cost: "13 400",
    firstTime: "10:45 – 08:00",
    firstOnWay: "21ч 15м",
    firstTransfer: "HKG, JNB",
    secondTime: "11:20 – 00:50",
    secondOnWay: "13ч 30м",
    secondTransfer: "HKG",
    wayTitle: "MOW – HKT",
  }; */

  useEffect(() => {
    fetchTickets();
  }, []);
  const ticketsListHtml = [];
  if (tickets && tickets.length) {
    for (let i = 0; i < 5; i++) {
      const ticket = tickets[i];
      ticketsListHtml.push(
        <Ticket
          ticket={ticket}
          key={String(i)}
          classNamesList={ticketClassName}
        />
      );
    }
  }

  const errorHtml = isError ? (
    <Alert
      type="error"
      message="Произошла ошибка при получении списка билетов"
    />
  ) : (
    ""
  );
  const fetchingHtml = isFetching ? <Spin size="large" /> : "";
  const ticketsHtml =
    !isError && !isFetching ? (
      <div className="Tickets">{ticketsListHtml}</div>
    ) : (
      ""
    );

  return (
    <div className="TicketsWrapper">
      <SortingContainer />
      {fetchingHtml}
      {errorHtml}
      {ticketsHtml}
    </div>
  );
}

export default Tickets;
Tickets.propTypes = {
  ticketsObj: PropTypes.object,
  fetchTickets: PropTypes.func,
};

Tickets.defaultProps = {
  ticketsObj: {
    tickets: [],
    isError: false,
    isFetching: false,
  },
  fetchTickets: () => {},
};
