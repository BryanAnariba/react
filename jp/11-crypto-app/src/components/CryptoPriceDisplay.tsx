import { useMemo } from "react";
import { useCryptoStore } from "../store/store";
import Spinner from "./Spinner";

export default function CryptoPriceDisplay() {
  const result = useCryptoStore((state) => state.result);
  const loading = useCryptoStore((state) => state.loading);
  const hasValues = useMemo(
    () => !Object.values(result).includes(""),
    [result]
  );
  return (
    <div className="result-wrapper">
      {
        loading 
        ? 
          <Spinner />
        : 
          hasValues && (
            <>
              <h2>Cotizacion</h2>
              <div className="result">
                <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt={result.PRICE + ' crypto currency image'} />
                <div>
                  <p>
                    El Precio es de: <span>{result.PRICE}</span>
                  </p>
                  <p>
                    El Precio mas Alto del Dia: <span>{result.HIGHDAY}</span>
                  </p>
                  <p>
                    El Precio mas Bajo del Dia: <span>{result.LOWDAY}</span>
                  </p>
                  <p>
                    El Precio en 24 Horas: <span>{result.CHANGEPCT24HOUR}</span>
                  </p>
                  <p>
                    Ultima actualizacion: <span>{result.LASTUPDATE}</span>
                  </p>
                </div>
              </div>
            </>
        )
      }
    </div>
  );
}
