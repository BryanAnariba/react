import PropTypes from "prop-types";
import { useState } from "react";

export const CounterApp = ({ value = 0 }) => {
  const [counter, setCounter] = useState(value);

  const handleAdd = (incrementedBy) => {
    setCounter(counter + incrementedBy);
  };

  const handleSubstract = (substractValue) => {
    setCounter(counter - substractValue);
  };

  const handleReset = () => {
    setCounter(value);
  };

  return (
    <>
      <b>Counter: </b>
      <span>{counter}</span>
      <br />
      <button onClick={() => handleAdd(1)}>+1</button>
      <button onClick={handleReset} aria-label="btn-reset">Reset</button>
      <button onClick={() => handleSubstract(1)}>-1</button>
    </>
  );
};

CounterApp.propTypes = {
  value: PropTypes.number,
};
