import { useState } from "react";

interface UseCounter {
  counter: number;
  handleCounter: (option: string, quantity?: number) => void;
}

export const useCounter = (initialValue: number = 1): UseCounter => {
  const [counter, setCounter] = useState<number>(initialValue);

  const handleCounter = (option: string, quantity: number = 1): void => {
    switch (option) {
      case "@increment":
        setCounter(counter + quantity);
        break;
      case "@decrement":
        setCounter(counter - quantity);
        break;
      case "@reset":
        setCounter(initialValue);
        break;
      default:
        console.error("Options not valid!");
    }
  };

  return {
    counter,
    handleCounter,
  };
};
