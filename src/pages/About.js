/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../styles/about.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

function About() {
  return (
    <div className="about-us">
      <div className="container">
        <div className="row">
          <div id="header"></div>
          <div className="flex">
            <h2>About Us</h2>
            <h3>Discover our team story</h3>
            <p>
              Welcome to My Vegetable Shop, your one-stop destination for fresh
              and organic vegetables sourced directly from local farmers. We are
              passionate about providing you and your family with the best
              quality produce, all delivered right to your doorstep
            </p>
            <p>
              At My Vegetable Shop, our mission is to promote healthy living and
              sustainable agriculture. We are committed to supporting local
              farmers and empowering them to grow and supply their produce while
              preserving the environment.
            </p>
            <section>
              <h2>Why Choose Us</h2>
              <ul>
                <li>
                  Freshness Guaranteed: We take pride in offering only the
                  freshest vegetables. Our produce comes straight from the farm
                  to your table, ensuring maximum nutrition and taste.
                </li>
                <li>
                  Organic and Natural: Our commitment to organic farming
                  practices means that you can trust the purity of our
                  vegetables without any harmful chemicals.
                </li>
                <li>
                  Supporting Local Farmers: By choosing My Vegetable Shop, you
                  contribute to the growth of local farming communities and
                  their sustainable livelihood.
                </li>
                <li>
                  Wide Selection: From leafy greens to seasonal favorites, we
                  have a wide variety of vegetables to meet your culinary needs.
                </li>
                <li>
                  Convenience: With our easy-to-navigate website, you can order
                  your vegetables online and have them delivered to your home
                  hassle-free.
                </li>
              </ul>
            </section>
            <section>
              <h2>Our Commitment</h2>
              <p>
                At My Vegetable Shop, we are committed to your satisfaction. We
                value your feedback and continuously strive to improve our
                services. If you have any questions, suggestions, or concerns,
                please feel free to contact us at contact@myvegetableshop.com or
                call us at (123) 456-7890.
              </p>
            </section>
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
            </div>
            <a href="#" className="btn">
              Learn More
            </a>
          </div>
          <div className="flex">
            <img src="photo-1518843875459-f738682238a6.jfif" alt="" />
          </div>
        </div>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default About;
