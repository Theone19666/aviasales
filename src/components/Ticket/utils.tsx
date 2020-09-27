import moment from "moment";

export function getDuration(duration: number) {
  //пример: 1465 минут
  if (duration > 59) {
    let hours = Math.trunc(duration / 60); // - 24 часов (с остатком 4)
    let hoursCountInMinutes = hours * 60; // 1440 минут
    let minutes = duration - hoursCountInMinutes; //25 минут
    return `${hours}ч ${minutes}м`;
  } else {
    return `${duration}ч`;
  }
}

export function getEndTime(startDate: string, duration: number) {
  return moment(startDate).add(duration, "m").format("HH:mm");
}

export function getTransferText(tranferCount = 0) {
  if (!tranferCount) return "без пересадок";
  if (tranferCount === 1) {
    return "1 пересадка";
  }
  if (tranferCount >= 2 && tranferCount <= 4)
    return `${tranferCount} пересадки`;
  if (tranferCount > 5 && tranferCount <= 10)
    return `${tranferCount} пересадок`;
}

export function getCost(cost: number) {
  const stringCost = String(cost);
  let result = "";
  stringCost
    .split("")
    .reverse()
    .forEach((item, index) => {
      if (
        result.length % 3 === 0 &&
        index !== 0 &&
        index !== stringCost.length - 1
      ) {
        result += ` ${item}`;
      } else {
        result += item;
      }
    });
  return result.split("").reverse().join("");
}
