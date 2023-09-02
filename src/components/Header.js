/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-distracting-elements */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faMobile,
  faHome,
  faUser,
  faShoppingCart,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const HeaderComponent = ({ loggedIn, setLoggedIn }) => {
  const [showStreamlit, setShowStreamlit] = useState(false);
  const handleVegetableIconClick = () => {
    setShowStreamlit(!showStreamlit);
  };
  const [username, setUsername] = useState(sessionStorage.getItem("username"));

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "username") {
        setUsername(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      {/* Top Header */}
      <marquee>
        <div className="width-100 top-header">
          <div className="container">
            <div className="width-50">
              <p className="head1p1 headquote">Green Grocers: Get it fresh! </p>
            </div>
            <div className="width-50">
              <ul className="head1ul cashback-sect">
                <li>
                  <FontAwesomeIcon icon={faUsers} className="fa-fade" />
                  <a className="head1mr" href="#">
                    <span> Refer Your Friend And Earn Rs. 500 Cashback</span>
                  </a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faMobile} className="fa-fade" />
                  <a href="#"> Download App</a>
                </li>
              </ul>
            </div>
          </div>
          <span className="navhead"></span>
        </div>
      </marquee>

      {/* Logo and Search Panel */}
      <div className="width-100 search-panel">
        <div className="container">
          <div className="width-20">
            <Link to="/">
              {" "}
              <img
                src="images/logo.png"
                alt="Your logo"
                style={{
                  position: "relative",
                  top: "-35px",
                  left: "-180px",
                  width: "220px",
                  height: "100px",
                }}
              />
            </Link>
          </div>
          {/* search section */}
          <form autoComplete="off">
            {" "}
            <div className="width-50">
              <input
                type="text"
                id="input"
                name="searchBox"
                placeholder="Search for exquisite fruits, vegetables and more"
              />
              <Link to="./Shopping">
                {" "}
                <button className="search-button">
                  {" "}
                  <FontAwesomeIcon icon={faSearch} className="fa-fade" />{" "}
                </button>
              </Link>
            </div>
            <ul className="list"></ul>
          </form>{" "}
          <script src="Search.js"></script>
          {/* Vegetable icon button */}
          <button className="chart-icon" onClick={handleVegetableIconClick}>
            <FontAwesomeIcon
              icon={faChartLine}
              className="fa-fade"
              size="2xl"
            />{" "}
            &nbsp; Vegetable Logs
          </button>
          <div className="width-30">
            <ul
              className="cart-sect"
              style={{ position: "relative", right: -160 }}
            >
              <li>
                <Link to="/">
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>{" "}
              </li>{" "}
              {loggedIn && (
                <>
                  <li>
                    <span>Welcome, {username}!</span>{" "}
                  </li>{" "}
                  <li>
                    {/* Show the cart icon */}
                    <Link to="/Cart">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        size="lg"
                        className="fa-flip"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      onClick={() => {
                        sessionStorage.clear();
                        setUsername(null);
                        setLoggedIn(false);
                      }}
                    >
                      {" "}
                      Logout
                    </Link>
                  </li>
                </>
              )}
              {!loggedIn && (
                <>
                  <li>
                    <Link to="/Signin">
                      <FontAwesomeIcon icon={faUser} /> Login
                    </Link>
                  </li>
                  <li>
                    {/* Show the cart icon */}
                    <Link to="/Cart">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        size="lg"
                        className="fa-flip"
                      />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {showStreamlit && (
        <div className="streamlit-container">
          <button className="close-button" onClick={handleVegetableIconClick}>
            Close
          </button>
          <iframe
            title="Streamlit App"
            src="http://localhost:8501"
            width="100%"
            height="600"
            style={{ border: "none", marginTop: "20px" }}
          ></iframe>
        </div>
      )}
    </>
  );
};

export default HeaderComponent;
