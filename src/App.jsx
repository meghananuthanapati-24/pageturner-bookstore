import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import BookListing from "./pages/BookListing/BookListing";
import BookDetails from "./pages/BookDetails/BookDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import "./styles/globals.css";

function ScrollToTop() {
  // Scroll to top on route change
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<BookListing />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={
                <div className="empty-state" style={{ marginTop: "4rem" }}>
                  <div className="icon">🔍</div>
                  <h3>Page Not Found</h3>
                  <p>The page you are looking for doesn't exist.</p>
                  <a href="/" className="btn btn-primary">Go Home</a>
                </div>
              } />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
