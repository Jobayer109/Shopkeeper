import React from "react";
import { Link } from "react-router-dom";
import data from "../data";

const HomeScreen = () => {
  return (
    <div>
      <h3>Featured Products</h3>
      <div className="products">
        {data.products.map((product) => (
          <div key={product._id} className="product">
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product__info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p> $ {product.price}</p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
