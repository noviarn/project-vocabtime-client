import React, { useContext, useState, useEffect } from "react";
import vocabtime from "../img/vocabtime.png";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Row } from "react-bootstrap";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogoutShow = () => setShowLogoutModal(true);
  const handleLogoutClose = () => setShowLogoutModal(false);

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

  const loggingOut = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      fname: "",
      username: "",
      status: false,
    });
    navigate("/sign-in");
  };

  return (
    <div className="home">
      <div className="d-grid gap-2">
        <div className="quizTopText">
          <Row>
            <h3>VocabTime</h3>
          </Row>
          <img src={vocabtime} height={150} width={150} alt="logo" />
          <Row>
            <h5>Hello {authState.fname}!</h5>
          </Row>
        </div>
        <Row>
          <Button className="homeBtn" onClick={() => navigate("/play-quiz")}>
            PLAY
          </Button>
        </Row>
        <Row>
          <Button className="homeBtn" onClick={() => navigate("/leaderboard")}>
            LEADERBOARD
          </Button>
        </Row>
        <Row>
          <Button
            className="homeBtn"
            onClick={() => navigate(`/profile/${authState.username}`)}
          >
            PROFILE
          </Button>
        </Row>
        <Row>
          <Button
            onClick={handleLogoutShow}
            variant="danger"
            className="homeBtn"
          >
            SIGN OUT
          </Button>
        </Row>

        <Modal show={showLogoutModal} onHide={handleLogoutClose} centered>
          <Modal.Header>
            <Modal.Title>VocabTime</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to log out?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleLogoutClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={loggingOut}>
              Log out
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Home;
