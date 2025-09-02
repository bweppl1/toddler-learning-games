import { useState, useEffect } from "react";
import correctSound from "../assets/sounds/word_completed.wav";
import incorrectSound from "../assets/sounds/incorrect.wav";

const SpellingGame = () => {
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

  // word list
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
          voice.name.includes("Female") ||
          voice.name.includes("Samantha") ||
          voice.name.includes("Google UK English Female")
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
    const availableWords = words.filter(
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

    if (isCorrect) {
      setSpellingFeedback({
        message: "Correct!",
        isCorrect,
      });

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

  return (
    <div className="spellingGame">
      <div className="gameContainer">
        <h2>Spelling Game</h2>
        <div className="wordToSpell">
          <button
            className="hear-word-button"
            onClick={() => speakWord(wordToSpell)}
          >
            <i class="fa-solid fa-music"></i>
          </button>
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
