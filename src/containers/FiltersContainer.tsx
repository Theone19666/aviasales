import { connect } from "react-redux";
import { toggleCheckedFilter } from "../store/actions/filtersActions";
import Filters from "../components/Filters";
import { IObject } from "../interfaces";

const mapStateToProps = (state: IObject) => ({
  filters: state.filters,
});

const mapDispatchToProps = (dispatch: Function) => ({
  toggleCheckedFilter: (id: number) => dispatch(toggleCheckedFilter(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
