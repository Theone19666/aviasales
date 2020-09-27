import { IFilterItem, ITicket } from "../../interfaces";

export function cheapestSorting(a: ITicket, b: ITicket): number {
  if (!a || !b) return 0;
  return a.price - b.price;
}

export function fastestSorting(a: ITicket, b: ITicket): number {
  if (!a || !b) return 0;
  const firstADuration = a.segments[0].duration;
  const secondADuration = a.segments[1].duration;
  const firstBDuration = b.segments[0].duration;
  const secondBDuration = b.segments[1].duration;
  return firstADuration + secondADuration - (firstBDuration + secondBDuration);
}

export function getFilteredTickets(
  filters: IFilterItem[],
  tickets: ITicket[]
): ITicket[] {
  if (!filters || !tickets) return [];
  const transfers = filters
    .filter((item: IFilterItem) => item.checked && !item.main)
    .map((item: IFilterItem) => item.transfers);
  if (!transfers.length) {
    return tickets;
  }
  return tickets.filter(
    (item: ITicket) =>
      transfers.includes(item.segments[0].stops.length) ||
      transfers.includes(item.segments[1].stops.length)
  );
}
