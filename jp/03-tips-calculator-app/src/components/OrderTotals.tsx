import { useMemo } from "react";
import { OrderItem } from "../interfaces/orders.interface";
import { formatCurrency } from "../helpers";

interface OrderTotalsProps {
  order: OrderItem[];
  tip: number;
  placeOrder: () => void;
}

export default function OrderTotals({
  order,
  tip,
  placeOrder
}: OrderTotalsProps): JSX.Element {
  const subTotalAmount = useMemo(
    () =>
      order.reduce(
        (subTotalAmount, currentItem) =>
          subTotalAmount + currentItem.price * currentItem.quantity,
        0
      ),
    [order]
  );

  const tipAmountBySubTotal = useMemo(
    () => subTotalAmount * tip,
    [tip, subTotalAmount] // Se ejecuta cuando cambie la propina y la subTotalAmount ya que subTotalAmount esta pendiente de cambios de la orden por eso orden no
  );

  const totalAmount = useMemo(
    () => subTotalAmount + tipAmountBySubTotal,
    [subTotalAmount, tipAmountBySubTotal]
  );


  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totals and Tip</h2>
        <p>
          Subtotal to pay: {""}
          <span className="font-bold">{formatCurrency(subTotalAmount)}</span>
        </p>
        <p>
          Tip: {""}
          <span className="font-bold">
            {formatCurrency(tipAmountBySubTotal)}
          </span>
        </p>
        <p>
          Total to pay: {""}
          <span className="font-bold">{formatCurrency(totalAmount)}</span>
        </p>
      </div>
      <button
        className="w-full bg-black p-3 uppercase text-white font-bold mt-5 cursor-pointer"
        disabled={totalAmount === 0}
        onClick={placeOrder}
      >
        Save Order
      </button>
    </>
  );
}
