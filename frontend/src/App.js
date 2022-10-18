import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import CartPage from "./pages/CartPage";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/esm/Badge";

function App() {
  const cart = useSelector((state) => state.cart);
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.length}
                      {/* {cart.cartItems.reduce((a, c) => a + c.quantity, 0)} */}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
