import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Spin, Alert } from "antd";
import moment from "moment";

import { IObject } from "../../interfaces";
import classes from "./Tickets.module.scss";
import Ticket from "../Ticket";
import SortingContainer from "../../containers/SortingContainer";
import store from "../../store/store";

const classNames = require("classnames");

function cheapestSorting(a: IObject, b: IObject): number {
  if (!a || !b) return 0;
  return a.price - b.price;
}

function fastestSorting(a: IObject, b: IObject): number {
  if (!a || !b) return 0;
  const firstADuration = a.segments[0].duration;
  const secondADuration = a.segments[1].duration;
  const firstBDuration = b.segments[0].duration;
  const secondBDuration = b.segments[1].duration;
  return firstADuration + secondADuration - (firstBDuration + secondBDuration);
}

function getFilteredTickets(filters: IObject, tickets: IObject[]): IObject[] {
  if (!filters || !tickets) return [];
  const transfers = filters
    .filter((item: IObject) => item.checked && !item.main)
    .map((item: IObject) => item.transfers);
  if (!transfers.length) {
    return tickets;
  }
  return tickets.filter(
    (item: IObject) =>
      transfers.includes(item.segments[0].stops.length) ||
      transfers.includes(item.segments[1].stops.length)
  );
}

function Tickets(props: IObject = {}) {
  const {
    fetchTickets,
    tickets,
    isError,
    isFetching,
    filters,
    setIsFetching,
  } = props;

  const [sortingType, setState] = useState(1);

  let filteredTickets = getFilteredTickets(filters, tickets);
  //console.log("ticketsObj", ticketsObj);
  // const { tickets, isError, isFetching } = ticketsObj;
  const ticketClassName = classNames(classes.Ticket);
  const ticketsClassName = classNames(classes.Tickets, {
    [classes.Tickets__Fetching]: isFetching,
  });
  const loaderWrapperClassName = classNames(classes.LoaderWrapper);

  const sortingFunction = sortingType === 1 ? cheapestSorting : fastestSorting;

  const toggleSortingId = (sortingId: number) => {
    setIsFetching(true);
    setState(sortingId);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);
  let ticketsListHtml: any = [];

  if (filteredTickets && filteredTickets.length) {
    ticketsListHtml = filteredTickets
      .sort(sortingFunction)
      .map((ticket: IObject, index: number) => {
        return (
          <Ticket
            ticket={ticket}
            key={String(index)}
            classNamesList={ticketClassName}
          />
        );
      });
  } else if (filters.filter((item: IObject) => item.checked).length) {
    ticketsListHtml = (
      <Alert
        type="success"
        message="Рейсов, подходящих под заданные фильтры, не найдено"
      />
    );
  }

  const errorHtml = isError ? (
    <Alert
      type="error"
      message="Произошла ошибка при получении списка билетов"
    />
  ) : null;
  const fetchingHtml = isFetching ? (
    <Spin size="large" className={loaderWrapperClassName} />
  ) : null;
  const ticketsHtml = !isError ? (
    <div className={ticketsClassName}>{ticketsListHtml}</div>
  ) : null;

  return (
    <div className="TicketsWrapper">
      <SortingContainer toggleSortingId={toggleSortingId} />
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
