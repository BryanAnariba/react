import { useMemo } from "react";
import { CartItem } from "../../interfaces/guitar-app.interfaces";
import { CartActions } from "../../reducers/cart.reducer";

interface HeaderProps {
  cart: CartItem[];
  dispatch: React.Dispatch<CartActions>;
}

export const Header = ({
  cart,
  dispatch,
}: HeaderProps): JSX.Element => {
  /*
      UseMemo mejora performance de codigo: evita que el codigo se ejecute si la funcion isEmpty o getTotalProductsAmount no a cambiado,
      a como esta ahorita si isEmpty cambia, el getTotalProductsAmount lo hara y viceversa si getTotalProductsAmount cambia el isEmpty
      tambien lo hara osea se ejecutaran ambos pero son use memo solo uno cambiara osea el que cambia si es isEmpty solo ese y si es
      getTotalProductsAmount se ejecutara getTotalProductsAmount solo
      isEmpty, getTotalProductsAmount solo cuando el cart cambia osea se le agrega algun item o algo cart
    */
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const getTotalProductsAmount = useMemo(
    () =>
      cart.reduce(
        (totalToAcum, currentItem) =>
          totalToAcum + currentItem.price * currentItem.quantity,
        0
      ),
    [cart]
  );

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="./img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="./img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`./img/${item.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{item.name}</td>
                            <td className="fw-bold">
                              ${item.price * item.quantity}
                            </td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() =>
                                  dispatch({
                                    type: "decrease-quantity",
                                    payload: { id: item.id },
                                  })
                                }
                              >
                                -
                              </button>
                              {item.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() =>
                                  dispatch({
                                    type: "increase-quantity",
                                    payload: { id: item.id },
                                  })
                                }
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() =>
                                  dispatch({
                                    type: "remove-from-cart",
                                    payload: { id: item.id },
                                  })
                                }
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total pagar:{" "}
                      <span className="fw-bold">${getTotalProductsAmount}</span>
                    </p>
                    <button
                      className="btn btn-dark w-100 mt-3 p-2"
                      onClick={() => dispatch({type: 'clear-cart'})}
                    >
                      Vaciar Carrito
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
