import { CartItem, GuitarItem } from "../interfaces/guitar-app.interfaces";
import { db } from "../shared/db/db.service";

export interface CardReducerInitialState {
  data: GuitarItem[];
  cart: CartItem[];
}

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

export type CartActions =
  | { type: "add-to-cart"; payload: { guitarItem: GuitarItem } }
  | { type: "remove-from-cart"; payload: { id: GuitarItem["id"] } }
  | { type: "decrease-quantity"; payload: { id: GuitarItem["id"] } }
  | { type: "increase-quantity"; payload: { id: GuitarItem["id"] } }
  | { type: "clear-cart" };

const initialCartState: CartItem[] = (
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : []
  );

export const cartReducerInitialState: CardReducerInitialState = {
  cart: initialCartState,
  data: db,
};

export const cartReducer = (
  state: CardReducerInitialState = cartReducerInitialState,
  action: CartActions
) => {
  if (action.type === "add-to-cart") {
    const itemExist = state.cart.find((guitar) => guitar.id === action.payload.guitarItem.id);
    let updatedCart : CartItem[] = [];
    if (itemExist) {
      updatedCart = state.cart.map((item) => {
        if (itemExist.id === action.payload.guitarItem.id) {
          if (itemExist.quantity < MAX_ITEMS) return {...item, quantity: item.quantity + 1};
          return item;
        } else {
          return item;
        }
      });
    } else {
      const newItem: CartItem = {...action.payload.guitarItem, quantity: 1};
      updatedCart = [...state.cart, newItem];
    }
    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "remove-from-cart") {
    const updatedCart = state.cart.filter((cartItem) => cartItem.id !== action.payload.id);
    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "decrease-quantity") {
    const updatedCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id && cartItem.quantity > MIN_ITEMS) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "increase-quantity") {
    const updatedCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id && cartItem.quantity < MAX_ITEMS) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    return {
      ...state,
      cart: updatedCart,
    };
  }
  if (action.type === "clear-cart") {
    return {
      ...state,
      cart: [],
    };
  }
  return state;
};
