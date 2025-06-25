import { useForm } from "react-hook-form";
import { UserSignInForm } from "../types";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { setAccessToken, signIn } from "../services/auth.service";
import { toast } from "react-toastify";
import ErrorMessage from "../../../shared/components/ErrorMessage";

export default function LoginPage() {
  const navigate = useNavigate();
  const initialValues: UserSignInForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: signIn,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      setAccessToken(data.token);
      navigate("/");
    },
  });

  const handleLogin = (userSignInForm: UserSignInForm) => {
    mutate(userSignInForm);
    reset(initialValues);
  };

  return (
    <>
      <h1 className="text-5xl font-black text-white">Iniciar sesion</h1>
      <p className="text-2xl font-light text-white mt-5">
        Comienza a planear tu proyectos {""}
        <span className=" text-fuchsia-500 font-bold">
          {" "}
          Iniciando sesion en este formulario
        </span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white mb-5 mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          className="text-center text-gray-300 font-normal"
          to={"/auth/new-account"}
        >
          No tienes cuenta? Crea una
        </Link>
        <Link
          className="text-center text-gray-300 font-normal"
          to={"/auth/forgot-password"}
        >
          Olvidaste tu contraseña? Reestrablecer.
        </Link>
      </nav>
    </>
  );
}
