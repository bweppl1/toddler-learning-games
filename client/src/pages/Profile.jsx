import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePointsContext } from "../hooks/usePointsContext";
import ProgressBar from "../components/ProgressBar";

const Profile = () => {
  const { user } = useAuthContext();
  const { points, totalPoints, resetAllPoints } = usePointsContext(); // may remove totalPoints if I don't find a use

  return (
    <div className="Profile">
      <div className="profileContainer">
        <div className="profile-header">
          <h1>{user.username}</h1>
          <h5>{user.email}</h5>
        </div>
        <div className="profile-progress">
          <div className="math-progress">
            <h2>Math</h2>
            <div className="progress-bar-container">
              <ProgressBar progress={points.mathPoints} />
              <span>{points.mathPoints} / 100</span>
            </div>
          </div>
          <div className="typing-progress">
            <h2>Typing</h2>
            <div className="progress-bar-container">
              <ProgressBar progress={points.typingPoints} />
              <span>{points.typingPoints} / 100</span>
            </div>
          </div>
          <div className="spelling-progress">
            <h2>Spelling</h2>
            <div className="progress-bar-container">
              <ProgressBar progress={points.spellingPoints} />
              <span>{points.spellingPoints} / 100</span>
            </div>
          </div>
        </div>
        <div className="profile-achievements">
          <h2>Achievements</h2>
        </div>
        <div className="profile-buttons">
          <button className="reset-profile-button" onClick={resetAllPoints}>
            Reset Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
