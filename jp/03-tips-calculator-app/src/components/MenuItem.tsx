import { Product } from "../interfaces/products.interface";

interface MenuItemProps {
  product: Product;
  addItem: (product: Product) => void;
}

export default function MenuItem({ product, addItem }: MenuItemProps) {
  return (
    <button
      className="border-2 border-teal-400 w-full p-2 flex justify-between hover:bg-teal-200 cursor-pointer"
      onClick={() => addItem(product)}
    >
      <p>{product.name}</p>
      <p className="font-black">${product.price}</p>
    </button>
  );
}
