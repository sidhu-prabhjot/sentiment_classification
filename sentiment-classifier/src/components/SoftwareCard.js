import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const SoftwareCard = ({
  cardTitle,
  cardText,
  cardButtonText,
  buttonVariant,
  imgSrc,
  colorMode,
}) => {
  return (
    <Card
      style={{ width: "18rem", marginBottom: "20px" }}
      data-bs-theme={colorMode}
    >
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>{cardText}</Card.Text>
        <Button variant={buttonVariant}>{cardButtonText}</Button>
      </Card.Body>
    </Card>
  );
};

export default SoftwareCard;
