import axios from "axios";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { Store } from "../components/Store";

const CartScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // Update cart item quantity
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, Products is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  // Remove cart items
  const removeCartItem = (item) => {
    ctxDispatch({ type: "REMOVE_CART_ITEM", payload: item });
  };

  //  Handle checkout
  const handleCheckout = () => {
    navigate(`/signIn?redirect=/shipping`);
  };

  return (
    <div className="container">
      <Helmet>
        <title>Shopping cart</title>
      </Helmet>
      <h2>Shopping cart</h2>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Continue shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={5}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />
                      <Link to={`/products/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3} style={{ fontWeight: "normal" }}>
                      {" "}
                      Price: $ {item.price}
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => updateCartHandler(item, item.quantity - 1)}
                        style={{ background: "white" }}
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        {" "}
                        <i className="fa fa-minus-circle" style={{ color: "gray" }}></i>{" "}
                      </Button>
                      <span style={{ fontWeight: "normal" }}>{item.quantity}</span>{" "}
                      <Button
                        onClick={() => updateCartHandler(item, item.quantity + 1)}
                        style={{ background: "white" }}
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        {" "}
                        <i className="fa fa-plus-circle" style={{ color: "gray" }}></i>{" "}
                      </Button>
                    </Col>

                    <Col md={1}>
                      <Button
                        onClick={() => removeCartItem(item)}
                        style={{ background: "white", fontSize: "18px", color: "red" }}
                        variant="light"
                      >
                        <i className="fa fa-trash"></i>{" "}
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3 style={{ fontSize: "25px", fontWeight: "bold" }}>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      onClick={handleCheckout}
                      style={{ fontSize: "16px" }}
                      variant="secondary"
                      type="button"
                      disabled={cartItems.length === 0}
                    >
                      Proceed to checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
