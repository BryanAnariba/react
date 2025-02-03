import { useState } from "react";
import { OrderItem } from "../interfaces/orders.interface";
import { Product } from "../interfaces/products.interface";

export const useOrder = () => {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [tip, setTip] = useState<number>(0);

  const addItem = (product: Product) => {
    const existsOrder = order.find((orderItem) => orderItem.id === product.id);
    if (existsOrder) {
        const updatedOrder = order.map(orderItem => {
            if (orderItem.id === product.id) return {...orderItem, quantity: orderItem.quantity + 1};
            return orderItem;
        });
        setOrder(updatedOrder);
    } else {
      const newOrderItem: OrderItem = { ...product, quantity: 1 };
      setOrder([...order, newOrderItem]);
    }
  };

  const deleteItem = (id: OrderItem['id']) => {
    const updatedOrder = order.filter(orderItem => orderItem.id !== id);
    setOrder(updatedOrder);
  }

  const placeOrder = () => {
    setOrder([]);
    setTip(0);
  };
  
  // console.log(order);

  return {
    order,
    tip,
    setTip,
    addItem,
    deleteItem,
    placeOrder
  };
};
