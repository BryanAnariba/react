import { GuitarItem } from "../../interfaces/guitar-app.interfaces";
import { CartActions } from "../../reducers/cart.reducer";

interface GuitarProps {
  guitar: GuitarItem;
  dispatch: React.Dispatch<CartActions>;
}

export const Guitar = ({ guitar, dispatch }: GuitarProps): JSX.Element => {
  const { id, name, image, description, price } = guitar;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`./img/${image}.jpg`}
          alt={`${id}-${name} image`}
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          onClick={() =>
            dispatch({ type: "add-to-cart", payload: { guitarItem: guitar } })
          }
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
