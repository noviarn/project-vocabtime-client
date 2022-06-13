import React, { useContext } from "react";
import { Button, Row } from "react-bootstrap";
import { QuizContext } from "../helpers/Context";

function GameOver() {
  const {
    setPoint,
    setGameState,
    setCorrectAnswers,
    setSelectedLang,
    setSelectedCat,
  } = useContext(QuizContext);

  const backToStart = () => {
    setSelectedLang("");
    setSelectedCat("");
    setPoint(0);
    setCorrectAnswers([]);
    setGameState("menu");
  };

  const restartQuiz = () => {
    setPoint(0);
    setCorrectAnswers([]);
    setGameState("quiz");
  };

  return (
    <div>
      <div className="d-grid gap-2">
        <div className="quizTopText">
          <h3>GAME OVER</h3>
          <h5>Oops, you've run out of time</h5>
          <h5>Better luck next time!</h5>
        </div>
        <Row>
          <Button variant="danger" className="navQuizBtn" onClick={restartQuiz}>
            TRY AGAIN
          </Button>
        </Row>
        <Row>
          <Button className="navQuizBtn" onClick={backToStart}>
            BACK TO MENU
          </Button>
        </Row>
      </div>
    </div>
  );
}

export default GameOver;
