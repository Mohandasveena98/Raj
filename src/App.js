import React, { useState, useEffect } from "react";
import CustomCursor from "./CustomCursor";
import "./App.css";

import logo from "./img/logo.jpeg";
import loadingVideo from "./img/logo.mp4"; // import the video file

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [loading, setLoading] = useState(true);

  const sliderImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };
  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 5000);

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Adjust time as per video length (5000ms = 5s)

    return () => clearTimeout(timer, autoSlide);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="App">
      <CustomCursor />
      {loading ? (
        <div className="loader-screen">
          <video autoPlay muted playsInline className="loader-video">
            <source src={loadingVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div>
          <header className="navbar">
            <div className="logo">
              <img src={logo} alt="Citrus Ink Logo" />
            </div>

            {/* Hamburger icon */}
            <div className="menu-toggle" onClick={toggleMenu}>
              ☰
            </div>

            {/* Navigation */}
            <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
              <a href="#home" onClick={() => setMenuOpen(false)}>
                Home
              </a>
              <a href="#work" onClick={() => setMenuOpen(false)}>
                Work
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </nav>
          </header>

          {/* HERO Section with Slider */}
          <section
            id="home"
            className="hero"
            style={{
              backgroundImage: `url(${sliderImages[currentSlide]})`,
            }}
          >
            <div className="slider-controls">
              <button onClick={prevSlide} className="slider-arrow left">
                &#8592;
              </button>
              <div className="hero-content">
                <h1>Crafting Beautiful Brands</h1>
                <p>We build powerful brands with creativity and strategy.</p>
                <button>See Our Work</button>
              </div>
              <button onClick={nextSlide} className="slider-arrow right">
                &#8594;
              </button>
            </div>
          </section>

          <section id="work" className="work">
            <h2>Our Work</h2>
            <div className="work-grid">
              <div className="work-item">Project 1</div>
              <div className="work-item">Project 2</div>
              <div className="work-item">Project 3</div>
              <div className="work-item">Project 4</div>
            </div>
          </section>

          <section id="about" className="about">
            <h2>About Us</h2>
            <p>
              We are a creative agency focused on branding, design, and
              strategy.
            </p>
          </section>

          <section id="contact" className="contact">
            <h2>Contact Us</h2>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </section>

          <footer className="footer">
            © 2025 Citrus Ink Studios. All rights reserved.
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
