import { ISortingItem } from "../../../interfaces";

export function toggleActiveSorting(
  state: ISortingItem[],
  id: number
): ISortingItem[] {
  const stateClone = state.map((item: ISortingItem) => ({ ...item }));
  return stateClone.map((item: ISortingItem) => {
    if (item.id === id) item.active = true;
    return item;
  });
}
