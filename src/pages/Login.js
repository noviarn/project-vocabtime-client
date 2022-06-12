import React, { useState, useContext, useEffect } from "react";
import "./Auth.css";
import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate(-1);
    }
  }, [authState.status, navigate]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is a required field"),
    password: Yup.string().required("Password is a required field"),
  });

  const onSubmit = (data) => {
    axios
      .post(
        "https://dashboard.heroku.com/apps/project-vocabtime-nrn/auth/signin",
        data
      )
      .then((response) => {
        if (response.data.error) {
          // alert(response.data.error);
          setErrorMessage(response.data.error);
          setShowModal(true);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            fname: response.data.fname,
            username: response.data.username,
            status: true,
          });
          navigate("/");
        }
      });
  };

  return (
    <div className="Auth d-flex flex-column justify-content-center align-items-center">
      <Formik
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={{
          username: "",
          password: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="rounded p-4 p-sm-3"
            style={{ width: "350px" }}
          >
            <h4>Sign in here</h4>
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
            <Button type="submit">SIGN IN</Button>
            <br />
            <Form.Text>
              Don't have an account? <Link to="/sign-up">Sign up</Link>
            </Form.Text>
            <Modal show={showModal} onHide={handleClose} centered>
              <Modal.Header>
                <Modal.Title>VocabTime</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{errorMessage}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
