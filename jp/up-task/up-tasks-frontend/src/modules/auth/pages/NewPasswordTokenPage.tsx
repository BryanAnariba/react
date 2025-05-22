import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { Link, useParams } from "react-router";
import NewPasswordForm from "../components/NewPasswordForm";
import { ConfirmAccountForm } from "../types";
import { useMutation } from "@tanstack/react-query";
import { validateToken } from "../services/auth.service";
import { toast } from "react-toastify";

export default function NewPasswordTokenPage() {
  const params = useParams();

  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess(data) {
      setIsValidToken(true);
      toast.success(data.message);
    },
  });

  const userId: string = params.userId as string;

  const [token, setToken] = useState<ConfirmAccountForm["token"]>("");
  const [isValidToken, setIsValidToken] = useState<boolean>(false);

  const handleChange = (token: string) => {
    setToken(token);
  };
  const handleComplete = (token: string) => {
    mutate({
      token: token,
      userId: userId,
    });
  };

  return (
    <>
      <h1 className="text-5xl font-black text-white">
        Reestablecer contraseña
      </h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el codigo que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> Por email</span>
      </p>
      {!isValidToken ? (
        <>
          <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
            <label className="font-normal text-2xl text-center block">
              Código de 6 dígitos
            </label>
            <div className="flex justify-center gap-5">
              <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
              >
                <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              </PinInput>
            </div>
          </form>
          <nav className="mt-10 flex flex-col space-y-4">
            <Link
              to="/auth/forgot-password"
              className="text-center text-gray-300 font-normal"
            >
              Solicitar un nuevo Código
            </Link>
          </nav>
        </>
      ) : (
        <NewPasswordForm userId={userId} token={token} />
      )}
    </>
  );
}
