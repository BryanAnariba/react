import { isAxiosError } from "axios";
import {
  AuthResponse,
  ConfirmAccountForm,
  ForgotPasswordForm,
  LoggedUser,
  NewPasswordFormData,
  ResendConfirmationCodeForm,
  UserNewAccountForm,
  UserSignInForm,
} from "../types";
import { api } from "../../../shared/api/axios.api";

export async function createNewAccount(
  userNewAccountForm: UserNewAccountForm
): Promise<AuthResponse> {
  try {
    const { data } = await api.post<AuthResponse>(
      "/auth/new-account",
      userNewAccountForm
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function signIn(
  userSignInForm: UserSignInForm
): Promise<Pick<AuthResponse, "user" | "token">> {
  try {
    const { data } = await api.post<Pick<AuthResponse, "user" | "token">>(
      `/auth/sign-in`,
      userSignInForm
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function confirmAccount({ userId, token }: ConfirmAccountForm) {
  try {
    const { data } = await api.post<{ message: string }>(
      `auth/confirm-account`,
      {
        userId: userId,
        token: token,
      }
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function resendConfirmationCode(
  resendConfirmationCodeForm: ResendConfirmationCodeForm
): Promise<Pick<AuthResponse, "user" | "emailSent">> {
  try {
    const { data } = await api.post<Pick<AuthResponse, "user" | "emailSent">>(
      `auth/resend-confirmation-token`,
      resendConfirmationCodeForm
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function forgotPassword(
  forgotPasswordForm: ForgotPasswordForm
): Promise<Pick<AuthResponse, "user" | "emailSent">> {
  try {
    const { data } = await api.post<Pick<AuthResponse, "user" | "emailSent">>(
      `/auth/forgot-password`,
      forgotPasswordForm
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function validateToken(
  confirmAccountForm: ConfirmAccountForm
): Promise<{ message: string }> {
  try {
    const { data } = await api.post<{ message: string }>(
      `/auth/validate-code-reset-password`,
      confirmAccountForm
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function updatePasswordWithToken({
  newPasswordFormData,
  token,
  userId,
}: {
  newPasswordFormData: NewPasswordFormData;
  userId: ConfirmAccountForm["userId"];
  token: ConfirmAccountForm["token"];
}): Promise<{ message: string }> {
  try {
    const { data } = await api.post<{ message: string }>(
      `/auth/update-user-password/${token}`,
      {
        ...newPasswordFormData,
        userId: userId,
      }
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function getUserProfile () {
  try {
    const { data }  = await api.get<LoggedUser>("/auth/user-profile");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export function setAccessToken(token: string): void {
  localStorage.setItem("up-tasks-access-token", token);
}
