import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  const { authState } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState();

  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        navigate("/sign-in", { replace: true });
      }
    }
  }, [authState.status, navigate]);

  useEffect(() => {
    axios
      .get(`https://project-vocabtime-nrn.herokuapp.com/auth/infos/${id}`)
      .then((response) => {
        setFirstName(response.data.fname);
        setLastName(response.data.lname);
        setUsername(response.data.username);
        setPoints(response.data.points);
      });
  }, [id]);

  return (
    <div className="profile">
      <div className="quizTopText">
        <Row>
          <h4>
            {firstName} {lastName}
          </h4>
        </Row>
        <Row>
          <h4>@{username}</h4>
        </Row>
        <Row>
          <h5>
            <h5>You currently have {points} points.</h5>
          </h5>
        </Row>
        <Row>
          <Button className="homeBtn" onClick={() => navigate("/")}>
            HOME
          </Button>
        </Row>
      </div>
    </div>
  );
}

export default Profile;
