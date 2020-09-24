import { ISorting, IState } from "./interfaces";
import React, { useEffect } from "react";
import {
  setSortingList,
  toggleActiveSorting,
} from "../../store/actions/sortingActions";

import { ISortingItem } from "../../interfaces";
import classes from "./Sorting.module.scss";
import { connect } from "react-redux";
import { sortingList } from "../../lists";

const classNames = require("classnames");

function Sorting(props: ISorting) {
  const {
    sortings,
    toggleActiveSorting,
    toggleSortingId,
    setSortingList,
  } = props;
  const ticketsTabsClassName = classNames(classes.TicketsTabs);
  useEffect(() => {
    setSortingList(sortingList);
  }, []);
  const sortingHtml = sortings?.map((item: ISortingItem, index: number) => {
    const { id, name, active } = item;
    return (
      <div
        key={String(id)}
        className={classNames(
          classes.TicketsTab,
          index === 1 ? classes.TicketsTab_cheap : classes.TicketsTab_fastest,
          active ? classes.TicketsTab_active : ""
        )}
        onClick={() => {
          toggleActiveSorting(id);
          toggleSortingId(id);
        }}
      >
        {name}
      </div>
    );
  });
  return <div className={ticketsTabsClassName}>{sortingHtml}</div>;
}

const mapStateToProps = (state: IState) => ({
  sortingList: state.sortingList,
});

const mapDispatchToProps = (dispatch: Function) => ({
  toggleActiveSorting: (id: number) => dispatch(toggleActiveSorting(id)),
  setSortingList: (sortingList: ISortingItem[]) =>
    dispatch(setSortingList(sortingList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
