import { useCounter } from "../../hooks";

interface Props {
  initState: number;
}

export const Counter = ({initState}: Props) => {
  const { counter, handleIncrement, handleSubstract, handleReset } = useCounter(initState);
  return (
    <div>
      <h1>Counter</h1>
      <h2>{counter}</h2>
      <button className="btn" onClick={() => handleIncrement(1)}>+1</button>
      <button className="btn" onClick={() => handleSubstract(-1)}>-1</button>
      <button className="btn" onClick={handleReset}>0</button>
    </div>
  )
}
