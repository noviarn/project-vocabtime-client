import React, { useEffect, useState, useContext } from "react";
import "../pages/Quiz.css";
import vocabtime from "../assets/img/vocabtime.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Modal, Row } from "react-bootstrap";
import { QuizContext } from "../helpers/Context";
import BounceLoader from "react-spinners/BounceLoader";

function QuizMenu() {
  const [listOfLangs, setListOfLangs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const handleClose = () => setShowModal(false);
  const [listOfCategories, setListOfCategories] = useState([]);
  const {
    setGameState,
    selectedLang,
    selectedCat,
    setSelectedLang,
    setSelectedCat,
  } = useContext(QuizContext);

  let navigate = useNavigate();

  useEffect(() => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    axios
      .get("https://project-vocabtime-nrn.herokuapp.com/languages")
      .then((response) => {
        setListOfLangs(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://project-vocabtime-nrn.herokuapp.com/categories/${selectedLang}`
      )
      .then((response) => {
        setListOfCategories(response.data);
      });
  }, [selectedLang]);

  const onChangeLang = (e) => {
    setSelectedLang(e.target.value);
  };

  const onChangeCat = (e) => {
    setSelectedCat(e.target.value);
  };

  const startQuiz = () => {
    if (selectedLang === "" || selectedCat === "") {
      setShowModal(true);
    } else {
      setGameState("quiz");
    }
  };

  //   const onChangeCat = (e) => {
  //     setSelectedCat(e.target.value);
  //   };

  // const { authState } = useContext(AuthContext);
  // const [selectedLang, setSelectedLang] = useState("");
  // const [listOfLangs, setListOfLangs] = useState([]);

  // let navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("accessToken")) {
  //     if (window.history.state && window.history.state.idx > 0) {
  //       navigate(-1);
  //     } else {
  //       navigate("/sign-in", { replace: true });
  //     }
  //   }
  // }, [authState.status, navigate]);

  // useEffect(() => {
  //   axios.get("http://localhost:3002/languages").then((response) => {
  //     setListOfLangs(response.data);
  //   });
  // }, []);

  // const onChangeLang = (e) => {
  //   setSelectedLang(e.target.value);
  //   console.log(selectedLang);
  // };

  return (
    <div className="quiz">
      {showLoading ? (
        <BounceLoader color={"#7AA5D2"} loading={showLoading} size={50} />
      ) : (
        <div className="quizMenu">
          <div className="d-grid gap-2">
            <div className="quizTopText">
              <Row>
                <h3>VocabTime</h3>
              </Row>
              <img src={vocabtime} height={150} width={150} alt="logo" />
              <h5>You'll have 15 seconds to answer each question</h5>
            </div>
            <Row>
              <Form.Label>Language</Form.Label>
              <Form.Select defaultValue="" onChange={onChangeLang}>
                <option value="" disabled>
                  Select language
                </option>
                {listOfLangs.map((value, key) => {
                  return (
                    <option value={value.id} key={key} required>
                      {value.language}
                    </option>
                  );
                })}
              </Form.Select>
            </Row>
            <Row>
              <Form.Label>Category</Form.Label>
              <Form.Select defaultValue="" onChange={onChangeCat}>
                <option value="" disabled>
                  Select category
                </option>
                {listOfCategories.map((value, key) => {
                  if (selectedLang === "") {
                    return null;
                  } else {
                    return (
                      <option value={value.id} key={key} required>
                        {value.category}
                      </option>
                    );
                  }
                })}
              </Form.Select>
            </Row>
            <Row>
              <Button type="submit" className="navQuizBtn" onClick={startQuiz}>
                START QUIZ
              </Button>
            </Row>
            <Row>
              <Button
                variant="danger"
                className="navQuizBtn"
                onClick={() => navigate("/")}
              >
                CANCEL
              </Button>
            </Row>
          </div>
          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header>
              <Modal.Title>VocabTime</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>You have to choose a language and a category to continue.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default QuizMenu;
