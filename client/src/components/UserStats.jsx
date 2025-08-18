import { useState, useEffect } from "react";

const UserStats = ({ currentUser, userData }) => {
  if (!currentUser) return null;

  const renderPips = () => {
    let pips = [];
    let pts = userData[currentUser].points;

    let emptyPips = 14 - pts;
    for (let i = 0; i < pts; i++) {
      pips.push(<div key={`full-${i}`} className="pip full"></div>);
    }
    for (let i = 0; i < emptyPips; i++) {
      pips.push(<div key={` empty-${i}`} className="pip"></div>);
    }

    return pips;
  };

  return (
    <div className="userStats">
      <h2>User Stats</h2>
      <div>
        <h3>Player: {currentUser.toUpperCase()}</h3>
      </div>
      <div className="statDisplay">
        <div>
          <h3>Points</h3>
          <div className="pipDisplay">{renderPips()}</div>
        </div>
        <h3>Level</h3>
        <div className="levelDisplay">
          <h1>{userData[currentUser].level}</h1>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
