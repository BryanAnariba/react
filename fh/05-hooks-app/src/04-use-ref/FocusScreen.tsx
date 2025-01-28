import { useRef } from "react";

export const FocusScreen = () => {

  const inputRef = useRef<any>();

  const onClickBtn = () => {
    console.log({inputRef});
    inputRef.current.select();
  }

  return (
    <>
      <h1>Focus Screen</h1>
      <hr />
      <input type="text" className="form-control mt-2" placeholder="write your name"/>

      {/* Para acceder de manera mas elegante a un elemento del dom y poder manipularlo si quieres haces un evento onclick por ejemplo, 
      puede servir para algo como para cuando haces submit si falta campos por rellenar agreges un focus al elemento que falta*/}
      <input type="text" className="form-control mt-2" placeholder="write your name" ref={inputRef}/>
      <input type="text" className="form-control mt-2" placeholder="write your name"/>
      <button className="btn btn-primary mt-2" onClick={onClickBtn}>
        Set Focus
      </button>
    </>
  )
}

