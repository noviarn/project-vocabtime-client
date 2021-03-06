import React, { useContext, useEffect, useState } from "react";
import "../pages/Quiz.css";
import { Button, Modal } from "react-bootstrap";
import { QuizContext } from "../helpers/Context";
import {
  JapaneseColorQuestions,
  JapaneseTransportationsQuestions,
  JapaneseHumanBodyQuestions,
  JapaneseFruitsQuestions,
  JapaneseStationeryQuestions,
  JapaneseAnimalsQuestions,
  JapaneseGreetingsQuestions,
  JapaneseNumbersQuestions,
  JapaneseOccupationsQuestions,
  JapaneseVegetableQuestions,
  GermanAnimalsQuestions,
  GermanOccupationsQuestions,
  GermanGreetingsQuestions,
  GermanVegetablesQuestions,
  GermanNumbersQuestions,
  GermanColorQuestions,
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
  const [counter, setCounter] = useState(15);

  useEffect(() => {
    if (selectedLang === "1" && selectedCat === "2") {
      setQuestions(JapaneseColorQuestions);
      setQuestionLength(JapaneseColorQuestions.length);
      setListOfQuestions(JapaneseColorQuestions[currQuestion]);
    } else if (selectedLang === "2" && selectedCat === "11") {
      setQuestions(GermanAnimalsQuestions);
      setQuestionLength(GermanAnimalsQuestions.length);
      setListOfQuestions(GermanAnimalsQuestions[currQuestion]);
    } else if (selectedLang === "1" && selectedCat === "9") {
      setQuestions(JapaneseTransportationsQuestions);
      setQuestionLength(JapaneseTransportationsQuestions.length);
      setListOfQuestions(JapaneseTransportationsQuestions[currQuestion]);
    } else if (selectedLang === "2" && selectedCat === "15") {
      setQuestions(GermanOccupationsQuestions);
      setQuestionLength(GermanOccupationsQuestions.length);
      setListOfQuestions(GermanOccupationsQuestions[currQuestion]);
    } else if (selectedLang === "1" && selectedCat === "5") {
      setQuestions(JapaneseHumanBodyQuestions);
      setQuestionLength(JapaneseHumanBodyQuestions.length);
      setListOfQuestions(JapaneseHumanBodyQuestions[currQuestion]);
    } else if (selectedLang === "1" && selectedCat === "3") {
      setQuestions(JapaneseFruitsQuestions);
      setQuestionLength(JapaneseFruitsQuestions.length);
      setListOfQuestions(JapaneseFruitsQuestions[currQuestion]);
    } else if (selectedLang === "2" && selectedCat === "13") {
      setQuestions(GermanGreetingsQuestions);
      setQuestionLength(GermanGreetingsQuestions.length);
      setListOfQuestions(GermanGreetingsQuestions[currQuestion]);
    } else if (selectedLang === "2" && selectedCat === "16") {
      setQuestions(GermanVegetablesQuestions);
      setQuestionLength(GermanVegetablesQuestions.length);
      setListOfQuestions(GermanVegetablesQuestions[currQuestion]);
    } else if (selectedLang === "1" && selectedCat === "8") {
      setQuestions(JapaneseStationeryQuestions);
      setQuestionLength(JapaneseStationeryQuestions.length);
      setListOfQuestions(JapaneseStationeryQuestions[currQuestion]);
    } else if (selectedLang === "1" && selectedCat === "1") {
      setQuestions(JapaneseAnimalsQuestions);
      setQuestionLength(JapaneseAnimalsQuestions.length);
      setListOfQuestions(JapaneseAnimalsQuestions[currQuestion]);
    } else if (selectedLang === "2" && selectedCat === "14") {
      setQuestions(GermanNumbersQuestions);
      setQuestionLength(GermanNumbersQuestions.length);
      setListOfQuestions(GermanNumbersQuestions[currQuestion]);
    } else if (selectedLang === "2" && selectedCat === "12") {
      setQuestions(GermanColorQuestions);
      setQuestionLength(GermanColorQuestions.length);
      setListOfQuestions(GermanColorQuestions[currQuestion]);
    } else if (selectedLang === "1" && selectedCat === "4") {
      setQuestions(JapaneseGreetingsQuestions);
      setQuestionLength(JapaneseGreetingsQuestions.length);
      setListOfQuestions(JapaneseGreetingsQuestions[currQuestion]);
    } else if (selectedLang === "1" && selectedCat === "6") {
      setQuestions(JapaneseNumbersQuestions);
      setQuestionLength(JapaneseNumbersQuestions.length);
      setListOfQuestions(JapaneseNumbersQuestions[currQuestion]);
    } else if (selectedLang === "1" && selectedCat === "7") {
      setQuestions(JapaneseOccupationsQuestions);
      setQuestionLength(JapaneseOccupationsQuestions.length);
      setListOfQuestions(JapaneseOccupationsQuestions[currQuestion]);
    } else if (selectedLang === "1" && selectedCat === "10") {
      setQuestions(JapaneseVegetableQuestions);
      setQuestionLength(JapaneseVegetableQuestions.length);
      setListOfQuestions(JapaneseVegetableQuestions[currQuestion]);
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

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    if (counter === 0) {
      setGameState("gameOver");
    }
    return () => clearInterval(timer);
  }, [counter, setGameState]);

  const nextQuestion = () => {
    if (listOfQuestions.answer === optionChosen) {
      setPoint(point + 1);
      setCorrectAnswers((correctAnswers) =>
        correctAnswers.concat([listOfQuestions.word])
      );
      setCounter(15);
    }
    if (optionChosen === "") {
      setShowOptionModal(true);
    } else {
      setOptionChosen("");
      setCurrQuestion(currQuestion + 1);
      setCounter(15);
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
    <div className="quizStart">
      <div className="question-section">
        <div className="question-count">
          <span>Question {currQuestion + 1}</span>/{questionLength}
        </div>
        <div className="question-text">{listOfQuestions.prompt}</div>
        <div>
          {counter} seconds left
          <br />
        </div>
      </div>
      <div className="answer-section gap-2">
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
          <p>
            You should choose an answer before continuing. Don't worry, your
            won't get a negative point if your answer is incorrect.
          </p>
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
