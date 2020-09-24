import { IFilters, IState } from "./interfaces";
import React, { useEffect } from "react";
import {
  setFiltersList,
  toggleCheckedFilter,
} from "../../store/actions/filtersActions";

import Checkbox from "../../components/Checkbox";
import { IFilterItem } from "../../interfaces";
import classes from "./Filters.module.scss";
import { connect } from "react-redux";
import { filtersList } from "../../lists";
import { setIsFetching } from "../../store/actions/ticketsActions";

const classNames = require("classnames");

function Filters(props: IFilters) {
  const {
    className,
    filters,
    toggleCheckedFilter,
    setIsFetching,
    setFiltersList,
  } = props;
  const filterClassName = classNames(classes.Filters, className);
  const titleClassNames = classNames(classes.Title, classes.Filters__Title);
  const FilterNameClassNames = classNames(classes.FilterName);
  const labelClassNames = classNames(classes.Filter);
  const checkboxClassNames = classNames(classes.Checkbox);

  useEffect(() => {
    setFiltersList(filtersList);
  }, []);

  const filtersHtml = filters.map((item: IFilterItem) => {
    const { id, checked, name } = item;
    return (
      <label key={String(id)} className={labelClassNames}>
        <Checkbox
          checked={checked}
          className={checkboxClassNames}
          onChange={() => {
            setIsFetching(true);
            toggleCheckedFilter(id);
            setIsFetching(false);
          }}
        />
        <span className={FilterNameClassNames}>{name}</span>
      </label>
    );
  });
  return (
    <div className={filterClassName}>
      <h3 className={titleClassNames}>Количество пересадок</h3>
      {filtersHtml}
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  filters: state.filters,
  isFetching: state.isFetching,
});

const mapDispatchToProps = (dispatch: Function) => ({
  toggleCheckedFilter: (id: number) => dispatch(toggleCheckedFilter(id)),
  setIsFetching: (isFetching: boolean) => dispatch(setIsFetching(isFetching)),
  setFiltersList: (filters: IFilterItem[]) => dispatch(setFiltersList(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
