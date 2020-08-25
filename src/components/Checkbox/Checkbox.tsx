import React from "react";
import PropTypes from "prop-types";
import { IObject } from "../../interfaces";

function Checkbox(props: IObject) {
  const { className, onChange, checked } = props;
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={className}
    />
  );
}
Checkbox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  className: "toggle",
  onChange: () => {},
  checked: false,
};
export default Checkbox;
