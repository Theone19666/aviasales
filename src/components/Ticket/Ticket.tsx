import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { IObject } from "../../interfaces";
import classes from "./Ticket.module.scss";

const classNames = require("classnames");

function getDuration(duration: number) {
  //1465 минут
  if (duration > 59) {
    let hours = Math.trunc(duration / 60); // - 24 часов (с остатком 4)
    let hoursCountInMinutes = hours * 60; // 1440 минут
    let minutes = duration - hoursCountInMinutes; //25 минут
    return `${hours}ч ${minutes}м`;
  } else {
    return `${duration}ч`;
  }
}

function getEndTime(startDate: string, duration: number) {
  return moment(startDate).add(duration, "m").format("HH:mm");
}

function getTransferText(tranferCount = 0) {
  if (!tranferCount) return "без пересадок";
  if (tranferCount === 1) {
    return "1 пересадка";
  }
  if (tranferCount >= 2 && tranferCount <= 4)
    return `${tranferCount} пересадки`;
  if (tranferCount > 5 && tranferCount <= 10)
    return `${tranferCount} пересадок`;
}

function getCost(cost: number) {
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

function Ticket(props: IObject = {}): any {
  const { ticket, classNamesList } = props;
  // console.log("ticket", ticket);
  const to = ticket?.segments[0];
  const from = ticket?.segments[1];

  const cost = ticket?.price;
  const wayTitle = `${to.origin} - ${to.destination}`;

  const firstTime = `${moment(to.date).format("HH:mm")} - ${getEndTime(
    to.date,
    to.duration
  )}`;
  const toTransferCount = to.stops.length;
  const firstOnWay = getDuration(to.duration);
  const firstTransfer = to.stops.join(", ");
  const fromWayTitle = `${from.origin} - ${from.destination}`;
  const secondTime = `${moment(to.date).format("HH:mm")} - ${getEndTime(
    from.date,
    from.duration
  )}`;
  const secondOnWay = getDuration(from.duration);
  const fromTransferCount = from.stops.length;
  const secondTransfer = from.stops.join(", ") || "  ";

  const ticketClassName = classNames(classes.Ticket, classNamesList);
  const ticketCostClassName = classNames(classes.Cost);
  const ticketCostWrapperClassName = classNames(classes.CostWrapper);
  const transferWrapperClassName = classNames(classes.TransferWrapper);
  const transferItemWrapperClassName = classNames(
    classes.transferItemWrapperClassName
  );
  const transferTitleClassName = classNames(classes.TransferTitle);
  const transferValueClassName = classNames(classes.TransferValue);
  const transfersWrapperClassName = classNames(classes.TransfersWrapper);
  return (
    <div className={ticketClassName}>
      <div className={ticketCostWrapperClassName}>
        <div className={ticketCostClassName}>{getCost(cost)} Р</div>
        <img
          src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
          alt={ticket.carrier}
        />
      </div>
      <div className={transfersWrapperClassName}>
        <div className={transferWrapperClassName}>
          <div className={transferItemWrapperClassName}>
            <h4 className={transferTitleClassName}>{wayTitle}</h4>
            <div className={transferValueClassName}>{firstTime}</div>
          </div>

          <div className={transferItemWrapperClassName}>
            <h4 className={transferTitleClassName}>в пути</h4>
            <div className={transferValueClassName}>{firstOnWay}</div>
          </div>

          <div className={transferItemWrapperClassName}>
            <h4 className={transferTitleClassName}>
              {getTransferText(toTransferCount)}
            </h4>
            <div className={transferValueClassName}>{firstTransfer}</div>
          </div>
        </div>

        <div className={transferWrapperClassName}>
          <div className={transferItemWrapperClassName}>
            <h4 className={transferTitleClassName}>{fromWayTitle}</h4>
            <div className={transferValueClassName}>{secondTime}</div>
          </div>

          <div className={transferItemWrapperClassName}>
            <h4 className={transferTitleClassName}>в пути</h4>
            <div className={transferValueClassName}>{secondOnWay}</div>
          </div>

          <div className={transferItemWrapperClassName}>
            <h4 className={transferTitleClassName}>
              {getTransferText(fromTransferCount)}
            </h4>
            <div className={transferValueClassName}>{secondTransfer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
Ticket.propTypes = {
  cost: PropTypes.number,
};

Ticket.defaultProps = {
  cost: 0,
};
