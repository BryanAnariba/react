import { useState } from "react";
import { useCounter } from "../hooks"
import { Small } from "./Small";

export const Memorize = () => {
  const {counter, handleCounter} = useCounter(1);
  const [show, setShow] = useState<boolean>();
  return (
    <>
      <h1>Counter: <Small val={counter} /></h1>
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