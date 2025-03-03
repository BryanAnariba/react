import {z}  from "zod";
import { CryptoCurrencyResponseSchema, CryptoPriceSchema, PairSchema } from "../schemas/crypto-schemas";

export type Currency = z.infer<typeof CryptoCurrencyResponseSchema>;

export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseSchema>;

export type Pair = z.infer<typeof PairSchema>;

export type CryptoPrice = z.infer<typeof CryptoPriceSchema>;