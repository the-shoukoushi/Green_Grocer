import React, { useState } from "react";
import "../styles/signin_up.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [fname, setField1] = useState("");
  const [lname, setField2] = useState("");
  const [username, setField3] = useState("");
  const [email, setField4] = useState("");
  const [password, setField5] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend API endpoint
      await axios.post("/register", {
        fname,
        lname,
        username,
        email,
        password,
      });
      alert("Data saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save data.");
    }
  };

  return (
    <div>
      <body>
        <div className="wrapper">
          <form action="POST" onSubmit={handleSubmit} className="form-box">
            <div className="register-container" id="register">
              <div className="top">
                <span>
                  Have an account? <Link to="/signin">Login</Link>
                </span>
                <header>Sign up</header>
              </div>
              <div className="two-forms">
                <div className="input-box">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="First Name"
                    name="fname"
                    onChange={(e) => setField1(e.target.value)}
                  />
                  <i className="bx bx-user"></i>
                </div>
                <div className="input-box">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Last Name"
                    name="lname"
                    onChange={(e) => setField2(e.target.value)}
                  />
                  <i className="bx bx-user"></i>
                </div>
              </div>

              <div className="input-box">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => setField3(e.target.value)}
                />
                <i className="bx bx-user"></i>
              </div>

              <div className="input-box">
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => setField4(e.target.value)}
                />
                <i className="bx bx-envelope"></i>
              </div>

              <div className="input-box">
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setField5(e.target.value)}
                />
                <i className="bx bx-lock-alt"></i>
              </div>

              <div className="input-box">
                <input
                  type="submit"
                  name="signup"
                  className="submit"
                  value="Register"
                />
              </div>

              <div className="two-col">
                <div className="one">
                  <input type="checkbox" id="register-check" />
                  <label for="register-check">Remember Me</label>
                </div>
                <div className="two">
                  <label></label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </body>
    </div>
  );
};

export default Signup;
