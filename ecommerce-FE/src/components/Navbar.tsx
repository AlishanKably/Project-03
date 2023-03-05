import { Link, useNavigate } from 'react-router-dom'
import { IUser } from '../interfaces/user'
import { baseUrl } from "../config"
import logo from "../resources/img/logo-no-bg.png"

interface NavbarProps {
  user: IUser | null
  setUser: Function
}

function Navbar({ user, setUser }: NavbarProps) {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }
  return (
    <>
      <header>
        <nav className="navbar is-transparent is-fixed-top">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item image">
              <img
                className=""
                src={logo}
                alt="logo"
              />
            </Link>
          </div>
          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
          <div className="navbar-menu ">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            {user?.isSeller && (
              <Link to="/addproduct" className="navbar-item">
                Add product
              </Link>
            )}
            {user && (
              <Link to="/cart" className="navbar-item">
                Cart
              </Link>
            )}
            {user && (
              <Link to="/order" className="navbar-item">
                Order
              </Link>
            )}
          </div>
          <div className="navbar-end">
            {!user && (
              <Link to="/signup" className="navbar-item">
                Sign Up
              </Link>
            )}
            {!user && (
              <Link to="/login" className="navbar-item">
                Log In
              </Link>
            )}
            {user && (
              <button onClick={logout} className="navbar-item button is-ghost">
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar
