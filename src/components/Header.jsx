import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getUser, resetUserSession } from '../service/authService';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(() => getUser());
  const [accountOpen, setAccountOpen] = useState(false);
  const [programsClosed, setProgramsClosed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const accountRef = useRef(null);

  // Close menus whenever route changes
  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
    setProgramsClosed(false);
    setUser(getUser());
  }, [location.pathname, location.search]);

  // Close account menu when clicking outside or pressing Escape
  useEffect(() => {
    if (!accountOpen) return;

    const handleClickOutside = (event) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setAccountOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [accountOpen]);

  // Close Programs and mobile menu
  const handleProgramClick = () => {
    setProgramsClosed(true);
    setMenuOpen(false);
  };

  // Close mobile menu
  const handleNavClick = () => {
    setMenuOpen(false);
    setProgramsClosed(true);
  };

  const displayName =
    typeof user === 'string'
      ? user
      : user?.username ||
        user?.name ||
        user?.email ||
        'User';

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <header>
      <nav className="navbar">

        {/* LOGO */}
        <div className="logo">
          <Link to="/" aria-label="SSI Educational Services">
            <img
              src="/images/logo/logo_4.png"
              alt="SSI Educational Services"
              className="logo-img"
            />
          </Link>
        </div>

        {/* NAVIGATION MENU */}
        <ul className={`nav-menu${menuOpen ? ' active' : ''}`}>

          {/* HOME */}
          <li>
            <NavLink
              to="/"
              onClick={handleNavClick}
            >
              <i className="fas fa-home"></i> Home
            </NavLink>
          </li>

          {/* PROGRAMS */}
          <li
            className={`nav-dropdown${
              programsClosed ? ' is-closed' : ''
            }`}
            onMouseLeave={() => setProgramsClosed(false)}
            onFocus={() => setProgramsClosed(false)}
          >
            <NavLink
              to="/programs"
              onClick={() => {
                setProgramsClosed(false);
                setMenuOpen(false);
              }}
            >
              <i className="fas fa-book"></i> Programs
            </NavLink>

            {/* PROGRAMS SUBMENU */}
            <ul
              className="nav-dropdown-menu"
              aria-label="Programs submenu"
            >
              <li>
                <NavLink
                  to="/gmt?id=gmat"
                  onClick={handleProgramClick}
                >
                  GMAT
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/gre?id=gre"
                  onClick={handleProgramClick}
                >
                  GRE
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/sat?id=sat"
                  onClick={handleProgramClick}
                >
                  SAT
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/ielts?id=ielts"
                  onClick={handleProgramClick}
                >
                  IELTS
                </NavLink>
              </li>
            </ul>
          </li>

          {/* ABOUT */}
          <li>
            <NavLink
              to="/about"
              onClick={handleNavClick}
            >
              <i className="fas fa-info-circle"></i> About
            </NavLink>
          </li>

          {/* CONTACT */}
          <li>
            <NavLink
              to="/contact"
              onClick={handleNavClick}
            >
              <i className="fas fa-envelope"></i> Contact
            </NavLink>
          </li>
        </ul>

        {/* USER ACCOUNT */}
        {user ? (
          <div
            className="user-account"
            ref={accountRef}
          >
            <button
              type="button"
              className="user-account-button"
              aria-haspopup="menu"
              aria-expanded={
                accountOpen ? 'true' : 'false'
              }
              onClick={() =>
                setAccountOpen((prev) => !prev)
              }
            >
              <i className="fas fa-user-circle"></i>
            </button>

            <div
              className={`user-account-menu${
                accountOpen ? ' open' : ''
              }`}
              role="menu"
            >
              <div className="user-account-name">
                <span
                  className="user-account-avatar"
                  aria-hidden="true"
                >
                  {initials || 'U'}
                </span>

                <span>
                  Signed in as{' '}
                  <strong>{displayName}</strong>
                </span>
              </div>

              {/* DASHBOARD */}
              <Link
                to="/dashboard"
                role="menuitem"
                onClick={() => setAccountOpen(false)}
              >
                <i className="fas fa-tachometer-alt"></i>{' '}
                Dashboard
              </Link>

              {/* LOGOUT */}
              <button
                type="button"
                className="user-account-logout"
                role="menuitem"
                onClick={() => {
                  resetUserSession();
                  setUser(null);
                  setAccountOpen(false);
                  setMenuOpen(false);
                  navigate('/');
                }}
              >
                <i className="fas fa-sign-out-alt"></i>{' '}
                Logout
              </button>
            </div>
          </div>
        ) : (
          /* LOGIN / SIGN UP */
          <div className="auth-buttons">
            <Link
              to="/login"
              className="btn-login"
              onClick={handleNavClick}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn-register"
              onClick={handleNavClick}
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* HAMBURGER */}
        <button
          className={`hamburger${
            menuOpen ? ' active' : ''
          }`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen((prev) => !prev);
            setProgramsClosed(false);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </nav>
    </header>
  );
}