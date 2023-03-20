import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import { Store } from "../components/Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "Create_Request":
      return { ...state, loading: true };
    case "Create_Success":
      return { ...state, loading: false };
    case "Create_Fail":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.1243 =123.12
  cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  // Place order
  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "Create_Request" });
      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "Create_Success" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      dispatch({ type: "Create_Fail" });
      alert(error.message);
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div>
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      <div style={{ paddingLeft: "10%", paddingRight: "10%", marginBottom: "30px" }}>
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div style={{ paddingLeft: "9.5%", paddingRight: "9.5%" }}>
        <h1 className="fw-bold my-5">Order Preview</h1>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="fs-4 fw-bold">Shipping</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {cart.shippingAddress.fullName}, <br />{" "}
                  <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                  {cart.shippingAddress.country}
                </Card.Text>
                <Link to="/shipping">Edit</Link>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="fs-4 fw-bold">Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {cart.paymentMethod}
                </Card.Text>
                <Link to="/payment">Edit</Link>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="fs-4 fw-bold">Items</Card.Title>
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            className="img-fluid rounded img-thumbnail"
                            src={item.image}
                            alt={item.name}
                          />
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>$ {item.price}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                  <Link to="/cart">Edit</Link>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title className="fs-4 fw-bold">Order summary</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>{cart.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>{cart.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>{cart.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Order Total</Col>
                      <Col>{cart.totalPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <button
                        type="submit"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                      >
                        Place Order
                      </button>
                    </div>
                    {loading && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;