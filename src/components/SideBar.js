import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Row } from "react-bootstrap";
import { AuthContext } from "../helpers/AuthContext";
import { BsArrowLeftShort } from "react-icons/bs";
import vocabtime from "../assets/img/vocabtime.png";

function SideBar({ sidebar, closeSidebar }) {
  const { authState, setAuthState } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleLogoutShow = () => setShowLogoutModal(true);
  const handleLogoutClose = () => setShowLogoutModal(false);

  let navigate = useNavigate();

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
    <div
      className={sidebar ? "side-bar side-bar--open" : "side-bar"}
      onClick={closeSidebar}
    >
      <BsArrowLeftShort className="stripMenu"></BsArrowLeftShort>
      <header>
        <div className="userSection">
          <img src={vocabtime} className="userImg" alt="web logo" />
          <h3 className="usersName">@{authState.username}</h3>
        </div>
        <nav className="navbar">
          <Row>
            <Button onClick={() => navigate("/")} className="navBtn">
              Home
            </Button>
          </Row>
          <Row>
            <Button onClick={() => navigate("/leaderboard")} className="navBtn">
              Leaderboard
            </Button>
          </Row>
          <Row>
            <Button
              onClick={() => navigate(`/profile/${authState.username}`)}
              className="navBtn"
            >
              Profile
            </Button>
          </Row>
          <Row>
            <Button
              onClick={handleLogoutShow}
              className="navBtn"
              variant="danger"
            >
              Sign out
            </Button>
          </Row>
        </nav>
      </header>
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
  );
}

export default SideBar;
