import React, { useState, useEffect, useContext } from "react";
import "./Auth.css";
import { Form, Button, InputGroup, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Register() {
  const { authState } = useContext(AuthContext);
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleSuccessClose = () => setShowSuccessModal(false);
  const handleErrorClose = () => setShowErrorModal(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate(-1);
    }
  }, [authState.status, navigate]);

  const validationSchema = Yup.object().shape({
    fname: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be at most 50 characters")
      .required("First name is a required field"),
    lname: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be at most 50 characters"),
    username: Yup.string()
      .min(5, "Username must be at least 5 characters")
      .max(25, "Username must be at most 25 characters")
      .required("Username is a required field")
      .matches(/^[A-Za-z0-9 ]+$/, "Username can't contain special characters"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .max(50, "Password must be at most 50 characters")
      .required("Password is a required field"),
  });

  const onSubmit = (data) => {
    axios
      .post("https://project-vocabtime-nrn.herokuapp.com/auth", data)
      .then((response) => {
        if (response.data.error) {
          setRegisterErrorMessage(response.data.error);
          console.log(registerErrorMessage);
          setShowErrorModal(true);
        } else {
          setRegisterSuccessMessage(response.data.success);
          setShowSuccessModal(true);
        }
      });
    // navigate("/");
  };

  return (
    <div className="Auth">
      {/* <div className="imageBox">
        <img
          src={bgresized}
          className="authImg"
          alt="images on auth pages"
          style={{ display: "inline-block" }}
        />
      </div> */}
      <div className="contentBox">
        <div className="formBox">
          <Formik
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            initialValues={{
              fname: "",
              lname: "",
              username: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className="rounded p-4 p-sm-3"
                style={{ width: "350px" }}
              >
                <h4>Sign up here</h4>
                <Form.Group className="mb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fname"
                    placeholder="Enter your first name"
                    value={values.fname}
                    onChange={handleChange}
                    isInvalid={touched.fname && !!errors.fname}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.fname}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lname"
                    placeholder="Enter your last name"
                    value={values.lname}
                    onChange={handleChange}
                    isInvalid={touched.lname && !!errors.lname}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.lname}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={values.username}
                      onChange={handleChange}
                      isInvalid={touched.username && !!errors.username}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <div class="btnAuth">
                  <Button type="submit" className="authBtn">
                    SIGN UP
                  </Button>
                  <br />
                  <Form.Text>
                    Already have an account? <Link to="/sign-in">Sign in</Link>
                  </Form.Text>
                </div>
                <Modal
                  show={showSuccessModal}
                  onHide={handleSuccessClose}
                  centered
                >
                  <Modal.Header>
                    <Modal.Title>VocabTime</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>{registerSuccessMessage}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleSuccessClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => navigate("/sign-in")}
                    >
                      Sign in now
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={showErrorModal} onHide={handleErrorClose} centered>
                  <Modal.Header>
                    <Modal.Title>VocabTime</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>{registerErrorMessage}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleErrorClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;
