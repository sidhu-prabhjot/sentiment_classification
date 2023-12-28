import React from "react";
import Form from "react-bootstrap/Form";

const LoginForm = ({
  labelTop = "Email",
  labelBottom = "Password",
  placeHolderTop = "Enter Email",
  placeHolderBottom = "Enter Password",
}) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>{labelTop}</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>{labelBottom}</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
