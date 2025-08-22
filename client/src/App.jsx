import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MathGame from "./pages/MathGame";
import TypingGame from "./pages/TypingGame";
import SpellingGame from "./pages/SpellingGame";

const App = () => {
  const games = [
    {
      id: TypingGame,
      title: "Typing Game",
      description: "Test your typing skills with this game",
      image: "⌨",
      route: "/typing",
    },
    {
      id: SpellingGame,
      title: "Spelling Game",
      description: "Test your spelling skills with this game",
      image: "🔠",
      route: "/spelling",
    },
    {
      id: MathGame,
      title: "Math Game",
      description: "Test your math skills with this game",
      image: "🔢",
      route: "/math",
    },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="body">
          <div className="pages">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home games={games} />} />
                <Route path="/typing" element={<TypingGame />} />
                <Route path="/spelling" element={<SpellingGame />} />
                <Route path="/math" element={<MathGame />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
