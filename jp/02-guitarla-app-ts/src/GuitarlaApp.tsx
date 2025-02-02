import { Guitar } from "./shared/components/Guitar";
import { Header } from "./shared/components/Header";
import { Footer } from "./shared/components/Footer";
import { useCart } from "./hooks/useCart";

const GuitarlaApp = (): JSX.Element => {
  const {
    guitars,
    cart,
    clearCart,
    deleteProductFromCart,
    increaseQuantityToProductCart,
    decreaseQuantityToProductCart,
    addToCart,
    isEmpty,
    getTotalProductsAmount,
  } = useCart();
  return (
    <>
      <Header
        cart={cart}
        clearCart={clearCart}
        deleteProductFromCart={deleteProductFromCart}
        increaseQuantityToProductCart={increaseQuantityToProductCart}
        decreaseQuantityToProductCart={decreaseQuantityToProductCart}
        isEmpty={isEmpty}
        getTotalProductsAmount={getTotalProductsAmount}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GuitarlaApp;
