import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const LoginPage = (): JSX.Element => {
  const { user, setUser } = useContext(UserContext);
  // console.log({ user });
  return (
    <>
      <h1>Login Page</h1>
      <hr />
      <pre aria-label="pretag">{JSON.stringify(user, null, 3)}</pre>

      <button
        aria-label="btnLogin"
        className="btn btn-info"
        onClick={() =>
          setUser({
            id: 1,
            name: "Gohan",
            email: "gohan@gmail.com",
            role: "SAIYAN",
          })
        }
      >
        Login set the user
      </button>

      <button className="btn btn-info" onClick={() => setUser(null)}>
        Log Out
      </button>
    </>
  );
};
