import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

//import components
import AlertPopup from "./components/AlertPopup";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  //state handling
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

  const [displayAlert, setDisplayAlert] = useState("none");
  const [alertType, setAlertType] = useState("danger");
  const [alertHeading, setAlertHeading] = useState("Invalid Credentials");
  const [alertText, setAlertText] = useState(
    "you entered an incorrect email or password or both!"
  );

  const handleloginEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };

  const handleloginPasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleSignUpEmailChange = (event) => {
    setSignUpEmail(event.target.value);
  };

  const handleSignUpPasswordChange = (event) => {
    setSignUpPassword(event.target.value);
  };

  const handleSignUpConfirmPasswordChange = (event) => {
    setSignUpConfirmPassword(event.target.value);
  };

  const handleSignUpClick = () => {
    if (signUpPassword === signUpConfirmPassword) {
      createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          setAlertType("success");
          setAlertHeading("Successfully Created Account");
          setAlertText(
            "you can use this account to log into other Prabhjot Sidhu applications!"
          );
          setDisplayAlert("flex");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setAlertType("danger");
          setAlertHeading("Unable To Sign Up");
          setAlertText("please make sure that your email is valid!");
          setDisplayAlert("flex");
        });
    } else {
      setAlertType("danger");
      setAlertHeading("Password and Confirmation Password Do Not Match");
      setAlertText(
        "please make sure that your password and confirmation password match!"
      );
      setDisplayAlert("flex");
    }
  };

  const handleLoginClick = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        localStorage.setItem("email", JSON.stringify(auth.currentUser.email));
        // Navigate to the home page after successful signup
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAlertType("danger");
        setAlertHeading("Invalid Credentials");
        setAlertText(
          "please make sure that you are using the right email and password!"
        );
        setDisplayAlert("flex");
      });
  };

  const handlePaneChange = () => {
    setDisplayAlert("none");
  };

  return (
    <Container className="body" fluid style={{ backgroundColor: "#2b3035" }}>
      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">My Machine Learning</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Sign in to continue</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row className="login-form-row">
        <Col></Col>
        <Col xs={8}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link onClick={handlePaneChange} eventKey="first">
                      Log In
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={handlePaneChange} eventKey="second">
                      Sign Up
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Form>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          onChange={handleloginEmailChange}
                          type="email"
                          placeholder="enter email"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          onChange={handleloginPasswordChange}
                          type="password"
                          placeholder="password"
                        />
                      </Form.Group>
                    </Form>
                    <Button
                      className="login-button"
                      onClick={handleLoginClick}
                      variant="primary"
                    >
                      Login
                    </Button>{" "}
                    <div style={{ display: displayAlert }}>
                      <AlertPopup
                        alertHeading={alertHeading}
                        alertType={alertType}
                        alertText={alertText}
                      ></AlertPopup>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Form>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          onChange={handleSignUpEmailChange}
                          type="email"
                          placeholder="enter email"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          onChange={handleSignUpPasswordChange}
                          type="password"
                          placeholder="enter password"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          onChange={handleSignUpConfirmPasswordChange}
                          type="password"
                          placeholder="re-enter password"
                        />
                      </Form.Group>
                    </Form>
                    <Button
                      className="signUp-button"
                      onClick={handleSignUpClick}
                      variant="primary"
                    >
                      Sign Up
                    </Button>{" "}
                    <div style={{ display: displayAlert }}>
                      <AlertPopup
                        alertHeading={alertHeading}
                        alertType={alertType}
                        alertText={alertText}
                      ></AlertPopup>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
        <Col></Col>
      </Row>
      <Row className="subtext-row">
        <Col></Col>
        <Col xs={8}>
          <h4 className="login-subtext">
            Unlock your world. Log in to access your account and experience
            seamless, and personalized interactions. Your journey begins here.
          </h4>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Login;
