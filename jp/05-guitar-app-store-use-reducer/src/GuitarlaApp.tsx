import { useEffect, useReducer } from "react";
import { Guitar } from "./shared/components/Guitar";
import { Header } from "./shared/components/Header";
import { Footer } from "./shared/components/Footer";
import { cartReducer, cartReducerInitialState } from "./reducers/cart.reducer";

const GuitarlaApp = (): JSX.Element => {

  const [state, dispatch] = useReducer(cartReducer, cartReducerInitialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <>
      <Header
        cart={state.cart}
        dispatch={dispatch}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GuitarlaApp;
