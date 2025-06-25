import { z } from "zod";

export const AuthSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  token: z.string(),
});

export const UserSchema = z.object({
  user: AuthSchema.pick({
    name: true,
    email: true,
  }).extend({
    _id: z.string(),
  }),
});
