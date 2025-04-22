<template>
    <div class="community-homepage">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>Welcome to MyCommunityApp</h1>
          <p>Make a difference in your community today. "Enrich your life as well as those around you."</p>
          <button class="cta-button">Find Your Community</button>
        </div>
      </section>
  
      <!-- About Section -->
      <section class="about-section">
        <div class="container">
          <div class="about-content">
            <div class="about-text">
              <h2 class="section-title">Our Story</h2>
              <p></p> <!-- Left empty as requested -->
            </div>
            <div class="about-image">
              <img src="" alt="">
            </div>
          </div>
        </div>
      </section>
  
      <!-- Testimonials Section -->
      <section class="testimonials-section">
        <div class="container">
          <h2 class="section-title">What Our Users Say</h2>
          <div class="testimonials">
            <div class="testimonial">
              <div class="stars">★★★★★</div>
              <p class="quote"></p> <!-- Left empty as requested -->
              <p class="author">- Maria S.</p>
            </div>
            <div class="testimonial">
              <div class="stars">★★★★★</div>
              <p class="quote"></p> <!-- Left empty as requested -->
              <p class="author">- James T.</p>
            </div>
            <div class="testimonial">
              <div class="stars">★★★★★</div>
              <p class="quote"></p> <!-- Left empty as requested -->
              <p class="author">- Ana L.</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Newsletter Section -->
      <section class="newsletter-section">
        <div class="container">
          <div class="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest news and upcoming events.</p>
            <form class="newsletter-form">
              <input type="email" placeholder="Your email address" required>
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
    </script>
  
  <style scoped>
  /* Base Styles */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }
  
  /* Hero Section */
  .hero {
    height: 80vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url();
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    margin-top: 50px;
  }
  
  .hero-content {
    max-width: 800px;
    padding: 0 20px;
  }
  
  .hero h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .hero p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .cta-button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 12px 30px;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .cta-button:hover {
    background-color: #c0392b;
  }
  
  /* About Section */
  .about-section {
    padding: 5rem 0;
  }
  
  .about-content {
    display: flex;
    align-items: center;
    gap: 50px;
    flex-wrap: wrap;
  }
  
  .about-text, .about-image {
    flex: 1;
    min-width: 300px;
  }
  
  .about-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  /* Testimonials Section */
  .testimonials-section {
    padding: 5rem 0;
    background-color: #f5f5f5;
  }
  
  .testimonials {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
  }
  
  .testimonial {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    flex: 1;
    min-width: 300px;
    max-width: 400px;
  }
  
  .stars {
    color: #f1c40f;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .author {
    font-weight: bold;
    text-align: right;
  }
  
  /* Newsletter Section */
  .newsletter-section {
    padding: 5rem 0;
    background-color: #333;
    color: white;
  }
  
  .newsletter-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .newsletter-form {
    display: flex;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .newsletter-form input {
    flex: 1;
    padding: 12px 15px;
    border: none;
    border-radius: 4px 0 0 4px;
  }
  
  .newsletter-form button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 0 20px;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .newsletter-form button:hover {
    background-color: #c0392b;
  }
  </style>