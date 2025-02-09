import { Product } from "../interfaces/products.interface";
import { OrderActions } from "../reducers/order.reducer";

interface MenuItemProps {
  product: Product;
  dispatch: React.Dispatch<OrderActions>;
}

export default function MenuItem({ product, dispatch }: MenuItemProps) {
  return (
    <button
      className="border-2 border-teal-400 w-full p-2 flex justify-between hover:bg-teal-200 cursor-pointer"
      onClick={() => dispatch({type: 'add-item', payload: { item: product }})}
    >
      <p>{product.name}</p>
      <p className="font-black">${product.price}</p>
    </button>
  );
}
