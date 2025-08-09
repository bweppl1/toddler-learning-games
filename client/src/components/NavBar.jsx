import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navBar">
      <h1>
        <Link to="/" className="title">
          Rayelle's Games
        </Link>
      </h1>

      <ul className="navLinks">
        <li>
          <Link to="/typing">
            <button className="navLink">Typing</button>
          </Link>
        </li>
        <li>
          <Link to="/spelling">
            <button className="navLink">Spelling</button>
          </Link>
        </li>
        <li>
          <Link to="/math">
            <button className="navLink">Math</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
