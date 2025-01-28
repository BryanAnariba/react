import { useMemo, useState } from "react";
import { useCounter } from "../hooks"
import { Small } from "./Small";

const heavyStuff = (iterationsNumber: number = 100) => {
  for (let i=0; i<iterationsNumber; i++) {
    console.log('There we go!!');
  }
  return `${iterationsNumber} done!`
}

// Si presiono el show/hide no ejecuta el proceso heavyStuff pero si el counter incrementa si por esto es util el useMemo.
export const MemorizeHook = () => {
  const {counter, handleCounter} = useCounter(1000);
  const [show, setShow] = useState<boolean>();

  const memorizeValue = useMemo(() => heavyStuff(counter), [counter]);

  return (
    <>
      <h1>Counter: <Small val={counter} /></h1>
      <h4>{memorizeValue}</h4>
      <p>{JSON.stringify(show, null, 2)}</p>
      <button className="btn btn-primary" onClick={() => handleCounter('@increment', 1)}>
        add
      </button>

      <button className="btn btn-outline-primary" onClick={() => setShow(!show)}>
        show/hide
      </button>
    </>
  )
}