import { useState, useEffect } from "react";
import correctSound from "../assets/sounds/word_completed.wav";
import incorrectSound from "../assets/sounds/incorrect.wav";
import { usePointsContext } from "../hooks/usePointsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const SpellingGame = () => {
  // points and user context
  const { updateSpellingPoints } = usePointsContext(); // import "points" when adding point display to game
  const { user } = useAuthContext();

  // states
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
  const [showSettings, setShowSettings] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [wordList, setWordList] = useState(["dad", "mom"]);

  // open and close game settings menu
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // TTS function
  const speakWord = (word) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Create speech utterance
      const utterance = new SpeechSynthesisUtterance(word);

      // Configure TTS settings
      utterance.rate = 0.8; // Slightly slower for clarity
      utterance.pitch = 1.0; // Normal pitch
      utterance.volume = 1.0; // Full volume

      // Try to use a child-friendly voice
      const voices = window.speechSynthesis.getVoices();
      const childVoice = voices.find(
        (voice) =>
          voice.lang.includes("en-US") &&
          (voice.name.includes("Samantha") ||
            voice.name.includes("Alex") ||
            voice.name.includes("Microsoft Zira") ||
            voice.name.includes("Google US English"))
      );

      if (childVoice) {
        utterance.voice = childVoice;
      }

      // Speak the word
      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Speech synthesis not supported");
    }
  };

  const generateWord = () => {
    const availableWords = wordList.filter(
      (w) => w !== previousWord.toLowerCase()
    );
    const randomWord =
      availableWords[Math.floor(Math.random() * availableWords.length)];
    setPreviousWord(randomWord);
    setWordToSpell(randomWord);

    // Speak the new word
    speakWord(randomWord);

    console.log(randomWord); //for debug
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCorrect = userSpelling.toLowerCase() === wordToSpell;

    const sound = isCorrect ? audio.correct : audio.incorrect;
    sound.currentTime = 0;
    sound.play();

    // **CORRECT** answer tasks: sound, add points etc.
    if (isCorrect) {
      setSpellingFeedback({
        message: "Correct!",
        isCorrect,
      });
      updateSpellingPoints(1); // points +1
      if (!user) {
        console.log("User not logged in -- no progress will be saved");
      }

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
    const localWordList = JSON.parse(
      localStorage.getItem("spellingGameWordList")
    );

    if (!localWordList) {
      generateWord();
      return;
    }

    setWordList(localWordList);
    generateWord();
  }, []);

  // Initialize voices when component mounts
  useEffect(() => {
    const initializeVoices = () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.getVoices();
      }
    };

    // Some browsers need a delay to load voices
    setTimeout(initializeVoices, 100);

    // Also listen for voices loaded event
    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = initializeVoices;
    }
  }, []);

  // settings menu logic
  // adding a custom word
  const handleAddWord = (e) => {
    e.preventDefault();
    setNewWord(e.target.value);
    if (!newWord) return;

    setWordList([...wordList, newWord]);

    localStorage.setItem(
      "spellingGameWordList",
      JSON.stringify([...wordList, newWord])
    );
  };

  // removing a custom word **BUG** must check if < 2 words give warning and stop removal
  const handleRemoveWord = (word) => {
    const updatedSpellingWordList = wordList.filter((w) => w != word);
    setWordList(updatedSpellingWordList);

    localStorage.setItem(
      "spellingGameWordList",
      JSON.stringify(updatedSpellingWordList)
    );
  };

  // generate a word whenever the word list changes
  useEffect(() => {
    generateWord();
  }, [wordList]);

  return (
    <div className="spellingGame">
      <div className="gameContainer">
        {/* game header */}
        <h2>Spelling Game</h2>
        <p>Practice spelling the word you hear!</p>

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
                <h3>Add Custom Word</h3>
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
                <h3>Custom Word List</h3>
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
        <div className="spellingGameControlsContainer">
          <div className="spellingGameControlContainer">
            <button
              className="spellingGameControlIcon"
              onClick={() => speakWord(wordToSpell)}
            >
              <i class="fa-solid fa-music"></i>
            </button>
            <span>Hear Word</span>
          </div>
          <div className="spellingGameControlContainer">
            <button className="spellingGameControlIcon" onClick={generateWord}>
              <i class="fa-solid fa-arrow-right"></i>
            </button>
            <span>Next Word</span>
          </div>
        </div>
        <div className="spellingDisplay">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userSpelling}
              onChange={(e) => setUserSpelling(e.target.value)}
              className="userSpellingInput"
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
    </div>
  );
};

export default SpellingGame;
