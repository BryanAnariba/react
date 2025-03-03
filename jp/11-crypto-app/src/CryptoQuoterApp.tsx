import { useEffect } from "react";
import CryptoSearchForm from "./components/CryptoSearchForm";
import { useCryptoStore } from "./store/store";
import CryptoPriceDisplay from "./components/CryptoPriceDisplay";

export default function CryptoQuoterApp() {

  const fetchCryptos = useCryptoStore((state) => state.fetchCryptos);
  const result = useCryptoStore((state) => state.result);

  console.log(result)


  useEffect(() => {
    fetchCryptos();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="app-title">Cotizador <span>Cripto Monedas</span></h1> 
        <div className="content">
          <CryptoSearchForm />
          <CryptoPriceDisplay />
        </div>
      </div>    
    </>
  )
}
