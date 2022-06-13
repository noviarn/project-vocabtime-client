import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "../helpers/AuthContext";
import ToggleOpen from "../components/ToggleOpen";
import ToggleClose from "../components/ToggleClose";
import Backdrop from "../components/Backdrop";
import SideBar from "../components/SideBar";
import BounceLoader from "react-spinners/BounceLoader";

function Home() {
  const { authState } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="home">
      {showLoading ? (
        <BounceLoader color={"#7AA5D2"} loading={showLoading} size={50} />
      ) : (
        <div class="homeContainer">
          <ToggleOpen openSidebar={toggleSidebar} />
          <Backdrop sidebar={sidebarOpen} closeSidebar={toggleSidebar} />
          <SideBar sidebar={sidebarOpen} closeSidebar={toggleSidebar} />
          <ToggleClose />
          <div className="homeContent">
            <h3>Hi, {authState.fname}! Welcome to...</h3>
            <span className="logoHome">
              <h1>VocabTime</h1>
            </span>
            <p>
              In VocabTime, you can learn multiple foreign languages's
              vocabularies the easy way by playing quizzes. Strengthening your
              vocabulary in foreign languages will help you develop your foreign
              languages skills even more. Doing quizzes in VocabTime will earn
              you points that you can collect. Start quiz now by clicking the
              button below!
            </p>
            <Button className="goToQuiz" onClick={() => navigate("/play-quiz")}>
              Play
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
