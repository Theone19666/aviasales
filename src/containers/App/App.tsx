import Filters from "../../containers/Filters";
import React from "react";
import Tickets from "../Tickets";
import classes from "./App.module.scss";
import logo from "./img/Logo.svg";

// import FilterContainer from "../../containers/FiltersContainer";

function App() {
  const filtersConfig = {
    className: classes.Filters,
  };
  return (
    <main className={classes.App}>
      <img src={logo} className={classes.Logo} />
      <div className={classes.Content}>
        <Filters {...filtersConfig} />
        <Tickets />
      </div>
    </main>
  );
}

export default App;
