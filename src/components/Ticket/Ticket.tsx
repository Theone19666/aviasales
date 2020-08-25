import React from "react";
import PropTypes from "prop-types";

import { IObject } from "../../interfaces";
import classes from "./Ticket.module.scss";
import S7 from "./img/S7.svg";

const classNames = require("classnames");

function Ticket(props: IObject = {}): any {
  const {
    cost,
    firstTime,
    firstOnWay,
    firstTransfer,
    secondTime,
    secondOnWay,
    secondTransfer,
    classNamesList,
    wayTitle,
  } = props;
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
        <div className={ticketCostClassName}>{cost}</div>
        <img src={S7} alt="S7" />
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
            <h4 className={transferTitleClassName}>2 пересадки</h4>
            <div className={transferValueClassName}>{firstTransfer}</div>
          </div>
        </div>

        <div className={transferWrapperClassName}>
          <div className={transferItemWrapperClassName}>
            <h4 className={transferTitleClassName}>{wayTitle}</h4>
            <div className={transferValueClassName}>{secondTime}</div>
          </div>

          <div className={transferItemWrapperClassName}>
            <h4 className={transferTitleClassName}>в пути</h4>
            <div className={transferValueClassName}>{secondOnWay}</div>
          </div>

          <div className={transferItemWrapperClassName}>
            <h4 className={transferTitleClassName}>1 пересадка</h4>
            <div className={transferValueClassName}>{secondTransfer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
Ticket.propTypes = {
  cost: PropTypes.string,
};

Ticket.defaultProps = {
  cost: "",
};
