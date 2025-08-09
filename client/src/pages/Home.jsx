import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <h2>Choose Your Game:</h2>
      <ul>
        <li>
          <Link to="/typing">Typing</Link>
        </li>
        <li>
          <Link to="/spelling">Spelling</Link>
        </li>
        <li>
          <Link to="/math">Math</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
