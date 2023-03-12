import React from "react";
import Rating from "../components/Rating";
import data from "../data";

const ProductScreen = (props) => {
  const productId = props.match.params.id;
  console.log(productId);
  const product = data.products.find((pd) => pd._id === productId);
  console.log(product);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <div>
      <div className="row">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name} />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
          </ul>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
};

export default ProductScreen;
