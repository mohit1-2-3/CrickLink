import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form className="contact-form">
        <label For="name"></label>
        <input type="text" id="name" placeholder="Enter your name" required />

        <label For="email"></label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label For="message"></label>
        <textarea id="message" placeholder="Your message..." rows="5" required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
