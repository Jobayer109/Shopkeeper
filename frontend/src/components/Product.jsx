import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = (props) => {
  const { product } = props;
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
        <p> $ {product.price}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
