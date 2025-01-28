import { useCallback, useState } from "react";
import { ShowIncrement } from "./ShowIncrement";

export const UseCallbackHook = () => {
  const [counter, setCounter] = useState(1);

  // es parecido al useMemo pero memoriza funciones
  const onIncrement = useCallback((incrementValue: number): void => {
    setCounter((prevCounter) => prevCounter + incrementValue);
  }, []);


  return (
    <>
      <h1>Use Callback Hook: {counter}</h1>
      <hr />
      <ShowIncrement increment={onIncrement}/>
    </>
  )
}
