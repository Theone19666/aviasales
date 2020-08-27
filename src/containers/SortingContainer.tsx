import { connect } from "react-redux";
import { toggleActiveSorting } from "../store/actions/sortingActions";
import Sorting from "../components/Sorting";
import { IObject } from "../interfaces";

const mapStateToProps = (state: IObject) => ({
  sorting: state.sorting,
});

const mapDispatchToProps = (dispatch: Function) => ({
  toggleActiveSorting: (id: number) => dispatch(toggleActiveSorting(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
