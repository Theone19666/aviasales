import { getCost, getDuration, getEndTime, getTransferText } from "./utils";

import { ITicketProps } from "./interfaces";
import React from "react";
import classes from "./Ticket.module.scss";
import moment from "moment";

const classNames = require("classnames");

function Ticket(props: ITicketProps) {
  const { ticket, classNamesList } = props;
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
