import { useEffect, useState } from "react";

interface Coords {
  x: number;
  y: number;
}

export const Message = (): JSX.Element => {

  const [coords, setCoords] = useState<{x: number, y: number}>({x: 0, y: 0});

  useEffect(() => {
    console.log('<Message /> Mounted');

    const mouseEventSuscription = ({x, y}: Coords) => {
      setCoords({x,y});
    }

    window.addEventListener('mousemove', mouseEventSuscription);

    return () => {
      console.log('<Message /> Unmounted')
      window.removeEventListener('mousemove', mouseEventSuscription);
    }
  }, []);

  return (
    <>
      <h3>User already exists!</h3>
      <p>{JSON.stringify(coords )}</p>
    </>
  );
};
