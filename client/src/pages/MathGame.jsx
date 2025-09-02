import { useState, useEffect } from "react";
import correctSound from "../assets/sounds/correct.mp3";
import incorrectSound from "../assets/sounds/incorrect.wav";

const MathGame = () => {
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);
  const [equation, setEquation] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [answerFeedback, setAnswerFeedback] = useState({
    message: "",
    isCorrect: null,
  });
  const [audio] = useState({
    correct: new Audio(correctSound),
    incorrect: new Audio(incorrectSound),
  });
  const [showSettings, setShowSettings] = useState(false);
  const [numberRange, setNumberRange] = useState(6);
  const [operation, setOperation] = useState("addition");

  // Answer feedback sounds
  useEffect(() => {
    audio.correct.load(), audio.incorrect.load();
    return () => {
      audio.correct.remove(), audio.incorrect.remove();
    };
  }, [audio]);

  // generating two numbers
  const generateEquation = () => {
    setNumber1(Math.floor(Math.random() * numberRange));
    setNumber2(Math.ceil(Math.random() * numberRange));
  };

  // handling answer submissions
  const handleSubmit = (e) => {
    e.preventDefault();

    let actualAnswer;
    if (operation === "addition") {
      actualAnswer = number1 + number2;
    } else if (operation === "subtraction") {
      actualAnswer = number1 - number2;
    }

    const isCorrect = actualAnswer === parseInt(userAnswer);
    setAnswerFeedback({
      message: isCorrect ? "Correct!" : "Try Again!",
      isCorrect,
    });

    if (isCorrect) {
      audio.correct.currentTime = 0;
      audio.correct.play();

      setTimeout(() => {
        generateEquation();
        setUserAnswer("");
        setAnswerFeedback({
          message: "",
          isCorrect: null,
        });
      }, 2000); // 2 second delay
    } else {
      audio.incorrect.currentTime = 0;
      audio.incorrect.play();

      setTimeout(() => {
        setAnswerFeedback(
          {
            message: "",
            isCorrect: null,
          },

          setUserAnswer("")
        );
      }, 1000); // 1 second delay
      return;
    }
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  // Generate first equation on DOM render
  useEffect(() => {
    generateEquation();
  }, []);

  useEffect(() => {
    let equationWithOperator;

    if (operation === "addition") {
      equationWithOperator = `${number1} + ${number2} = `;
    } else if (operation === "subtraction") {
      equationWithOperator = `${number1} - ${number2} = `;
    }
    setEquation(equationWithOperator);
  }, [number1, number2, operation]);

  useEffect(() => {
    generateEquation();
  }, [operation, numberRange]);

  return (
    <div className="mathGame">
      <div className="gameContainer">
        {/* game header */}
        <h2>Math Game</h2>
        <p>Practice addition or subtraction!</p>

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
                <h3>Number Range</h3>
                <input
                  className="number-range-input"
                  type="number"
                  value={numberRange}
                  onChange={(e) => setNumberRange(e.target.value)}
                ></input>

                <h3>Operation</h3>
                <select
                  className="operation-select"
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                >
                  <option value="addition">Addition</option>
                  <option value="subtraction">Subtraction</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* game display */}
        <div className="equationDisplay">
          <p className="equation">{equation}</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="mathAnswerInput"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            ></input>
          </form>
        </div>
        {answerFeedback.message && (
          <div
            className={`answerFeedback ${
              answerFeedback.isCorrect ? "correct" : "incorrect"
            }`}
          >
            {answerFeedback.message}
          </div>
        )}
      </div>
    </div>
  );
};
export default MathGame;
