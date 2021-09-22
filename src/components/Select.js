import React, { useState, useRef } from "react";

import { useOutsideToggle } from "../util/useOutsideToggle";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { ReactComponent as Check } from "../assets/check.svg";

import "../css/Select.css";

function Select({ listOptions, activeOption, applyChanges }) {
  const [showOptions, setShowOptions] = useState(false);

  // use ref and hook so we can click outside the object to close
  const selectRef = useRef(null);
  useOutsideToggle(selectRef, () => setShowOptions(false));

  // close the options and do whatever the parent wants with the data
  const changeSelected = (value) => {
    setShowOptions(!showOptions);
    applyChanges(value);
  };
  return (
    <>
      <div className="select-container" ref={selectRef}>
        <div
          className="placeholder-option select-option"
          onClick={() => setShowOptions(!showOptions)}
        >
          Choose One
          <Arrow
            className="select-arrow-icon"
            style={
              showOptions === true
                ? {
                    transform: "rotate(90deg)",
                    backgroundColor: "var(--orange)",
                  }
                : {}
            }
          />
        </div>
        <ul className="select-options-container">
          {showOptions &&
            listOptions.map((option) => (
              <div key={option.value} className="select-option-wrapper">
                <li
                  className="select-option"
                  onClick={() => {
                    changeSelected(option.value);
                  }}
                >
                  {option.item}
                </li>
                {option.item === activeOption && (
                  <Check className="select-check-icon" />
                )}
              </div>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Select;
