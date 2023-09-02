/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../styles/footer.css"; // Make sure to import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faPhone } from "@fortawesome/free-solid-svg-icons";
const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>COMPANY</h4>
            <ul>
              <li>
                <a href="about">about us</a>
              </li>
              <li>
                Our services
              </li>
              <li>
                Privacy policy
              </li>
              <li>
                Affiliate program
              </li>
            </ul>
          </div>

                    <div className="footer-col">
            <h4>PARTNERS</h4>
            <ul>
              <li>
                <a href="https://www.bigbasket.com/">Bigbasket</a>
              </li>
              <li>
                <a href="https://www.grofers.com/">Grofers</a>
              </li>
              <li>
                <a href="https://www.milkbasket.com/">Milkbasket</a>
              </li>
              <li>
              <a href="https://www.amazon.in/pantry-online-grocery-shopping-store/b?ie=UTF8&node=9574332031">Amazon Pantry</a>
              </li>
              <li>
                +Many more...
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>ADDRESS</h4>
           <ul>
              <li>
              <a href="contactus"> Building 101<br></br>
               Green Avenue<br></br>
               Dehradun<br></br>
               248001<br></br>
               Uttarakhand</a>
              </li>
              
            </ul>
          </div>
          <div className="footer-col">
            <h4>FOLLOW US</h4>
            <div className="social-links">
              <a href="#">
                <FontAwesomeIcon icon={faFacebookF} className="fa-fade" />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} className="fa-fade" />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} className="fa-fade" />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faLinkedinIn} className="fa-fade" />
              </a>
              <h4>CONTACT US</h4>
              <a href="/contactus">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="fa-beat-fade"
                  style={{ color: "#035318" }}
                />
              </a>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className="footerBottom">
        <p>
          Copyright{" "}
          <FontAwesomeIcon
            icon={faCopyright}
            className="fa-beat-fade"
            size="xl"
          />
          <span> Green Grocer Supplies Pvt Ltd</span>
          <span className="designer"></span>
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
