import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import logger from "use-reducer-logger";
import Product from "../components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "Fetch_Request":
      return { ...state, loading: true };
    case "Fetch_Success":
      return { ...state, products: action.payload, loading: false };
    case "Fetch_Failed":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "Fetch_Request" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "Fetch_Success", payload: result.data });
      } catch (error) {
        dispatch({ type: "Fetch_Failed", payload: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Shopkeeper</title>t
      </Helmet>
      <h3>Featured Products</h3>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => <Product product={product} />)
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
