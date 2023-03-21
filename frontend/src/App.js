import { useContext } from "react";
import Badge from "react-bootstrap/Badge";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Store } from "./components/Store";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/HomeScreen";
import OrderScreen from "./Screens/OrderScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import ProductScreen from "./Screens/ProductScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import SignInScreen from "./Screens/SignInScreen";
import SignUpScreen from "./Screens/SignUpScreen";
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
  };

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
          <div className="header__right">
            <div>
              <Link to="/cart">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
            </div>
            <div>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item className="dropDown">User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderHistory">
                    <NavDropdown.Item className="dropDown">Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link to="#signOut" className="dropdown-item dropDown" onClick={signOutHandler}>
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link to="/signIn">Sign In</Link>
              )}
            </div>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signIn" element={<SignInScreen />} />
            <Route path="/signUp" element={<SignUpScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeOrder" element={<PlaceOrderScreen />} />
            <Route path="/orders/:id" element={<OrderScreen />} />
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
