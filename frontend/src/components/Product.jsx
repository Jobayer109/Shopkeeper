import axios from "axios";
import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Store } from "./Store";

const Product = (props) => {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // Add to cart handle
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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
  return (
    <div key={product._id} className="product">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product__info">
        <Link to={`/product/${product.slug}`}>
          <p>{product.name}</p>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="product__action">
          <p> $ {product.price}</p>
          {product.countInStock === 0 ? (
            <Button variant="danger" disabled>
              Out of Stock
            </Button>
          ) : (
            <Link to={`/product/${product.slug}`}>
              <button onClick={() => addToCartHandler(product)}>Add to Cart</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
