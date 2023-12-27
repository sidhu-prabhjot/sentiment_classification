import React from "react";
import Alert from "react-bootstrap/Alert";

const AlertPopup = ({ alertHeading, alertText, alertType }) => {
  return (
    <Alert variant={alertType}>
      <Alert.Heading>{alertHeading}</Alert.Heading>
      <p>{alertText}</p>
    </Alert>
  );
};

export default AlertPopup;
