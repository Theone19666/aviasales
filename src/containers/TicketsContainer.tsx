import { connect } from "react-redux";
import { fetchTickets } from "../store/actions/ticketsActions";
import Tickets from "../components/Tickets";
import { IObject } from "../interfaces";

const mapStateToProps = (state: IObject) => {
  console.log("state", state);
  return {
    /*tickets: state.ticketsObj.tickets,
    isError: state.ticketsObj.isError,
    isFetching: state.ticketsObj.isFetching, */
    ...state.ticketsObj,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchTickets: () => dispatch(fetchTickets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
