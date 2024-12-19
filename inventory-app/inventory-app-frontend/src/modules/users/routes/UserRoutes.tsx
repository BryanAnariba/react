import { Navigate, Route, Routes } from "react-router"
import { CreateUser, UserListPage, UserPage, UsersLayoutPage } from "../pages"

export const UserRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<UsersLayoutPage />}>
        <Route path="list" element={<UserListPage />} />
        <Route path=":userId" element={<UserPage />} />
        <Route path="create" element={<CreateUser />} />
        <Route path="*" element={<Navigate to={'/users/list'} />} />
      </Route>
    </Routes>
  );
}