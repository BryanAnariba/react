import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context";

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);

  const onLogin = (): void => {
    logIn('Gohan');
    const lastPath: string = localStorage.getItem('lastPath') ? localStorage.getItem('lastPath')! : '/dashboard/heroes/marvel';
    console.log(lastPath)
    navigate(lastPath, {replace: true});
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <hr />
      <button
        className="btn btn-primary"
        onClick={onLogin}
      >
        Login
      </button>
    </div>
  )
}
