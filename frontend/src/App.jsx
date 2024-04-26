import "./App.css";
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/productDetail";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from "./pages/cart";

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <ToastContainer theme="dark" position= "top-center"/>
          <Header cartItems={cartItems}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Home/>}/>
            <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems}/>}/>
            <Route path="/cart"  element={ <Cart cartItems={cartItems}  setCartItems={setCartItems}  />}/>
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
