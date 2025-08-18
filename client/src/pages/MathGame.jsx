import { useState, useEffect } from "react";
import correctSound from "../assets/sounds/correct.mp3";
import incorrectSound from "../assets/sounds/incorrect.wav";

const MathGame = ({ addPoints }) => {
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

  // Answer feedback sounds
  useEffect(() => {
    audio.correct.load(), audio.incorrect.load();
    return () => {
      audio.correct.remove(), audio.incorrect.remove();
    };
  }, [audio]);

  // generating two numbers 1-10
  const generateEquation = () => {
    const range = 6;
    setNumber1(Math.floor(Math.random() * range));
    setNumber2(Math.floor(Math.random() * range));
  };

  // handling answer submissions
  const handleSubmit = (e) => {
    e.preventDefault();
    const actualAnswer = number1 + number2;
    const isCorrect = actualAnswer === parseInt(userAnswer);
    setAnswerFeedback({
      message: isCorrect ? "Correct!" : "Try Again!",
      isCorrect,
    });

    if (isCorrect) {
      audio.correct.currentTime = 0;
      audio.correct.play();
      addPoints(1);

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

  // Generate first equation on DOM render
  useEffect(() => {
    generateEquation();
  }, []);

  useEffect(() => {
    setEquation(`${number1} + ${number2} = `);
  }, [number1, number2]);

  return (
    <div className="mathGame">
      <h2>Math Game</h2>
      <div className="equationDisplay">
        <p className="equation">{equation}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="userAnswer"
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
  );
};
export default MathGame;
