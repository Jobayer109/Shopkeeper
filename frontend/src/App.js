import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="main__container">
        <header className="header__items">
          <div>
            <Link to="/">
              <img
                className="brand-logo"
                src="https://d9hhrg4mnvzow.cloudfront.net/try.shopkeeper.com/lp/amazon-profit-analytics-3/1i6s2e1-logo-sm_1000000000000000000028.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div>
            <Link to="/cart">Cart</Link>
            <Link to="/signIn">Sign In</Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
          </Routes>
        </main>
        <footer className="center">
          <small>
            All Right reserved by &nbsp; <span> Shopkeeper</span>
          </small>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
