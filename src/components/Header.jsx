import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source
          src="/videos/space2.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="header-content">
        <img
          src="/logo.png"
          alt="logo"
          className="logo"
        />
        <h1>
          Explore Our Solar <br />
          System Through Data
        </h1>
        <p>
          Understand the planets not just by name,
          but by measurable facts. From size and mass
          to gravity and density, this page breaks
          down the solar system in a clear, data-driven way.
        </p>
        <div className="buttons">
            <button
              className="primary-btn"
              onClick={() =>
                document.getElementById('planets')
                .scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore the Data
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                document.getElementById('contact')
                .scrollIntoView({ behavior: 'smooth' })
              }
            >
              Contact Us
            </button>
          </div>
      </div>
    </header>
  );
};

export default Header;