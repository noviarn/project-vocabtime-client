import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { QuizContext } from "../helpers/Context";
import {
  JapaneseColorQuestions,
  JapaneseTransportationsQuestions,
  GermanAnimalsQuestions,
} from "../helpers/QuestionList";

function QuizStart() {
  const {
    selectedLang,
    setQuestions,
    listOfQuestions,
    setListOfQuestions,
    point,
    setPoint,
    setGameState,
    setQuestionLength,
    questionLength,
    setCorrectAnswers,
    selectedCat,
  } = useContext(QuizContext);
  const [currQuestion, setCurrQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [showOptionModal, setShowOptionModal] = useState(false);
  const handleOptionModalClose = () => setShowOptionModal(false);

  useEffect(() => {
    if (selectedLang === "1" && selectedCat === "1") {
      setQuestions(JapaneseColorQuestions);
      setQuestionLength(JapaneseColorQuestions.length);
      setListOfQuestions(JapaneseColorQuestions[currQuestion]);
    } else if (selectedLang === "2" && selectedCat === "3") {
      setQuestions(GermanAnimalsQuestions);
      setQuestionLength(GermanAnimalsQuestions.length);
      setListOfQuestions(GermanAnimalsQuestions[currQuestion]);
    } else if (selectedLang === "1" && selectedCat === "2") {
      setQuestions(JapaneseTransportationsQuestions);
      setQuestionLength(JapaneseTransportationsQuestions.length);
      setListOfQuestions(JapaneseTransportationsQuestions[currQuestion]);
    }
  }, [
    listOfQuestions,
    setListOfQuestions,
    currQuestion,
    selectedLang,
    setQuestionLength,
    setQuestions,
    selectedCat,
  ]);

  const nextQuestion = () => {
    if (listOfQuestions.answer === optionChosen) {
      setPoint(point + 1);
      setCorrectAnswers((correctAnswers) =>
        correctAnswers.concat([listOfQuestions.word])
      );
    }
    if (optionChosen === "") {
      setShowOptionModal(true);
    } else {
      setOptionChosen("");
      setCurrQuestion(currQuestion + 1);
    }
  };

  const finishQuiz = () => {
    if (listOfQuestions.answer === optionChosen) {
      setPoint(point + 1);
      setCorrectAnswers((correctAnswers) =>
        correctAnswers.concat([listOfQuestions.word])
      );
    }
    if (optionChosen === "") {
      setShowOptionModal(true);
    } else {
      setOptionChosen("");
      setGameState("endScreen");
    }
  };

  return (
    <div className="quiz">
      <div className="question-section">
        <div className="question-count">
          <span>Question {currQuestion + 1}</span>/{questionLength}
        </div>
        <div className="question-text">{listOfQuestions.prompt}</div>
      </div>
      <div className="quizAnswerSection gap-2">
        <Button className="optionBtn" onClick={() => setOptionChosen("A")}>
          {listOfQuestions.optionA}
        </Button>
        <Button className="optionBtn" onClick={() => setOptionChosen("B")}>
          {listOfQuestions.optionB}
        </Button>
        <Button className="optionBtn" onClick={() => setOptionChosen("C")}>
          {listOfQuestions.optionC}
        </Button>
        <Button className="optionBtn" onClick={() => setOptionChosen("D")}>
          {listOfQuestions.optionD}
        </Button>
        {currQuestion === questionLength - 1 ? (
          <Button onClick={finishQuiz} className="navQuizBtn" variant="success">
            Finish
          </Button>
        ) : (
          <Button onClick={nextQuestion} className="navQuizBtn">
            Next
          </Button>
        )}
      </div>

      <Modal show={showOptionModal} onHide={handleOptionModalClose} centered>
        <Modal.Header>
          <Modal.Title>VocabTime</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You should choose an answer before continuing!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOptionModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuizStart;
