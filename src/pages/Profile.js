import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import ToggleOpen from "../components/ToggleOpen";
import ToggleClose from "../components/ToggleClose";
import Backdrop from "../components/Backdrop";
import SideBar from "../components/SideBar";
import BounceLoader from "react-spinners/BounceLoader";

function Profile() {
  const { authState } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, 3000);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

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
        console.log(lastName);
      });
  }, [id]);

  return (
    <div className="profile">
      {showLoading ? (
        <div className="loader">
          <BounceLoader color={"#7AA5D2"} loading={showLoading} size={50} />
        </div>
      ) : (
        <div className="d-grid gap-2">
          <ToggleOpen openSidebar={toggleSidebar} />
          <Backdrop sidebar={sidebarOpen} closeSidebar={toggleSidebar} />
          <SideBar sidebar={sidebarOpen} closeSidebar={toggleSidebar} />
          <ToggleClose />
          <div className="quizTopText">
            <Row>
              <h3>{firstName}'s Profile</h3>
            </Row>
            <Row>
              <h6>You currently have {points} point(s)</h6>
            </Row>
          </div>
          <Row>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder={firstName} readOnly />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Username
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder={username} readOnly />
              </Col>
            </Form.Group>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Profile;
