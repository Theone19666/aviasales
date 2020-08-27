import React from "react";
import PropTypes from "prop-types";

import classes from "./Filters.module.scss";
import Checkbox from "../Checkbox";
import { IObject } from "../../interfaces";

const classNames = require("classnames");

function Filters(props: IObject) {
  const { className, filters, toggleCheckedFilter } = props;
  const filterClassName = classNames(classes.Filters, className);
  const titleClassNames = classNames(classes.Title, classes.Filters__Title);
  const FilterNameClassNames = classNames(classes.FilterName);
  const labelClassNames = classNames(classes.Filter);
  const checkboxClassNames = classNames(classes.Checkbox);

  const filtersHtml = filters.map((item: IObject) => {
    return (
      <label key={String(item.id)} className={labelClassNames}>
        <Checkbox
          checked={item.checked}
          className={checkboxClassNames}
          onChange={() => toggleCheckedFilter(item.id)}
        />
        <span className={FilterNameClassNames}>{item.name}</span>
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

export default Filters;
Filters.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.array,
  toggleCheckedFilter: PropTypes.func,
};

Filters.defaultProps = {
  className: "",
  filters: [],
  toggleCheckedFilter: () => {},
};
