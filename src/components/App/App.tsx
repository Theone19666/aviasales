import React from "react";
import Filters from "../Filters";
import FilterContainer from "../../containers/FiltersContainer";
import Tickets from "../Tickets";
import classes from "./App.module.scss";
import logo from "./img/Logo.svg";

function App() {
  const filtersConfig = {
    className: classes.Filters,
  };
  return (
    <main className={classes.App}>
      <img src={logo} className={classes.Logo} />
      <div className={classes.Content}>
        <FilterContainer {...filtersConfig} />
        <Tickets />
      </div>
    </main>
  );
}

export default App;
