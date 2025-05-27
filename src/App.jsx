import "./App.css";
import { Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Navbar from "./styling/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
