import { Alert, Spin } from "antd";
import { IFilterItem, IState, ITicket } from "../../interfaces";
import React, { useEffect, useState } from "react";
import { cheapestSorting, fastestSorting, getFilteredTickets } from "./utils";
import {
  fetchTickets,
  setIsFetching,
} from "../../store/actions/ticketsActions";

import { ITickets } from "./interfaces";
import Sorting from "../../containers/Sorting";
import Ticket from "../../components/Ticket";
import classes from "./Tickets.module.scss";
import { connect } from "react-redux";

const classNames = require("classnames");

function Tickets(props: ITickets) {
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
      .map((ticket: ITicket, index: number) => {
        return (
          <Ticket
            ticket={ticket}
            key={String(index)}
            classNamesList={ticketClassName}
          />
        );
      });
  } else if (filters.filter((item: IFilterItem) => item.checked).length) {
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
      <Sorting toggleSortingId={toggleSortingId} />
      {fetchingHtml}
      {errorHtml}
      {ticketsHtml}
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return state
    ? {
        ...state.ticketsObj,
        filters: state.filters,
      }
    : state;
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchTickets: () => dispatch(fetchTickets()),
  setIsFetching: (isFetching: boolean) => dispatch(setIsFetching(isFetching)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
