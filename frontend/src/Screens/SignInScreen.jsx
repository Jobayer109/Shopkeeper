import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";

const SignInScreen = () => {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control className="fs-3" type="email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control className="fs-3" type="password" required />
        </Form.Group>
        <div className="mb-3">
          <button style={{ paddingLeft: "20px", paddingRight: "20px" }} type="submit">
            Sign In
          </button>
        </div>
        <div className="mb-3">
          New in Shopkeeper ? <Link to={`/signUp?redirect/${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignInScreen;
