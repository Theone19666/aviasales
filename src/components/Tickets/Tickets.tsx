import React from "react";
import PropTypes from "prop-types";

import { IObject } from "../../interfaces";
import classes from "./Tickets.module.scss";
import Ticket from "../Ticket";
import SortingContainer from "../../containers/SortingContainer";

const classNames = require("classnames");

function Tickets(props: IObject = {}) {
  const ticketClassName = classNames(classes.Ticket);
  // const ticketsWrapperClassName = classNames(classes.TicketsWrapper);
  const ticketsTabsClassName = classNames(classes.TicketsTabs);
  const cheapTicketTabClassName = classNames(
    classes.TicketsTab,
    classes.TicketsTab_cheap,
    classes.TicketsTab_active
  );
  const fastestActiveTicketsTabClassName = classNames(
    classes.TicketsTab,

    classes.TicketsTab_fastest
  );
  const ticket = {
    cost: "13 400",
    firstTime: "10:45 – 08:00",
    firstOnWay: "21ч 15м",
    firstTransfer: "HKG, JNB",
    secondTime: "11:20 – 00:50",
    secondOnWay: "13ч 30м",
    secondTransfer: "HKG",
    wayTitle: "MOW – HKT",
  };
  let ticketsHtml = [];
  for (let i = 0; i < 5; i++) {
    ticketsHtml.push(
      <Ticket {...ticket} key={String(i)} classNamesList={ticketClassName} />
    );
  }
  return (
    <div className="TicketsWrapper">
      <SortingContainer />
      <div className="Tickets">{ticketsHtml}</div>
    </div>
  );
}

export default Tickets;
Tickets.propTypes = {};

Tickets.defaultProps = {};
