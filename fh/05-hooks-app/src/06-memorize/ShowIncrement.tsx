import React from "react"

interface Props {
  increment:  (incrementValue: number) => void,
}

export const ShowIncrement = React.memo(({increment}: Props) => {
  console.log('Uy este componente se genero de nuevo por cliclear desde el padre')
  return (
    <button onClick={() => {increment(5)}} className="btn btn-primary">
      Increment
    </button>
  )
});
