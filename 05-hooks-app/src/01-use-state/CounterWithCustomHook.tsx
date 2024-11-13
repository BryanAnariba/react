import { useCounter } from "../hooks";

export const CounterWithCustomHook = (): JSX.Element => {
  const { counter, handleCounter } = useCounter(10);
  return (
    <>
      <h1>Counter With Hook: {counter}</h1>
      <button className="btn btn-primary" onClick={() => handleCounter('@increment', 1)}>+1</button>
      <button className="btn btn-outline-primary" onClick={() => handleCounter('@reset')}>Reset</button>
      <button className="btn btn-primary" onClick={() => handleCounter('@decrement', 1)}>-1</button>
      <hr />
    </>
  );
};
