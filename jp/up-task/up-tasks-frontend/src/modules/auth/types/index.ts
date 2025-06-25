import { z } from "zod";
import { AuthSchema, UserSchema } from "../schemas";

export type Auth = z.infer<typeof AuthSchema>;

export type UserSignInForm = Pick<Auth, "email" | "password">;
export type UserNewAccountForm = Pick<
  Auth,
  "email" | "name" | "password" | "confirmPassword"
>;

export type CompleteToken = Pick<Auth, "token">;

export type User = {
  _id: string;
  email: string;
  password?: string;
  name: string;
  confirmed: boolean;
  isActive: boolean;
};

export type AuthResponse = {
  user: Pick<User, "_id" | "email" | "name">;
  token: string;
  emailSent: boolean;
};

export type ConfirmAccountForm = {
  userId: User["_id"];
  token: CompleteToken["token"];
};

export type ResendConfirmationCodeForm = Pick<User, "email">;

export type ForgotPasswordForm = Pick<User, "email">;

export type NewPasswordFormData = Pick<Auth, "password" | "confirmPassword">;

export type LoggedUser = z.infer<typeof UserSchema>;
