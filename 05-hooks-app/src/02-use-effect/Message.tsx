import { useEffect } from "react";

export const Message = (): JSX.Element => {

  useEffect(() => {
    console.log('<Message /> Mounted');

    return () => {
        console.log('<Message /> Unmounted')
    }
  }, []);

  return (
    <>
      <h3>User already exists!</h3>
    </>
  );
};
