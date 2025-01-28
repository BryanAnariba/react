import { useAuthStore } from "../../core"

export const Navbar = (): JSX.Element => {
  const {startLogout, user} = useAuthStore();
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        {user?.name}
      </span>
      &nbsp;
      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sign-out-alt">
          <span>Logout</span>
        </i>
      </button>
    </div>
  )
}
