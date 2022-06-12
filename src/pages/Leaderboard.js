import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Leaderboard() {
  const { authState } = useContext(AuthContext);
  const [usersList, setUsersList] = useState([]);

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

  useEffect(() => {
    axios.get("http://localhost:3002/auth/leaderboard").then((response) => {
      setUsersList(response.data);
    });
  }, []);

  return (
    <div className="leaderboard">
      <div>
        <div className="item">
          <div className="info">
            {usersList.map((value, key) => (
              <div className="flex" key={key}>
                <div className="item">
                  <div className="info">
                    <h3 className="name text-dark">{value.fname}</h3>
                    <span>@{value.username}</span>
                  </div>
                </div>
                <div className="item">
                  <span>{value.points} points</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Row>
        <br />
        <Button className="homeBtn" onClick={() => navigate("/")}>
          HOME
        </Button>
      </Row>
    </div>
  );
}

export default Leaderboard;
