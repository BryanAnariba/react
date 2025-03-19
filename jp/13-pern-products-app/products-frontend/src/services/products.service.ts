import axios from "axios";
import {
  DraftProductSchema,
  ProductResponseSchema,
  ProductSchema,
  ProductSchemaResponse,
} from "../schemas/products.schemas";
import { Product } from "../types/products.types";
import { toBoolean } from "../utils";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export const addProduct = async (data: ProductData) => {
  try {
    const result = DraftProductSchema.safeParse({
      ...data,
      name: data.name,
      price: Number(data.price),
    });
    if (result.success) {
      const response = await axios(`${import.meta.env.VITE_API_URL}/products`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        data: {
          name: result.data.name,
          price: result.data.price,
        },
      });
      // console.log("Product Saved: ", response.data);
      return response;
    } else {
      throw new Error(result.error.errors[0].message);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios(`${import.meta.env.VITE_API_URL}/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const result = ProductSchemaResponse.safeParse(response.data);
    if (result.success) {
      return result.data;
    }
    throw new Error(`${result.error}`);
  } catch (error) {
    console.error(error);
  }
};

export const getProduct = async (product_id: Product["id"]) => {
  try {
    const response = await axios(
      `${import.meta.env.VITE_API_URL}/products/${product_id}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    const result = ProductSchema.safeParse(response.data);
    if (result.success) return result.data;
    throw new Error(`${result.error}`);
  } catch (error) {
    console.error(error);
  }
};

export const editProduct = async (product_id: Product["id"], data: ProductData) => {
  try {
    const result = ProductResponseSchema.safeParse({
      ...data,
      price: Number(data.price),
      avaliable: toBoolean(data.avaliable.toString()),
    });

    if (result.success) {
      const response = await axios(
        `${import.meta.env.VITE_API_URL}/products/${product_id}`,
        { method: "PATCH", headers: { "Content-Type": "application/json" }, data: result.data },
      );
      return response;
    }
    throw new Error(`${result.error}`);
  } catch (error) {
    console.error(error);
  }
}

export const editProductAvaliability = async (product_id: Product["id"]) => {
  try {
    const response = await axios(
      `${import.meta.env.VITE_API_URL}/products/${product_id}/avaliability`,
      { method: "PATCH", headers: { "Content-Type": "application/json" } },
    );
    const result = ProductSchema.safeParse(response.data);
    if (result.success) return result.data;
    throw new Error(`${result.error}`);
  } catch (error) {
    console.error(error);
  }
}

export const deleteProduct = async (product_id: string) => {
  try {
    const response = await axios(
      `${import.meta.env.VITE_API_URL}/products/${product_id}`,
      { method: "DELETE", headers: { "Content-Type": "application/json" } }
    );
    const result = ProductSchema.safeParse(response.data);
    if (result.success) return result.data;
    throw new Error(`${result.error}`);
  } catch (error) {
    console.error(error);
  }
}