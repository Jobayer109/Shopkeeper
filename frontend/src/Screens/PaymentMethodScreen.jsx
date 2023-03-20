import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../components/Store";

const PaymentMethodScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || "Paypal");

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeOrder");
  };

  return (
    <div>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>

      <div style={{ paddingLeft: "10%", paddingRight: "10%", marginBottom: "30px" }}>
        <CheckoutSteps step1 step2 step3 />
      </div>
      <div style={{ paddingLeft: "30%", paddingRight: "30%" }}>
        <h1 className="my-3 fw-bold">Payment Method</h1>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Paypal"
              label="Paypal"
              value="Paypal"
              checked={paymentMethodName === "Paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button style={{ paddingLeft: "20px", paddingRight: "20px" }} type="submit">
              Continue
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
