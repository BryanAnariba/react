import React from "react";

interface Props {
  val: number;
}

// No se volvera a renderizar si el componente padre cambia por ejemplo en este se dio click en show/hide, si quitas el memo se renderizara este componente cada vez que des click
export const Small = React.memo(
  ({val}: Props) => {
    console.log('Small component Called and Rerendered :o!')
    return (
      <small>{val}</small>
    ) 
  }
)