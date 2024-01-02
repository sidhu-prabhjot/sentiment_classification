import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { getAuth } from "firebase/auth";
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
import AlertPopup from "../src/components/AlertPopup";

const handlePredictRequest = async (reviewData) => {
  const postData = {
    examples: reviewData,
  };

  try {
    const response = await fetch("http://127.0.0.1:4000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();
    const prediction = data.predictions[0][0];
    console.log("Response from server:", prediction);
    return prediction;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propagate the error up the chain
  }
};

const handleSaveToDatabaseRequest = async (feedbackData) => {
  try {
    const response = await fetch("http://127.0.0.1:4000/saveToDatabase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });

    const data = await response.json();
    console.log("Response from server:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propagate the error up the chain
  }
};

function Main() {
  //state variables
  const storedUserEmail = localStorage.getItem("email");
  const userEmail = storedUserEmail ? JSON.parse(storedUserEmail) : null;
  const [textAreaValue, setTextAreaValue] = useState("");
  const [prediction, setPrediction] = useState(0);
  const [displayLoading, setDisplayLoading] = useState("none");
  const [sentimentHeader, setSentimentHeader] = useState("Positive");
  const [sentimentText, setSentimentText] = useState(
    "The review that you entered was detected as a POSITIVE review. If this was either correct or wrong, please let us know by filling the form below!"
  );
  const [popupType, setPopupType] = useState("success");
  const [displayPopup, setDisplayPopup] = useState("none");
  const [selectedOption, setSelectedOption] = useState("correct");

  //watch for changes in state
  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  //handle textArea state change
  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };

  //handle feedback submission radio buttons state change
  const handleRadioChange = async (event) => {
    //event.target.value will be either "correct" or "wrong"
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);
  };

  //submit a review handler
  const handleSubmitPredict = async (event) => {
    event.preventDefault();
    console.log("Textarea Value:", textAreaValue);
    setDisplayLoading("flex");

    try {
      const result = await handlePredictRequest([textAreaValue]);
      setPrediction(result);

      // Update popup based on the prediction result
      setDisplayLoading("none");
      setDisplayPopup("flex");

      if (result < 0.5) {
        setPopupType("danger");
        setSentimentHeader("Negative");
        setSentimentText(
          "The review that you entered was detected as a NEGATIVE review. If this was either correct or wrong, please let us know by filling the form below!"
        );
      } else {
        setPopupType("success");
        setSentimentHeader("Positive");
        setSentimentText(
          "The review that you entered was detected as a POSITIVE review. If this was either correct or wrong, please let us know by filling the form below!"
        );
      }
    } catch (error) {
      console.error("Error in handleSubmitPredict:", error);
      setDisplayLoading("none");
    }
  };

  //handle submitting feedback
  const handleSubmitFeedback = async (event) => {
    //values to send to server to save to database
    const email = userEmail;
    const review = textAreaValue;
    let sentiment = 1;

    if (prediction < 0.5) {
      sentiment = 0;
    } else {
      sentiment = 1;
    }

    let correct = 1;

    if (selectedOption === "correct") {
      correct = 1;
    } else {
      correct = 0;
    }

    const dataObject = {
      email: email,
      review: review,
      sentiment: sentiment,
      correct: correct,
    };

    try {
      handleSaveToDatabaseRequest(dataObject);
    } catch (error) {
      console.error("Error in handleSubmitFeedback:" + error);
    }
  };

  return (
    <Container fluid style={{ backgroundColor: "#2b3035" }}>
      <Navbar className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">My Machine Learning</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <span style={{ color: "white" }}>{userEmail}</span>
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
              <Form.Control
                maxLength={500}
                as="textarea"
                rows={3}
                onChange={handleTextAreaChange}
              />
            </Form.Group>
          </Form>
          <Row className="button-spinner-row">
            <Button
              className="submission-button"
              variant="outline-success"
              size="lg"
              onClick={handleSubmitPredict}
            >
              Submit
            </Button>
            <div
              className="submit-spinner-container"
              style={{ display: displayLoading }}
            >
              <Spinner animation="border" variant="light" />
            </div>
            <div
              className="alert-popup-container"
              style={{ display: displayPopup }}
            >
              <AlertPopup
                alertHeading={sentimentHeader}
                alertText={sentimentText}
                alertType={popupType}
              ></AlertPopup>
            </div>
            <div
              className="feedback-form-container"
              style={{ display: displayPopup }}
            >
              <h3>Feedback:</h3>
              <Form>
                {["radio"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="correct classification"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      value="correct"
                      onChange={handleRadioChange}
                      checked={selectedOption === "correct"}
                    />
                    <Form.Check
                      inline
                      label="wrong classification"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                      value="wrong"
                      onChange={handleRadioChange}
                      checked={selectedOption === "wrong"}
                    />
                  </div>
                ))}
              </Form>
              <p className="alert-text">
                *Please note that by clicking the submit button below, your
                email, review, and sentiment classification will be added to a
                database, and may be reviewed so it can be used to train an
                updated model of the Sentiment Classifier.
              </p>
              <Button
                onClick={handleSubmitFeedback}
                className="submit-form-button"
                variant="primary"
              >
                Submit
              </Button>{" "}
            </div>
          </Row>
        </Col>
        <Col></Col>
      </Row>
      <Row className="learn-more-row">
        <h1>Webpage Features</h1>
        <Col className="info-card-column">
          <InfoCard
            borderStyle="primary"
            cardHeader="positive or negative?"
            cardTitle="Classify Reviews"
            cardText="The sentiment classifier is able to classify reviews as positive or negative using machine learning."
          ></InfoCard>
        </Col>
        <Col className="info-card-column">
          <InfoCard
            borderStyle="success"
            cardHeader="powered by Tensorflow"
            cardTitle="Machine Learning"
            cardText="The sentiment classifier was constructed using Google's open-source machine learning framework."
          ></InfoCard>
        </Col>
        <Col className="info-card-column">
          <InfoCard
            borderStyle="danger"
            cardHeader="improving with your help"
            cardTitle="Continous Learning"
            cardText="Through feedback, the sentiment classifier will learn more with new data."
          ></InfoCard>
        </Col>
        <Col className="info-card-column">
          <InfoCard
            borderStyle="info"
            cardHeader="modern frameworks"
            cardTitle="React JS"
            cardText="The front-end of the sentiment classifier was constructed with React JS."
          ></InfoCard>
        </Col>
        <Col className="info-card-column">
          <InfoCard
            borderStyle="warning"
            cardHeader="secure authentication"
            cardTitle="Firebase"
            cardText="Access to the sentiment classifier is secured with Firebase Authentication."
          ></InfoCard>
        </Col>
        <Row>
          <Col></Col>
          <Col>
            <p className="section-subtext">
              I am building a sentiment classification platform for honest
              expression. With Firebase Authentication ensuring user security,
              React.js for a user-friendly interface, and Python with TensorFlow
              for accurate sentiment analysis, my goal is to provide a simple
              yet powerful tool. As a student, I aim to create a practical
              solution that helps users express and understand sentiments
              effectively.
            </p>
          </Col>
          <Col></Col>
        </Row>
      </Row>
      <Row className="about-row">
        <h1>About</h1>
        <Col></Col>
        <Col xs={8}>
          <Accordion className="about-accordion" data-bs-theme="dark" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Technology Stack</Accordion.Header>
              <Accordion.Body>
                <p>Languages and Markups</p>
                <ul>
                  <li>Python</li>
                  <li>JavaScript</li>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>JSX</li>
                  <li>SQL</li>
                </ul>
                <p>Frameworks and Services</p>
                <ul>
                  <li>Google Tensorflow</li>
                  <li>React JS</li>
                  <li>Bootstrap</li>
                  <li>SQLite</li>
                  <li>Firebase</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Upcoming Updates</Accordion.Header>
              <Accordion.Body>
                <p>In order of priority</p>
                <ol>
                  <li>Building hatespeech detecor</li>
                  <li>Reading multiple reviews at one time</li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>More</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>
                    🚀 Explore my creative journey! Visit my portfolio website
                    to dive into a collection of my latest projects, showcasing
                    my skills and passion. Discover the stories behind each
                    creation and see how innovation meets design. Check it out
                    at{" "}
                    <a href="https://master.d3i3lan1a0whye.amplifyapp.com/">
                      Prabhjot Sidhu's Portfolio
                    </a>
                    .
                  </li>
                  <li>
                    🤝 Let's connect on LinkedIn! Explore my professional
                    journey, discover shared interests, and stay updated on my
                    latest endeavors. Connect with me at my{" "}
                    <a href="http://www.linkedin.com/in/prabhjot-sidhu-b48b71235">
                      LinkedIn
                    </a>
                    . Together, we can build meaningful professional connections
                    and explore exciting opportunities.
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col></Col>
      </Row>
      <Row className="footer-row">
        <Col className="footer-column non-link-text">Prabhjot Sidhu 2023</Col>
        <Col className="footer-column non-link-text">
          sidhu.prabhjot@outlook.com
        </Col>
        <Col className="footer-column">
          <a
            className="footer-link"
            href="https://master.d3i3lan1a0whye.amplifyapp.com/"
          >
            Portfolio
          </a>
        </Col>
        <Col className="footer-column">
          <a
            className="footer-link"
            href="http://www.linkedin.com/in/prabhjot-sidhu-b48b71235"
          >
            LinkedIn
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
