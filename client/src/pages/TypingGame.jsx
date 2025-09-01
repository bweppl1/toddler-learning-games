import { useState, useEffect } from "react";
import correctSound from "../assets/sounds/correct.mp3";
import incorrectSound from "../assets/sounds/incorrect.wav";
import wordCompleteSound from "../assets/sounds/word_completed.wav";
import WordItem from "../components/WordItem.jsx";

const TypingGame = () => {
  const [word, setWord] = useState("");
  const [typedLetters, setTypedLetters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio] = useState({
    correct: new Audio(correctSound),
    incorrect: new Audio(incorrectSound),
    wordComplete: new Audio(wordCompleteSound),
  });
  const [previousWord, setPreviousWord] = useState("");
  const [showSettings, setShowSettings] = useState("");
  const [newWord, setNewWord] = useState("");
  const [wordList, setWordList] = useState(["dog"]);

  // sets wordList and generate a word on page load
  useEffect(() => {
    const wordList = JSON.parse(localStorage.getItem("typingGameWordList"));

    if (!wordList) {
      setWordList(["dog"]);
    }
    setWordList(wordList);

    generateWord();
  }, []);

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

      // Correct word tasks: sound, add points etc.
      if (correctKeyPress && currentIndex === word.length - 1) {
        audio.wordComplete.currentTime = 0;
        audio.wordComplete.play();
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
    const availableWords = wordList.filter(
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

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleAddWord = (e) => {
    e.preventDefault();
    setNewWord(e.target.value);
    if (!newWord) return;
    setWordList([...wordList, newWord]);

    // Save updated word list to localStorage
    localStorage.setItem(
      "typingGameWordList",
      JSON.stringify([...wordList, newWord])
    );
    setNewWord("");
  };

  const handleRemoveWord = (word) => {
    const updatedWordList = wordList.filter((w) => w != word);
    setWordList(updatedWordList);

    //Update localStorage
    localStorage.setItem("typingGameWordList", JSON.stringify(updatedWordList));

    // generate new word to avoid displaying a removed word
    generateWord();
  };

  return (
    <div className="typingGame">
      <div className="container">
        <div className="gameContainer">
          {/* game header */}
          <h2>Typing Game</h2>
          <p>Practice typing, the underlined letter is the next one to type!</p>

          {/* settings icon */}
          <button
            className="settings-button"
            onClick={toggleSettings}
            aria-label="Game Settings"
          >
            <i className="fas fa-cog"></i>
          </button>

          {/* settings panel */}
          {showSettings && (
            <div className="settings-menu">
              <div className="settings-header">
                <h2>Settings</h2>
              </div>

              <div className="settings-content">
                <div className="settings-section">
                  <h3>Add Word</h3>
                  <input
                    type="text"
                    placeholder="Add New Word"
                    className="add-word-input"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                  />
                  <button className="add-word-button" onClick={handleAddWord}>
                    + Add Word
                  </button>
                </div>
                <div className="settings-section">
                  <h3>Word List</h3>
                  {wordList.map((word) => (
                    <div className="word-item" key={word}>
                      <span>{word}</span>
                      <button
                        className="remove-word-button"
                        onClick={() => handleRemoveWord(word)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* game display */}
          <div className="typingGameWord">{renderWord()}</div>
          {currentIndex >= word.length && word && (
            <button className="nextWordButton" onClick={handleNextWord}>
              Next Word
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default TypingGame;
