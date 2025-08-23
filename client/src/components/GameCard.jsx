import { Link } from "react-router-dom";

const GameCard = ({ image, title, description, route }) => {
  return (
    <div className="gameCard">
      <h1>{image}</h1>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={route}>
        <button className="playButton">Play</button>
      </Link>
    </div>
  );
};

export default GameCard;
