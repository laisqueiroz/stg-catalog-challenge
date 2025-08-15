// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcommerceCatalog from "./pages/CatalogPage";
import CartPage from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CartProvider } from "./contexts/CartContext";
import OrderSummaryPage from "./pages/OrderSummaryPage";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<EcommerceCatalog />} />
          <Route path="/cart" element={<CartPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/order-summary" element={<OrderSummaryPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
