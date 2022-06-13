import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
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
      )}
    </div>
  );
}

export default Leaderboard;
