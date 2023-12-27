import "./App.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";

//import components
import SoftwareCard from "../src/components/SoftwareCard";
import InfoCard from "../src/components/InfoCard";

function App() {
  return (
    <Container fluid style={{ backgroundColor: "#2b3035" }}>
      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">My Machine Learning</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row className="selection-row">
        <h1>Select A Machine Learning Tool</h1>
        <Col></Col>
        <Col className="d-flex justify-content-center">
          <SoftwareCard
            cardTitle="Sentiment Classifier"
            cardText="A machine learning model trained to determine if a review is negative or positive"
            buttonVariant="primary"
            cardButtonText="Select"
            imgSrc={require("../src/images/sentiment_classifier_card_img.jpg")}
            colorMode="dark"
          ></SoftwareCard>
        </Col>
        <Col className="d-flex justify-content-center">
          <SoftwareCard
            cardTitle="Hatespeech Detector"
            cardText="A machine learning model trained to detect hatespeech and offensive language"
            buttonVariant="secondary"
            cardButtonText="Coming Soon..."
            imgSrc={require("../src/images/hatespeech_detector_card_img.jpg")}
            colorMode="dark"
          ></SoftwareCard>
        </Col>
        <Col></Col>
      </Row>
      <Row className="form-row">
        <h1>Sentiment Classifier</h1>
        <Col></Col>
        <Col xs={6}>
          <Form data-bs-theme="dark">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Review Text (Max 500 Characters)</Form.Label>
              <Form.Control maxLength={500} as="textarea" rows={3} />
            </Form.Group>
          </Form>
          <Row className="button-spinner-row">
            <Button
              className="submission-button"
              variant="outline-success"
              size="lg"
            >
              Submit
            </Button>
            <div className="submit-spinner-container">
              <Spinner animation="border" variant="light" />
            </div>
          </Row>
        </Col>
        <Col></Col>
      </Row>
      <Row className="learn-more-row">
        <h1>Features</h1>
        <Col className="info-card-column">
          <InfoCard borderStyle="primary"></InfoCard>
        </Col>
        <Col className="info-card-column">
          <InfoCard borderStyle="success"></InfoCard>
        </Col>
        <Col className="info-card-column">
          <InfoCard borderStyle="danger"></InfoCard>
        </Col>
        <Col className="info-card-column">
          <InfoCard borderStyle="warning"></InfoCard>
        </Col>
        <Col className="info-card-column">
          <InfoCard borderStyle="info"></InfoCard>
        </Col>
        <Row>
          <Col></Col>
          <Col>
            <p className="section-subtext">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga.
            </p>
          </Col>
          <Col></Col>
        </Row>
      </Row>
      <Row className="about-row">
        <h1>About</h1>
        <Col></Col>
        <Col xs={8}>
          <Accordion
            className="about-accordion"
            defaultActiveKey="0"
            data-bs-theme="dark"
            flush
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>Accordion Item #1</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col></Col>
      </Row>
      <Row className="footer-row">
        <Col className="footer-column">
          <a className="footer-link" href="#">
            Prabhjot Sidhu 2023
          </a>
        </Col>
        <Col className="footer-column">
          <a className="footer-link" href="#">
            sidhu.prabhjot@outlook.com
          </a>
        </Col>
        <Col className="footer-column">
          <a className="footer-link" href="#">
            Portfolio
          </a>
        </Col>
        <Col className="footer-column">
          <a className="footer-link" href="#">
            LinkedIn
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
