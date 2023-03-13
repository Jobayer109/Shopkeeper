import axios from "axios";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";

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
        dispatch({ type: "Fetch_Failed", payload: error.message });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="product__main">
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
              <span className="inStock">In stock</span>
            ) : (
              <span className="unavailable">Unavailable</span>
            )}
          </small>{" "}
        </p>
        {product.countInStock > 0 ? <button>Add to Cart</button> : ""}
      </div>
    </div>
  );
};

export default ProductScreen;
