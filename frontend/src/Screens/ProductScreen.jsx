import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import Badge from "react-bootstrap/Badge";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { Store } from "../components/Store";
import getError from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "Fetch_Request":
      return { ...state, loading: true };
    case "Fetch_Success":
      return { ...state, product: action.payload, loading: false };
    case "Fetch_Failed":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "Fetch_Request" });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: "Fetch_Success", payload: result.data });
      } catch (error) {
        dispatch({ type: "Fetch_Failed", payload: getError(error) });
      }
    };
    fetchData();
  }, [slug]);

  //
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, Products is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  };

  return loading ? (
    <LoadingBox className="loader" />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="product__main">
      <Helmet>
        <title>{product.name}</title>t
      </Helmet>
      <div>
        <img className="product__img" src={product.image} alt={product.name} />
      </div>
      <div className="product__details">
        <h2>{product.name}</h2>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <h4>Price: ${product.price}</h4>
        <p>
          Description: <br /> <small>{product.description}</small>
        </p>
      </div>
      <div className="product__actions">
        <h3>Price: $ {product.price}</h3>
        <p>
          Status:{" "}
          <small>
            {product.countInStock > 0 ? (
              <Badge bg="success">In stock</Badge>
            ) : (
              <Badge bg="danger">Unavailable</Badge>
            )}
          </small>{" "}
        </p>
        {product.countInStock > 0 ? <button onClick={addToCartHandler}>Add to Cart</button> : ""}
      </div>
    </div>
  );
};

export default ProductScreen;
