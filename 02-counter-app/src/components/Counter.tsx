import { useState } from "react"

interface Props {
  initialState: number,
}

export const Counter = ({initialState = 0}: Props): JSX.Element => {
  const [counter, setCounter] = useState<number>(initialState);

  const addOneToCounter = () => {
    setCounter(counter + 1);
  }

  const substractOneToCounter = () => {
    setCounter(counter - 1);
  }

  const resetCounter = () => {;
    setCounter(initialState)
  }

  return (
    <>
      <p>
        <b>Counter App: </b>
        {counter}
      </p>

      <div className="container">
        <button onClick={addOneToCounter}>
          +1
        </button>

        <button onClick={resetCounter}>
          0
        </button>

        <button onClick={substractOneToCounter}>
          -1
        </button>
      </div>
    </>
  )
}