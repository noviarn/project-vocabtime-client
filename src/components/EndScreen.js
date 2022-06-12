import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Row } from "react-bootstrap";
import { QuizContext } from "../helpers/Context";
import { AuthContext } from "../helpers/AuthContext";

function EndScreen() {
  const {
    point,
    setPoint,
    setGameState,
    correctAnswers,
    setCorrectAnswers,
    setSelectedLang,
    setSelectedCat,
  } = useContext(QuizContext);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .post(
        `https://project-vocabtime-nrn.herokuapp.com/auth/get-points/${authState.username}`,
        {
          point,
        }
      )
      .then((response) => {
        console.log(response);
      });
  }, []);

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
    <div className="quizScore">
      <div className="d-grid gap-2">
        <div className="quizTopText">
          <h4>Quiz finished!</h4>
          <p>You've received a total of {point} point(s)!</p>
        </div>
        {correctAnswers.map((value, key) => {
          if (value === undefined || value.length == 0) {
            return null;
          }
          return <p key={key}>{value}</p>;
        })}
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

export default EndScreen;
