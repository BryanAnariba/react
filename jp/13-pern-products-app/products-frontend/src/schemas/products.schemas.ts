import { z } from 'zod';

export const DraftProductSchema = z.object({
    name: z.string(),
    price: z.number(),
});

export const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    avaliable: z.boolean(),
    isActive: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const ProductResponseSchema = z.object({
    name: z.string(),
    price: z.number(),
    avaliable: z.boolean(),
});

export const ProductSchemaResponse = z.array(ProductSchema);