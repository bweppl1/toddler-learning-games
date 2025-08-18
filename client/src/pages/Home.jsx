const Home = ({ onUserChange }) => {
  return (
    <div className="Home">
      <h2>Who is Playing?</h2>

      <div className="userButtons">
        <button className="rayelle" onClick={() => onUserChange("rayelle")}>
          Rayelle
        </button>
        <button className="abigail" onClick={() => onUserChange("abigail")}>
          Abigail
        </button>
      </div>
    </div>
  );
};

export default Home;
