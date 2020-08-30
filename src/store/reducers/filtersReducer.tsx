import { IObject } from "../../interfaces";
import { cloneDeep } from "lodash";

// спросить, можно ли так делать или лучше копировать state
function toggleAllFilterCheckbox(
  state: IObject[],
  filterId: number | string
): IObject[] {
  const allFilter = state.find((item: IObject) => item.main);
  if (!allFilter) {
    return state;
  }
  if (Number(allFilter.id) === filterId) {
    if (allFilter.checked) {
      return state.map((item: IObject) => {
        item.checked = true;
        return item;
      });
    } else {
      return state.map((item: IObject) => {
        item.checked = false;
        return item;
      });
    }
  } else {
    const editingFilter = state.find((item: IObject) => item.id === filterId);
    const filtersWithoutEditingFilter = state.filter(
      (item: IObject) => item.id !== filterId && !item.main
    );
    if (editingFilter?.checked) {
      const checkedFiltersWithoutEditingFilter = filtersWithoutEditingFilter.filter(
        (item: IObject) => item.checked && !item.main
      );
      if (
        filtersWithoutEditingFilter.length ===
        checkedFiltersWithoutEditingFilter.length
      ) {
        return state.map((item: IObject) => {
          item.checked = true;
          return item;
        });
      }
    } else {
      allFilter.checked = false;
    }
  }
  return state;
}

function toggleCheckedAttrFilter(state: IObject[], filterId: number | string) {
  if (!state || !filterId) {
    return state;
  }
  const stateClone = cloneDeep(state);
  const editingFilter = stateClone.find(
    (item: IObject) => Number(item.id) === Number(filterId)
  );
  if (!editingFilter) {
    return state;
  }
  editingFilter.checked = !editingFilter.checked;
  stateClone[stateClone.indexOf(editingFilter)] = editingFilter;
  return toggleAllFilterCheckbox(stateClone, filterId);
}

export default function filtersReducer(
  state: IObject[] = [],
  action: IObject
): IObject[] {
  switch (action.type) {
    case "SET_FILTERS_LIST":
      return [...state, ...action.list];
    case "TOGGLE_CHECKED_ATTR_FILTER":
      return toggleCheckedAttrFilter(state, action.filterId);
    default:
      return state;
  }
}
