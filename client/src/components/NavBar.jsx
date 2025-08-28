import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <div className="navBar">
      <div className="container">
        <div className="navBar-left">
          <h1>
            <Link to="/" className="title">
              🎓 Toddler Learning
            </Link>
          </h1>
        </div>
        <div className="navBar-right">
          <Link to="/">
            <button className="navLink">Home</button>
          </Link>
          {user && (
            <div>
              <span className="user-email">{user.email}</span>
              <button className="logout-button" onClick={handleClick}>
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign-up</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
