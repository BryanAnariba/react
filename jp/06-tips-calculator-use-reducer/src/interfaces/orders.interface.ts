import { Product } from "./products.interface";

export interface OrderItem extends Product {
  quantity: number;
}
