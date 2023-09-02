import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import About from "./pages/About";
import Shopping from "./pages/Shopping";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./components/Search.js";
import ContactUs from "./pages/contactus";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("loggedIn") === "true"
  );
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || ""
  );

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    sessionStorage.setItem("loggedIn", loggedIn);
  }, [loggedIn]);

  // Fetch the cart data when the component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/get-cart/${userId}`
      );
      const data = await response.json();
      console.log("Fetched Cart Items:", data);
      setCartItems(data);
    };

    fetchCartData();
  }, []);

  return (
    <Router>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        username={username}
      />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Contactus" element={<ContactUs />} />
        {/* <Route path="/shopping" element={<Shopping />} /> */}
        <Route
          path="/shopping"
          element={<Shopping setCartItems={setCartItems} />}
        />

        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />

        <Route
          path="/Signin"
          element={
            <Signin setLoggedIn={setLoggedIn} setUsername={setUsername} />
          }
        />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
