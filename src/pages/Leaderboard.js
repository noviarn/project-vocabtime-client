import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Table } from "react-bootstrap";
import ToggleOpen from "../components/ToggleOpen";
import ToggleClose from "../components/ToggleClose";
import Backdrop from "../components/Backdrop";
import SideBar from "../components/SideBar";
import BounceLoader from "react-spinners/BounceLoader";

function Leaderboard() {
  const { authState } = useContext(AuthContext);
  const [usersList, setUsersList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 3000);
  }, []);

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
      .get("https://project-vocabtime-nrn.herokuapp.com/auth/leaderboard")
      .then((response) => {
        setUsersList(response.data);
      });
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="leaderboard">
      {showLoading ? (
        <BounceLoader color={"#7AA5D2"} loading={showLoading} size={50} />
      ) : (
        <div>
          <ToggleOpen openSidebar={toggleSidebar} />
          <Backdrop sidebar={sidebarOpen} closeSidebar={toggleSidebar} />
          <SideBar sidebar={sidebarOpen} closeSidebar={toggleSidebar} />
          <ToggleClose />
          <div className="item">
            <div className="info">
              <div className="quizTopText">
                <h3>LEADERBOARD</h3>
              </div>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((value, key) => (
                    <tr>
                      <td>{key + 1}</td>
                      <td>
                        {value.fname} {value.lname}
                      </td>
                      <td>@{value.username}</td>
                      <td>{value.points}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
