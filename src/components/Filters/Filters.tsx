import React from "react";

import classes from "./Filters.module.scss";
import Checkbox from "../Checkbox";
import { IObject } from "../../interfaces";

const classNames = require("classnames");

function Filters(props: IObject = {}) {
  const { className } = props;
  const filterClassName = classNames(classes.Filters, className);
  const titleClassNames = classNames(classes.Title, classes.Filters__Title);
  const FilterNameClassNames = classNames(classes.FilterName);
  const labelClassNames = classNames(classes.Filter);
  const checkboxClassNames = classNames(classes.Checkbox);
  const filters = [
    {
      name: "Все",
      id: 1,
      checked: false,
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
  const filtersHtml = filters.map((item) => {
    return (
      <label key={String(item.id)} className={labelClassNames}>
        <Checkbox checked={item.checked} className={checkboxClassNames} />
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
