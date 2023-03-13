import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";

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
            <Link href="cart.html">Cart</Link>
            <Link href="signIn.html">Sign In</Link>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
          </Routes>
        </main>
        <footer className="row center">
          All Right reserved by &nbsp; <span> Shopkeeper</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
