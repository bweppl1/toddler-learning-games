import { Link } from "react-router-dom";

const NavBar = () => {
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
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign-up</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
