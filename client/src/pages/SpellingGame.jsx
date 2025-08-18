import { useState, useEffect } from "react";
import correctSound from "../assets/sounds/word_completed.wav";
import incorrectSound from "../assets/sounds/incorrect.wav";

const SpellingGame = ({ addPoints }) => {
  const [wordToSpell, setWordToSpell] = useState("");
  const [previousWord, setPreviousWord] = useState("");
  const [userSpelling, setUserSpelling] = useState("");
  const [spellingFeedback, setSpellingFeedback] = useState({
    message: "",
    isCorrect: null,
  });
  const [audio] = useState({
    correct: new Audio(correctSound),
    incorrect: new Audio(incorrectSound),
  });

  const words = [
    "apple",
    "mom",
    "dad",
    "fish",
    "rayelle",
    "dog",
    "you",
    "abigail",
    "jayce",
  ];

  const generateWord = () => {
    const availableWords = words.filter(
      (w) => w !== previousWord.toLowerCase()
    );
    const randomWord = availableWords[Math.floor(Math.random() * words.length)];
    setPreviousWord(randomWord);
    setWordToSpell(randomWord);
    console.log(wordToSpell);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCorrect = userSpelling.toLowerCase() === wordToSpell;

    const sound = isCorrect ? audio.correct : audio.incorrect;
    sound.currentTime = 0;
    sound.play();

    if (isCorrect) {
      setSpellingFeedback({
        message: "Correct!",
        isCorrect,
      });
      addPoints(1);

      setTimeout(() => {
        generateWord();
        setSpellingFeedback({
          message: "",
          isCorrect: null,
        });
        setUserSpelling("");
      }, 2000); // 2 second delay
    } else {
      setSpellingFeedback({
        message: "Try Again!",
        isCorrect: false,
      });

      setTimeout(() => {
        setSpellingFeedback({
          message: "",
          isCorrect: null,
        });
        setUserSpelling("");
      }, 2000); // 2 second delay
    }
  };

  // Generate initial word
  useEffect(() => {
    generateWord();
  }, []);
  return (
    <div className="spellingGame">
      <h2>Spelling Game</h2>
      <div className="wordToSpell">{wordToSpell}</div>
      <div className="spellingDisplay">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userSpelling}
            onChange={(e) => setUserSpelling(e.target.value)}
            className="userSpelling"
          ></input>
        </form>
      </div>
      {spellingFeedback.message && (
        <div
          className={`answerFeedback ${
            spellingFeedback.isCorrect ? "correct" : "incorrect"
          }`}
        >
          {spellingFeedback.message}
        </div>
      )}
    </div>
  );
};

export default SpellingGame;
