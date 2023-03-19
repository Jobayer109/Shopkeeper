import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../components/Store";

const ShippingAddressScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!userInfo) {
      navigate("/signIn?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const shippingAddressHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    navigate("/payment");
  };

  return (
    <div style={{ paddingLeft: "30%", paddingRight: "30%" }}>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 />
      <h1 className="my-3 fw-bold">Shipping Address</h1>
      <Form onSubmit={shippingAddressHandler}>
        <Form.Group className="mb-3 " controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            className="fs-3"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            className="fs-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            className="fs-3"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            className="fs-3"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 " controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            className="fs-3"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </Form.Group>

        <div className="mb-3">
          <button style={{ paddingLeft: "20px", paddingRight: "20px" }} type="submit">
            Continue
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ShippingAddressScreen;
