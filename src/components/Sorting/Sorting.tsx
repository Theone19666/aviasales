import classes from "./Sorting.module.scss";
import { IObject } from "../../interfaces";

import React from "react";

import PropTypes from "prop-types";

const classNames = require("classnames");

function Sorting(props: IObject) {
  const { sorting, toggleActiveSorting, toggleSortingId } = props;
  const ticketsTabsClassName = classNames(classes.TicketsTabs);
  const sortingHtml = sorting.map((item: IObject, index: number) => {
    return (
      <div
        key={String(item.id)}
        className={classNames(
          classes.TicketsTab,
          index === 1 ? classes.TicketsTab_cheap : classes.TicketsTab_fastest,
          item.active ? classes.TicketsTab_active : ""
        )}
        onClick={() => {
          toggleActiveSorting(item.id);
          toggleSortingId(item.id);
        }}
      >
        {item.name}
      </div>
    );
  });
  return <div className={ticketsTabsClassName}>{sortingHtml}</div>;
}

export default Sorting;
