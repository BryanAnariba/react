import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ConfirmAccountForm, NewPasswordFormData } from "../types";
import ErrorMessage from "../../../shared/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "../services/auth.service";
import { toast } from "react-toastify";

export default function NewPasswordForm({ token, userId }: ConfirmAccountForm) {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/auth/sign-in");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const initialValues: NewPasswordFormData = {
    password: "",
    confirmPassword: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleNewPassword = (newPasswordFormData: NewPasswordFormData) => {
    mutate({
      newPasswordFormData: newPasswordFormData,
      userId: userId,
      token: token,
    });
    reset(initialValues);
  };

  const password = watch("password");

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Repetir Password</label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("confirmPassword", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />

          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Establecer Password"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
