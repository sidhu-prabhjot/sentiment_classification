import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

//import components
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleButtonClick = () => {
    createUserWithEmailAndPassword(
      auth,
      "sidhu.prabhjot@outlook.com",
      "password123"
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // Navigate to the home page after successful signup
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // Handle error, e.g., show error message to the user
      });
  };

  return (
    <Container fluid style={{ backgroundColor: "#2b3035" }}>
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
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Log In</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <LoginForm></LoginForm>
                  <Button variant="primary">Login</Button>{" "}
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <SignUpForm></SignUpForm>
                  <Button variant="primary">Sign Up</Button>{" "}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Row>
    </Container>
  );
};

export default Login;
