import { useEffect, useMemo, useState } from "react";
import { db } from "../shared/db/db.service";
import { GuitarItem, CartItem } from "../interfaces/guitar-app.interfaces";

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;
const initialCartState: CartItem[] = (
  localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!)
    : []
);

export const useCart = () => {
  const [guitars, setGuitars] = useState<GuitarItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>(initialCartState);

  const addToCart = (item: GuitarItem): void => {
    const cartItem: CartItem = {...item, quantity: 0};
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    } else {
      cartItem.quantity = 1;
      setCart([...cart, cartItem]);
    }
  };

  const clearCart = (): void => {
    setCart([]);
  };

  const deleteProductFromCart = (id: number): void => {
    const restOfProducts = cart.filter((cartItem) => cartItem.id !== id);
    setCart(restOfProducts);
  };

  const increaseQuantityToProductCart = (id: number): void => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === id && cartItem.quantity < MAX_ITEMS) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const decreaseQuantityToProductCart = (id: number): void => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === id && cartItem.quantity > MIN_ITEMS) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

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

  useEffect(() => {
    setGuitars(db);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return {
    guitars,
    cart,
    addToCart,
    clearCart,
    deleteProductFromCart,
    increaseQuantityToProductCart,
    decreaseQuantityToProductCart,
    isEmpty,
    getTotalProductsAmount,
  };
};
