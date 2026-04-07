// src/pages/AboutPage/AboutPage.jsx
import { useEffect, useState } from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const storyText = 
    "Every shawl and gift at Atelier is sourced from artisans who have spent generations perfecting their craft. We believe in slow fashion and intentional gifting.";
  
  const words = storyText.split(' ');

  return (
    <div className="about-page">
      <div className="about-hero">
        <p className="about-eyebrow">The Weaver's Promise</p>
        <h1 className="about-title">Every piece tells a story of generations</h1>
      </div>

      <div className="about-content">
        <p>
          {mounted && words.map((word, index) => (
            <span 
              key={index} 
              className="motion-word" 
              style={{ animationDelay: `${0.4 + index * 0.05}s` }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      <div className="about-image-section">
        <img 
          className="about-img" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZu620qbsAJSb-NQgE2SA983BJ3iowlfUZcloYVK669qa3GUMuMH_CJYVcSAKCo2cz3ZxBiOsEQpyCarm7txRklzqp5mKsSuOLjhIbZvOjeehsAwu_mxx1jSGfrWKq6AyoOe5G6qJR6gifL7Wg-rrU7mHotkPwhxlYnDhUygI-6bUagfHfiGJndU1CQxnoOIQzM9JClwbyc8OPvX5haf_M53CeT85_IXP3P0WSNO6J0Ahaz4rdqyET3jPYQh674wxUpXsonyXIRPE" 
          alt="Artisan Craftsmanship" 
        />
      </div>

      <div className="about-values">
        <div className="value-card">
          <h2 className="value-title">Slow Fashion</h2>
          <p>We prioritize quality over quantity, ensuring each piece is made to last a lifetime.</p>
        </div>
        <div className="value-card">
          <h2 className="value-title">Intentional Gifting</h2>
          <p>Our gifts are more than just items; they are heartfelt connections between souls.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
