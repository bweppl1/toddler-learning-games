import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ProgressBar from "../components/ProgressBar";

const Profile = () => {
  const { user } = useAuthContext();
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
            <div>
              <ProgressBar progress={25} />
            </div>
          </div>
          <div className="typing-progress">
            <h2>Typing</h2>
            <div>
              <ProgressBar progress={50} />
            </div>
          </div>
          <div className="spelling-progress">
            <h2>Spelling</h2>
            <div>
              <ProgressBar progress={66} />
            </div>
          </div>
        </div>
        <div className="profile-achievements">
          <h2>Achievements</h2>
        </div>
        <div className="profile-buttons">
          <button className="reset-profile-button">Reset Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
