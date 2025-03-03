import axios from "axios";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schemas/crypto-schemas";
import { Pair } from "../types";

export async function getCryptos() {
  const {
    data: { Data },
  } = await axios(
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
  );
  // console.log(Data);
  const result = CryptoCurrenciesResponseSchema.safeParse(Data);
  if (result.success) {
    return result.data;
  } else {
    throw new Error("Sometime went wrong fetching the currencies!");
  }
}

export async function getCurrencyCryptoPair (pair: Pair) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptoCurrency}&tsyms=${pair.currency}`;
  const {data: { DISPLAY }} = await axios(url);
  // console.log(DISPLAY[pair.cryptoCurrency][pair.currency]);
  const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptoCurrency][pair.currency]);
  if (result.success) {
    return result.data;
  } else {
    throw new Error("Sometime went wrong fetching the crypto pair price!");
  }
}


