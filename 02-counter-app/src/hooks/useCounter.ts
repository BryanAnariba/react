import { useState } from "react";

export const useCounter = (initialState: number) => {
  const [counter, setCounter] = useState<number>(initialState);

  const handleIncrement = (value: number) => {
    setCounter(counter + value);
  };

  const handleSubstract = (value: number) => {
    setCounter(counter + value);
  };

  const handleReset = () => {
    setCounter(initialState); 
  };

  return {
    counter,
    handleIncrement,
    handleSubstract,
    handleReset,
  };
};
