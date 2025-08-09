import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MathGame from "./pages/MathGame";
import TypingGame from "./pages/TypingGame";
import SpellingGame from "./pages/SpellingGame";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/typing" element={<TypingGame />} />
            <Route path="/spelling" element={<SpellingGame />} />
            <Route path="/math" element={<MathGame />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
