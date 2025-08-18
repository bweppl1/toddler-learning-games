import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MathGame from "./pages/MathGame";
import TypingGame from "./pages/TypingGame";
import SpellingGame from "./pages/SpellingGame";
import UserStats from "./components/UserStats";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("toddlerLearningUsers");
    return savedData
      ? JSON.parse(savedData)
      : {
          rayelle: { points: 0, level: 0 },
          abigail: { points: 0, level: 0 },
        };
  });

  useEffect(() => {
    localStorage.setItem("toddlerLearningUsers", JSON.stringify(userData));
  }, [userData]);

  const addPoints = (amount) => {
    if (!currentUser) return;

    setUserData((prev) => {
      const newPoints = prev[currentUser].points + amount;
      const shouldLevelUp = newPoints > 14;

      return {
        ...prev,
        [currentUser]: {
          ...prev[currentUser],
          points: shouldLevelUp ? 0 : newPoints,
          level: shouldLevelUp
            ? prev[currentUser].level + 1
            : prev[currentUser].level,
        },
      };
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar currentUser={currentUser} />
        <div className="body">
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={<Home onUserChange={setCurrentUser} />}
              />
              <Route
                path="/typing"
                element={<TypingGame addPoints={addPoints} />}
              />
              <Route
                path="/spelling"
                element={<SpellingGame addPoints={addPoints} />}
              />
              <Route
                path="/math"
                element={<MathGame addPoints={addPoints} />}
              />
            </Routes>
          </div>
          <UserStats currentUser={currentUser} userData={userData} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
