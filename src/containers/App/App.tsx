import Filters from "../../containers/Filters";
import React from "react";
import TicketsContainer from "../../containers/TicketsContainer";
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
        <TicketsContainer />
      </div>
    </main>
  );
}

export default App;
