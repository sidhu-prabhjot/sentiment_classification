import React from "react";
import Form from "react-bootstrap/Form";

const SignUpForm = ({
  labelTop = "Email",
  labelMiddle = "Password",
  labelBottom = "Confirm Password",
  placeHolderTop = "Enter Email",
  placeHolderMiddle = "Enter Password",
  placeHolderBottom = "Re-enter Password",
}) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>{labelTop}</Form.Label>
        <Form.Control type="email" placeholder={placeHolderTop} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>{labelMiddle}</Form.Label>
        <Form.Control type="password" placeholder={placeHolderMiddle} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>{labelBottom}</Form.Label>
        <Form.Control type="password" placeholder={placeHolderBottom} />
      </Form.Group>
    </Form>
  );
};

export default SignUpForm;
