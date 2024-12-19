import { Outlet } from "react-router"
import { Navbar, Sidebar } from "../../core"

export const UsersLayoutPage = (): JSX.Element => {
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />

          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
