import { useNavigate } from "react-router-dom";
import React from "react";
import NavBar from "../../components/NavBar";
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div id="_80_95__Contact" className="contact">
      <NavBar />
         <img
        src="assets/images/ellipse_10.svg"
        alt="Ellipse"
        className="contact__decor-ellipse"
        aria-hidden="true"
      />

     <div id="_80_101__Frame_9" className="contact-frame-9">
  <span id="_80_102__CONTACTS" className="contact-contacts">
    <span className="contact-contacts-text">CONTACT US</span>
  </span>
</div>


      <section className="contact__main">
        <h1 className="contact__title">
          <span className="contact__title-black">ELDERLY</span>
          <span className="contact__title-highlight">CARE.AI</span>
        </h1>
        <h2 className="contact__subtitle">Caring Through Smart Technology</h2>

        <div className="contact__details">
          <h3>Contact Details:</h3>
          <ul>
            <li>
              Alcantara, John Claude L. —{" "}
              <a href="mailto:0322-3585@lspu.edu.ph">0322-3585@lspu.edu.ph</a>
            </li>
            <li>
              Mamalateo, Maria Fatima M. —{" "}
              <a href="mailto:0322-3507@lspu.edu.ph">0322-3507@lspu.edu.ph</a>
            </li>
          </ul>
        </div>

        <div className="contact__legal">
          <h4>Legal:</h4>
          <ul>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms &amp; Conditions</a>
            </li>
          </ul>
        </div>
      </section>
      <div className="contact__footer" />
    </div>
  );
};

export default Contact;