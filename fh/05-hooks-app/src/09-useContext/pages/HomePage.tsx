import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const HomePage = (): JSX.Element => {
  const { user } = useContext(UserContext);
  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome {user?.name}</p>
      <hr />
      <pre aria-label="pretag">
        {JSON.stringify(user, null, 3)}
      </pre>
    </>
  )
}

