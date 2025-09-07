import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useState } from "react";

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    logout();
    setIsMenuOpen(false); // Close menu after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="navBar">
      <div className="container">
        <div className="navBar-left">
          <h1>
            <Link to="/" className="title" onClick={closeMenu}>
              Toddler Learning
            </Link>
          </h1>
        </div>

        {/* BURGER BUTTON */}
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* DESKTOP NAV */}
        <div className={`navBar-right ${isMenuOpen ? "menu-open" : ""}`}>
          <Link to="/" onClick={closeMenu} className="navLink">
            Home
          </Link>
          {user && (
            <div className="user-menu">
              <Link to="/profile" onClick={closeMenu} className="navLink">
                Profile
              </Link>
              <button className="logout-button" onClick={handleClick}>
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div className="auth-menu">
              <Link to="/login" onClick={closeMenu} className="navAuthLink">
                Login
              </Link>
              <Link to="/signup" onClick={closeMenu} className="navAuthLink">
                Sign-up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
