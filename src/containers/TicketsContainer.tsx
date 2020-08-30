import { connect } from "react-redux";
import { fetchTickets, setIsFetching } from "../store/actions/ticketsActions";
import Tickets from "../components/Tickets";
import { IObject } from "../interfaces";

const mapStateToProps = (state: IObject) => {
  return {
    /*tickets: state.ticketsObj.tickets,
    isError: state.ticketsObj.isError,
    isFetching: state.ticketsObj.isFetching, */
    ...state.ticketsObj,
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchTickets: () => dispatch(fetchTickets()),
  setIsFetching: (isFetching: boolean) => dispatch(setIsFetching(isFetching)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
