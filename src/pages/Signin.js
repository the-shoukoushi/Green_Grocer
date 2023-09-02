import React, { useState } from "react";
import "../styles/signin_up.css";
import { Link, useNavigate } from "react-router-dom";

const Signin = ({ setLoggedIn, setUsername }) => {
  const navigate = useNavigate();
  const [signinUsername, setSigninUsername] = useState(""); // Rename this variable

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: signinUsername,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      alert("Invalid Credentials");
    } else {
      sessionStorage.setItem("userId", data.userId); // Store the userId
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("name", data.name);
      setLoggedIn(true);
      setUsername(data.username);
      setTimeout(() => {
        navigate("/Shopping");
      }, 100);
    }
  };

  return (
    <div>
      <body>
        <div className="wrapper">
          <form onSubmit={handleSubmit} method="POST" className="form-box">
            <div className="login-container" id="login">
              <div className="top">
                <span>
                  Don't have an account? <Link to="/Signup">Register</Link>
                </span>
                <header>Log In</header>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Username"
                  name="username"
                  value={signinUsername} // Use the renamed variable
                  onChange={(e) => setSigninUsername(e.target.value)} // Use the renamed setter function
                />
                <i className="bx bx-user"></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="bx bx-lock-alt"></i>
              </div>
              <div className="input-box">
                <input type="submit" className="submit" value="Sign In" />
              </div>
              <div className="two-col">
                <div className="one">
                  <input type="checkbox" id="login-check" />
                  <label htmlFor="login-check">Remember Me</label>
                </div>
                <div className="two"></div>
              </div>
            </div>
          </form>
        </div>
      </body>
    </div>
  );
};

export default Signin;
