import { z } from "zod";
import { DraftProductSchema, ProductSchema } from "../schemas/products.schemas";

export type DraftProduct = z.infer<typeof DraftProductSchema>;

export type Product = z.infer<typeof ProductSchema>;
