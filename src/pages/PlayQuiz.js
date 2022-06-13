import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import QuizMenu from "../components/QuizMenu";
import QuizStart from "../components/QuizStart";
import EndScreen from "../components/EndScreen";
import GameOver from "../components/GameOver";
import { QuizContext } from "../helpers/Context";
import { AuthContext } from "../helpers/AuthContext";

function PlayQuiz() {
  const { authState } = useContext(AuthContext);
  const [gameState, setGameState] = useState("menu");
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [questions, setQuestions] = useState([]);
  const [listOfQuestions, setListOfQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [questionLength, setQuestionLength] = useState("");
  const [point, setPoint] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        navigate("/sign-in", { replace: true });
      }
    }
  }, [authState.status, navigate]);

  return (
    <div className="Quiz">
      <QuizContext.Provider
        value={{
          gameState,
          setGameState,
          selectedLang,
          setSelectedLang,
          selectedCat,
          setSelectedCat,
          questions,
          setQuestions,
          listOfQuestions,
          setListOfQuestions,
          point,
          setPoint,
          setQuestionLength,
          questionLength,
          correctAnswers,
          setCorrectAnswers,
        }}
      >
        {gameState === "menu" && <QuizMenu />}
        {gameState === "quiz" && <QuizStart />}
        {gameState === "endScreen" && <EndScreen />}
        {gameState === "gameOver" && <GameOver />}
      </QuizContext.Provider>
    </div>
  );
}

export default PlayQuiz;
