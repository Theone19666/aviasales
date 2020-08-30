import { connect } from "react-redux";
import { toggleCheckedFilter } from "../store/actions/filtersActions";
import { setIsFetching } from "../store/actions/ticketsActions";
import Filters from "../components/Filters";
import { IObject } from "../interfaces";

const mapStateToProps = (state: IObject) => ({
  filters: state.filters,
  isFetching: state.isFetching,
});

const mapDispatchToProps = (dispatch: Function) => ({
  toggleCheckedFilter: (id: number) => dispatch(toggleCheckedFilter(id)),
  setIsFetching: (isFetching: boolean) => dispatch(setIsFetching(isFetching)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
