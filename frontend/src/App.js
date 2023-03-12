import data from "./data";

function App() {
  return (
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
        <div className="row center">
          {data.products.map((product) => (
            <div className="card" key={product._id}>
              <a href="product.html">
                <img className="medium" src={product.image} alt={product.name} />
              </a>
              <div className="card_body">
                <a href="product.html">
                  <h2>{product.name}</h2>
                </a>
                <div className="rating">
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                </div>
                <div className="price">$ {product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="row center">
        All Right reserved by &nbsp; <span> Shopkeeper</span>
      </footer>
    </div>
  );
}

export default App;
