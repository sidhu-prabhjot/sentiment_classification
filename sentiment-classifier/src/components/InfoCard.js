import React from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const InfoCard = ({
  cardHeader,
  cardTitle,
  cardText,
  borderStyle = "primary",
}) => {
  return (
    <Card
      border={borderStyle}
      style={{ width: "16rem", overflow: "hidden", marginBottom: "20px" }}
    >
      <Card.Header style={{ backgroundColor: "#262a2e", color: "#adb5bd" }}>
        Header
      </Card.Header>
      <Card.Body style={{ backgroundColor: "#212529" }}>
        <Card.Title style={{ color: "#adb5bd" }}>Danger Card Title</Card.Title>
        <Card.Text style={{ color: "#adb5bd" }}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default InfoCard;
