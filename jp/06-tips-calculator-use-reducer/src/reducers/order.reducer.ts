import { OrderItem } from "../interfaces/orders.interface";
import { Product } from "../interfaces/products.interface";

export type OrderActions =
  | { type: "add-item"; payload: { item: Product } }
  | { type: "remove-item"; payload: { id: OrderItem["id"] } }
  | { type: "place-order" }
  | { type: "add-tip"; payload: { value: number } };

export interface OrderReducerState {
  order: OrderItem[];
  tip: number;
}

export const orderReducerInitialState: OrderReducerState = {
  order: [],
  tip: 0,
};

export const orderReducer = (
  state: OrderReducerState = orderReducerInitialState,
  action: OrderActions
) => {
  if (action.type === "add-item") {
    let updatedOrder: OrderItem[] = [];
    const existsOrder = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );
    if (existsOrder) {
      updatedOrder = state.order.map((orderItem) => {
        if (orderItem.id === action.payload.item.id)
          return { ...orderItem, quantity: orderItem.quantity + 1 };
        return orderItem;
      });
    } else {
      const newOrderItem: OrderItem = { ...action.payload.item, quantity: 1 };
      updatedOrder = [...state.order, newOrderItem];
    }
    return { ...state, order: updatedOrder };
  }

  if (action.type === "add-tip") {
    const tip = action.payload.value;
    return { ...state, tip: tip };
  }

  if (action.type === "place-order") {
    return { ...state, order: [], tip: 0 };
  }

  if (action.type === "remove-item") {
    const updatedOrder = state.order.filter(
      (orderItem) => orderItem.id !== action.payload.id
    );
    return { ...state, order: updatedOrder };
  }
  return state;
};
