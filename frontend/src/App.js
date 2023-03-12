import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";

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
          <Routes>
            <Route path="/product/:id" Component={ProductScreen}></Route>
            <Route path="/" Component={HomeScreen} exact></Route>
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
