import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Row, InputGroup } from "react-bootstrap";
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
          <div className="profileBox">
            <Form className="rounded p-4 p-sm-3" style={{ width: "400px" }}>
              <Form.Group className="mb-3">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  name="fname"
                  placeholder={firstName}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  name="lname"
                  placeholder={lastName}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text>@</InputGroup.Text>
                  <Form.Control
                    readOnly
                    type="text"
                    name="username"
                    placeholder={username}
                  ></Form.Control>
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
