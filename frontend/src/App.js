import { BrowserRouter } from "react-router-dom";
import data from "./data";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <img
              className="brand-logo"
              src="https://d9hhrg4mnvzow.cloudfront.net/try.shopkeeper.com/lp/amazon-profit-analytics-3/1i6s2e1-logo-sm_1000000000000000000028.png"
              alt="Logo"
            />
          </div>
          <div>
            <a href="cart.html">Cart</a>
            <a href="signIn.html">Sign In</a>
          </div>
        </header>
        <main>
          <h3>Featured Products</h3>
          <div className="products">
            {data.products.map((product) => (
              <div key={product._id} className="product">
                <a href={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.name} />
                </a>
                <div className="product__info">
                  <a href={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                  </a>
                  <p> $ {product.price}</p>
                  <button>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </main>
        <footer className="row center">
          All Right reserved by &nbsp; <span> Shopkeeper</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
