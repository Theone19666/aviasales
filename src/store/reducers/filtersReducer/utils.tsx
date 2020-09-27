import { IFilterItem } from "../../../interfaces";

function toggleAllFilterCheckbox(
  state: IFilterItem[],
  filterId: number | string
): IFilterItem[] {
  const allFilter = state.find((item: IFilterItem) => item.main);
  if (!allFilter) {
    return state;
  }
  if (Number(allFilter.id) === filterId) {
    if (allFilter.checked) {
      return state.map((item: IFilterItem) => {
        item.checked = true;
        return item;
      });
    } else {
      return state.map((item: IFilterItem) => {
        item.checked = false;
        return item;
      });
    }
  } else {
    const editingFilter = state.find(
      (item: IFilterItem) => item.id === filterId
    );
    const filtersWithoutEditingFilter = state.filter(
      (item: IFilterItem) => item.id !== filterId && !item.main
    );
    if (editingFilter?.checked) {
      const checkedFiltersWithoutEditingFilter = filtersWithoutEditingFilter.filter(
        (item: IFilterItem) => item.checked && !item.main
      );
      if (
        filtersWithoutEditingFilter.length ===
        checkedFiltersWithoutEditingFilter.length
      ) {
        return state.map((item: IFilterItem) => {
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

export function toggleCheckedAttrFilter(
  state: IFilterItem[],
  filterId: number | string
) {
  if (!state || !filterId) {
    return state;
  }
  let stateClone = state.map((item: IFilterItem) => ({ ...item }));
  stateClone = stateClone.map((item: IFilterItem) => {
    if (Number(item.id) === Number(filterId)) item.checked = !item.checked;
    return item;
  });
  return toggleAllFilterCheckbox(stateClone, filterId);
}
