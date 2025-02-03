import { formatCurrency } from "../helpers";
import { OrderItem } from "../interfaces/orders.interface";

interface OrdersContentProps {
  order: OrderItem[];
  deleteItem: (id: OrderItem['id']) => void;
}

export default function OrdersContent({
  order,
  deleteItem,
}: OrdersContentProps): JSX.Element {
  return (
    <div>
      <h2 className="font-black text-4xl">Consumption</h2>
      <div className="space-y-3 mt-10">
        {
          order.map((item) => (
            <div key={item.id} className="flex justify-between border-t border-gray-200 py-5 last-of-type:border-b items-center">
              <div>
                <p className="text-lg">
                  {item.name} - {formatCurrency(item.price)}
                </p>
                <p className="font-black">
                  Quantity: {item.quantity} -{" "}
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
              <button className="bg-red-500 h-8 w-8 rounded-full text-white font-black" onClick={() => deleteItem(item.id)}>
                X
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}
