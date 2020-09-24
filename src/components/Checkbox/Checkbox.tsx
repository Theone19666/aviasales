import { ICheckbox } from "./interfaces";
import React from "react";

function Checkbox(props: ICheckbox) {
  const { className, onChange, checked = false } = props;
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={className}
    />
  );
}
export default Checkbox;
