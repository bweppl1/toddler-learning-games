import { useState, useEffect } from "react";
import correctSound from "../assets/sounds/correct.mp3";
import incorrectSound from "../assets/sounds/incorrect.wav";
import wordCompleteSound from "../assets/sounds/word_completed.wav";

const TypingGame = ({ addPoints }) => {
  const [word, setWord] = useState("");
  const [typedLetters, setTypedLetters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio] = useState({
    correct: new Audio(correctSound),
    incorrect: new Audio(incorrectSound),
    wordComplete: new Audio(wordCompleteSound),
  });
  const [previousWord, setPreviousWord] = useState("");

  const rayelleWords = [
    "mom",
    "dad",
    "run",
    "ball",
    "dog",
    "Rayelle",
    "Abigail",
    "stop",
    "and",
    "you",
    "I",
    "help",
    "walk",
    "car",
    "apple",
    "Grandma",
    "Grandpa",
    "Pilon",
    "Weppler",
  ];

  // typing feedback sounds
  useEffect(() => {
    audio.correct.load(), audio.incorrect.load(), audio.wordComplete.load();
    return () => {
      audio.correct.remove(),
        audio.incorrect.remove(),
        audio.wordComplete.remove();
    };
  }, [audio]);

  // key press handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Move to next word with Enter key
      if (currentIndex >= word.length && e.key === "Enter") {
        handleNextWord();
        return;
      }

      // Ignore non-alpha key presses
      if (!e.code.startsWith("Key")) {
        return;
      }

      const currentLetter = word[currentIndex];
      const correctKeyPress = e.key.toUpperCase() === currentLetter;

      // Audio feedback
      const sound = correctKeyPress ? audio.correct : audio.incorrect;
      sound.currentTime = 0;

      // Correct word tasks: sound, add points
      if (correctKeyPress && currentIndex === word.length - 1) {
        audio.wordComplete.currentTime = 0;
        audio.wordComplete.play();
        addPoints(1);
      } else {
        sound.play();
      }

      // Iterate forward if the correct key is pressed
      if (correctKeyPress) {
        setTypedLetters([...typedLetters, currentLetter]);
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, word, typedLetters]);

  // pick a random word from array
  const generateWord = () => {
    // Remove previous word from current array to avoid the same word back to back
    const availableWords = rayelleWords.filter(
      (w) => w !== previousWord.toLocaleLowerCase()
    );
    console.log(availableWords);
    console.log("previous word: " + previousWord);
    const randomWord =
      availableWords[
        Math.floor(Math.random() * availableWords.length)
      ].toUpperCase();
    setWord(randomWord);
    setPreviousWord(randomWord);
    setTypedLetters([]);
    setCurrentIndex(0);
  };

  // Convert the word to a 2D array to adjust styles as the player iterates through
  const renderWord = () => {
    return word.split("").map((letter, index) => {
      const isTyped = index < currentIndex;
      const isCurrentLetter = index === currentIndex;
      let className = isTyped ? "typedLetter" : "untypedLetter";
      if (isCurrentLetter) className += " currentLetter";

      return (
        <span key={index} className={className}>
          {letter}
        </span>
      );
    });
  };

  const handleNextWord = () => {
    setPreviousWord(word);
    generateWord();
  };

  // generate word on page load
  useEffect(() => {
    generateWord();
  }, []);

  return (
    <div className="typingGame">
      <h2>Typing Game</h2>
      <div className="typingGameWord">{renderWord()}</div>
      {currentIndex >= word.length && word && (
        <button className="nextWordButton" onClick={handleNextWord}>
          Next Word
        </button>
      )}
    </div>
  );
};
export default TypingGame;
