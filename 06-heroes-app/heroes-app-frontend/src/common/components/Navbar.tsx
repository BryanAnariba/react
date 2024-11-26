import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../modules/auth';

export const Navbar = (): JSX.Element => {
  const { logOut, authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = (): void => {
    // Si yo me voy al login y doy click en la flechita de volver con replace me saca de la app, para evitar volver a la ruta anterior
    logOut();
    navigate('/auth/login', { replace: true });
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">

      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
        >
          Associations
        </Link>

        <div className="navbar-collapse">
          <div className="navbar-nav">

            <NavLink
              className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
              to="/dashboard/heroes/marvel"
            >
              Marvel
            </NavLink>

            <NavLink
              className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
              to="/dashboard/heroes/dc"
            >
              DC
            </NavLink>

            <NavLink
              className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`}
              to="/dashboard/heroes/search"
            >
              Search
            </NavLink>
          </div>
        </div>

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
          <ul className="navbar-nav ml-auto">
            <span className='nav-item nav-lint text-info m-auto'>
              {authState.logged && authState.name}
            </span>
            {/* {
              authState.logged && (
                <button className='nav-item nav-link btn' onClick={onLogout}>
                  Logout
                </button>
              )
            } */}
            <button className='nav-item nav-link btn' onClick={onLogout}>
              Logout
            </button>
          </ul>
        </div>
      </div>
    </nav>
  )
}