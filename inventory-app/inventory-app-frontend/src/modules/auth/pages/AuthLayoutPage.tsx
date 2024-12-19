import { Outlet } from "react-router";

export const AuthLayoutPage = (): JSX.Element => {
  return (
    <>
      <p>Auth layout page works!</p>
      <Outlet />
    </>
  )
}
