/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useRef, useState } from "react";
import "../styles/contactus.css";
import "font-awesome/css/font-awesome.min.css";
import emailjs from "emailjs-com";

function ContactUs() {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const isValid =
      form.current.from_name.value &&
      form.current.from_email.value &&
      form.current.subject.value &&
      form.current.message.value;

    if (isValid) {
      emailjs
        .sendForm(
          "service_9uwzyg4",
          "template_384st5l",
          form.current,
          "1DPVzHFgIH83KQgZ6"
        )
        .then(
          (result) => {
            setMessageSent(true);
            setTimeout(() => {
              setMessageSent(false);
            }, 2000);
            console.log("Email sent successfully:", result.text);
          },
          (error) => {
            setMessageSent(true);
            setTimeout(() => {
              setMessageSent(false);
            }, 2000);
            console.log("Error sending email:", error.text);
          }
        );
    } else {
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
      }, 2000);
    }
  };

  return (
    <>
      <h1 className="contactus-heading"> Contact Us </h1>
      <section className="location">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15126.28620995241!2d73.92422475000001!3d18.59334505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c14df5c70e0d%3A0x2d19689e09e2fced!2sPhoenix%20Mall%20Washrooms!5e0!3m2!1sen!2sin!4v1658905192255!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section className="contact-us">
        <div className="row">
          <div className="contact-col">
            <div>
              <i className="fa fa-home"></i>
              <span>
                <h5>Building 101, Green Avenue</h5>
                <p>Dehradun, Uttarakhand - 248001</p>
              </span>
            </div>
            <div>
              <i className="fa fa-phone"></i>
              <span>
                <h5>+91 9876543210</h5>
                <p>24/7 Support</p>
              </span>
            </div>
            <div>
              <i className="fa fa-envelope-o"></i>
              <span>
                <h5>greengrocer2023@gmail.com</h5>
                <p>Email us your query</p>
              </span>
            </div>
          </div>
          <div className="contact-col">
            <form ref={form} onSubmit={sendEmail}>
              <input
                type="text"
                name="from_name"
                placeholder="Enter your name"
                required
              />
              <input
                type="email"
                name="from_email"
                placeholder="Enter email address"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Enter your subject"
                required
              />
              <textarea
                rows="8"
                name="message"
                placeholder="Message"
                required
              ></textarea>
              <button type="submit" className="contactus-btn">
                {messageSent ? "Message Sent" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
