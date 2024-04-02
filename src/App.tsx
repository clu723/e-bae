import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { About } from "./pages/About";
import { Store } from "./pages/Store";
import { Navbar } from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Navbar></Navbar>
        <Container>
          <Routes>
            <Route path="/" element={<Navigate replace to="/store" />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
