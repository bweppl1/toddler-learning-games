import GameCard from "../components/GameCard";

const Home = ({ games }) => {
  return (
    <div className="Home">
      <div className="container">
        <div className="landingBox">
          <h1>Welcome to Toddler Learning</h1>
          <p>
            This is a platform for toddlers to learn and grow. It is a fun and
            engaging way to learn that allows parents to add content they would
            like their child to learn, and track their progress.
          </p>
        </div>
        <div className="gamesBox">
          {games.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
