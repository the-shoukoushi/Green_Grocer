import React, { useEffect, useState } from "react";
import "../styles/homepage.css";
import Counter from "./Counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as regularStar,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";

const Home = () => {
  const [shouldStartCounter, setShouldStartCounter] = useState(false);

  // Function to check if an element is in the viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const counterSectionHeight = element.offsetHeight;
    const threshold = windowHeight * 0.2;

    return (
      rect.top >= -threshold &&
      rect.bottom <= windowHeight + threshold &&
      rect.top >= -counterSectionHeight &&
      rect.bottom <= windowHeight + counterSectionHeight
    );
  }

  // Function to start the counter animation
  function startCounter() {
    setShouldStartCounter(true);
  }

  useEffect(() => {
    // Add a scroll event listener to trigger the counter when the counter section is in the viewport
    const handleScroll = () => {
      const counterSection = document.querySelector(".counter");
      if (isInViewport(counterSection)) {
        startCounter();
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Header */}

      {/* Hero Section */}
      <section className="hero-area">
        <div className="text-box">
          <h1>Welcome to Green Grocer</h1>
          <p>
            Our mission is to revolutionize the way you experience vegetable
            shopping in India.
            <br />
            We aim to provide real-time vegetable prices from various markets in
            different cities, ensuring you always make informed and
            budget-friendly choices.
            <br /> Learn more about our journey and team on our{" "}
            <a href="about" id="linkto-aboutus">
              About Us
            </a>{" "}
            page.
          </p>
          <a href="shopping" className="hero-btn">
            Click to Start Shopping
          </a>
        </div>
      </section>

      {/* Facilities */}
      <section className="facilities">
        <br />
        <h1>Services</h1>
        <br />
        <div className="facilities-row">
          <div className="facilities-col">
            <img src="images/delivery.png" alt="Home Delivery" />
            <h3>Home Delivery</h3>
            <p>
              Quick, hassle-free home delivery. Fresh vegetables at your
              doorstep.
            </p>
          </div>
          <div className="facilities-col">
            <img src="images/seasonal.png" alt="Seasonal Specials" />
            <h3>Seasonal Specials</h3>
            <p>
              Discover a wide selection of fresh, locally sourced vegetables
              that updates with the seasons.
            </p>
          </div>
          <div className="facilities-col">
            <img src="images/customer.png" alt="24/7 Customer Support" />
            <h3>24*7 Customer Support</h3>
            <p>
              Round-the-clock customer support. Prompt assistance for all your
              inquiries and concerns.
            </p>
          </div>
        </div>
      </section>

      {/* Counter */}
      <Counter shouldStart={shouldStartCounter} />

      {/* Reviews */}
      <section className="reviews">
        <h1>Hear from our Customers</h1>
        <br />
        <br />
        <div className="reviews-row">
          <div className="reviews-col">
            <img src="images/user1.png" alt="Customer 1" />
            <div>
              <p>
                I just wanted to say how impressed I am with Green Grocer! It's
                been a game-changer for my vegetable shopping. The real-time
                prices and market comparisons have saved me money, and I love
                the fresh produce I find through the platform. Thank you for
                making my grocery shopping experience so much better!
              </p>
              <h3>Ajay Bhatt</h3>
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={faStarHalfStroke} />
            </div>
          </div>
          <div className="reviews-col">
            <img src="images/user2.png" alt="Customer 2" />
            <div>
              <p>
                I can't believe I didn't discover Green Grocer earlier! This
                site is fantastic! The user-friendly interface, accurate pricing
                information, and the ability to support local vendors make it
                stand out from other platforms. It's now my go-to place for all
                things veggies. Highly recommended to all vegetable lovers out
                there!
              </p>
              <h3>Shreya Mishra</h3>
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={solidStar} />
              <FontAwesomeIcon icon={regularStar} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <div dangerouslySetInnerHTML={{ __html: footerContent }} /> */}
    </div>
  );
};

export default Home;
