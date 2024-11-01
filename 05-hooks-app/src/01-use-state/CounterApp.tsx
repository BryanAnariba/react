import { useState } from "react";

interface ICounter {
  counterOne: number;
  counterTwo: number;
  counterThree: number;
}

export const CounterApp = (): JSX.Element => {
  const [counter, setCounter] = useState<ICounter>({
    counterOne: 1,
    counterTwo: 2,
    counterThree: 3,
  });
  const { counterOne, counterTwo, counterThree } = counter;
  return (
    <>
      <h1>Counter: {counterOne}</h1>
      <h1>Counter: {counterTwo}</h1>
      <h1>Counter: {counterThree}</h1>
      <button
        className="btn btn-primary"
        onClick={() => setCounter({ ...counter, counterOne: counterOne + 1 })}
      >
        +1
      </button>
      <hr />
    </>
  );
};
