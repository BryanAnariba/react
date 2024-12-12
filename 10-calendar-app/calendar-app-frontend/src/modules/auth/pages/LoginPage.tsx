import { useEffect } from "react";
import { useAuthStore, useForm } from "../../../core";
import "./login-page.css";
import Swal from "sweetalert2";

const loginForm = {
  loginEmail: "",
  loginPassword: "",
};

const registerForm = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const LoginPage = (): JSX.Element => {

  const { startSignIn, startSignUp, errorMessage } = useAuthStore();

  const {
    formState: loginFormState,
    onInputChange: onLoginInputChange,
  } = useForm(loginForm, {});

  const {
    formState: registerFormState,
    onInputChange: onRegisterInputChange,
  } = useForm(registerForm, {});

  const onLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startSignIn({
      email: loginFormState.loginEmail,
      password: loginFormState.loginPassword
    });
  }

  const onRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(registerFormState);
    if (registerFormState.registerPassword !== registerFormState.registerPassword2) {
      Swal.fire('Authentication error!', 'Passwords Must be equals', 'error');
    } else {
      startSignUp({
        email: registerFormState.registerEmail,
        password: registerFormState.registerPassword,
        name: registerFormState.registerName,
      });
    }
  }

  useEffect(() => {
    if(errorMessage.trim() !== '') {
      Swal.fire('Authentication error!', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onLoginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                onChange={onLoginInputChange}
                value={loginFormState.loginEmail}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginFormState.loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={onRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerFormState.registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerFormState.registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerFormState.registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerFormState.registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
