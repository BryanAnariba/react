import { useState } from "react";
import { currencies } from "../data";
import { useCryptoStore } from "../store/store";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";

export default function CryptoSearchForm() {
  const [error, setError] = useState<string>("");
  const [pair, setPair] = useState<Pair>({
    currency: "",
    cryptoCurrency: "",
  });

  const crytoCurrencies = useCryptoStore((state) => state.cryptoCurrencies);
  const fetchData = useCryptoStore((state) => state.fetchData);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPair({
      ...pair,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(pair).includes("")) {
      setError("Los campos del formulario son obligatorios");
    } else {
      setError("");
      fetchData(pair);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="field">
        <label htmlFor="currency">Moneda: </label>
        <select
          name="currency"
          id="currency"
          onChange={handleInputChange}
          value={pair.currency}
        >
          <option value="">-- Seleccione --</option>
          {currencies.map((currency) => (
            <option value={currency.code} key={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="cryptoCurrency">Cripto Moneda: </label>
        <select
          name="cryptoCurrency"
          id="cryptoCurrency"
          onChange={handleInputChange}
          value={pair.cryptoCurrency}
        >
          <option value="">-- Seleccione --</option>
          {crytoCurrencies.map((cryptoCurrency) => (
            <option
              value={cryptoCurrency.CoinInfo.Name}
              key={cryptoCurrency.CoinInfo.Name}
            >
              {cryptoCurrency.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value="Cotizar" />
    </form>
  );
}
