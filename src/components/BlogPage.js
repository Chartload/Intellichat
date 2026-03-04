import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './BlogPage.css';

// Animated Counter Component
const AnimatedCounter = ({ value, label, description, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = parseInt(value.toString().replace(/[^0-9.-]/g, ''));
    const suffix = value.toString().replace(/[0-9.-]/g, '');
    
    if (start === end) return;

    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end + suffix);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start) + suffix);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return (
    <div className="stat-dashboard-card" ref={counterRef}>
      <div className="stat-dashboard-value">{count}</div>
      <div className="stat-dashboard-label">{label}</div>
      <div className="stat-dashboard-desc">{description}</div>
    </div>
  );
};

// Auto-scrolling Reviews Component
const ScrollingReviews = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div className="scrolling-reviews-container">
      <div className="scrolling-reviews-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {reviews.map((review, index) => (
          <div className="scrolling-review-card" key={index}>
            <div className="review-rating">★★★★★</div>
            <p className="review-text">"{review.text}"</p>
            <div className="review-highlight">{review.highlight}</div>
            <div className="reviewer">
              <strong>{review.name}</strong>
              <span>{review.role}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="scrolling-dots">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Parallax Feature Card
const ParallaxFeature = ({ feature, index }) => {
  const [offset, setOffset] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const elementPosition = rect.top + scrollPosition;
      const offset = (scrollPosition - elementPosition) * 0.1;
      setOffset(offset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="feature-card-enhanced" 
      ref={cardRef}
      style={{ transform: `translateY(${offset}px)` }}
    >
      <div className="feature-icon">{feature.icon}</div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  );
};

const BlogPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
      easing: 'ease-in-out'
    });
  }, []);

  const affiliateLink = "https://chartlordai.com/?ref=mrxw4yhbhrco";

  const reviews = [
    {
      name: "David Mwangi",
      role: "Nairobi, Kenya",
      text: "I started with a small account 3 months ago. The automated system handles everything while I focus on my main business. My portfolio has grown 40% without me lifting a finger.",
      highlight: "40% growth in 3 months"
    },
    {
      name: "Sarah Wanjiku",
      role: "Mombasa, Kenya",
      text: "After years of trying to trade manually with little success, ChartLord AI changed everything. The Smart Money Concepts approach actually makes sense. I'm finally seeing consistent results.",
      highlight: "Consistent results finally"
    },
    {
      name: "James Omondi",
      role: "Kisumu, Kenya",
      text: "The 24/7 market scanning means I never miss opportunities. Even when I'm sleeping or working, the system is finding and executing trades. It's like having a professional trader working for me around the clock.",
      highlight: "24/7 automated trading"
    },
    {
      name: "Lucy Njeri",
      role: "Nakuru, Kenya",
      text: "What impressed me most is the risk management. The dynamic trailing engine protects profits while letting winners run. After 6 months of use, I've upgraded to the full package.",
      highlight: "Upgraded after 6 months"
    },
    {
      name: "Michael Otieno",
      role: "Eldoret, Kenya",
      text: "I was skeptical at first, but the transparency and real-time execution won me over. My trading has never been this stress-free. The system just works.",
      highlight: "Complete peace of mind"
    },
    {
      name: "Grace Akinyi",
      role: "Kisii, Kenya",
      text: "The multi-layer confluence gives me confidence in every trade. No more second-guessing. ChartLord AI has transformed how I approach the markets.",
      highlight: "Confidence in every trade"
    }
  ];

  const features = [
    {
      title: "Smart Money Concepts",
      description: "Built on deep-structure modeling of institutional trading patterns , not retail indicators.",
      icon: "🏦"
    },
    {
      title: "Real-Time OnTick Execution",
      description: "Operates on OnTick logic, not time intervals. Continuously evaluates incoming market data as it arrives.",
      icon: "⚡"
    },
    {
      title: "Multi-Layer Confluence",
      description: "Requires 8–10 confluence factors before entering any position, including liquidity voids and order blocks.",
      icon: "🎯"
    },
    {
      title: "Dynamic Trailing Engine",
      description: "Proprietary technology that dynamically adjusts exit levels based on predefined risk management rules.",
      icon: "🛡️"
    },
    {
      title: "24/7 Market Scanning",
      description: "Never miss an opportunity. The system scans global markets around the clock, every day of the year.",
      icon: "🌐"
    },
    {
      title: "Risk-First Architecture",
      description: "Built with capital preservation as the primary objective. Every trade includes multiple layers of risk checks.",
      icon: "🔒"
    }
  ];

  const stats = [
    { value: "10+", label: "Confluence Layers", description: "Every trade verified" },
    { value: "24/7", label: "Market Scanning", description: "Never sleeps" },
    { value: "365", label: "Days Active", description: "Year-round trading" },
    { value: "94%", label: "Efficiency Score", description: "Strategy rating" },
    { value: "78%", label: "Win Rate", description: "Historical sample" },
    { value: "8.7%", label: "Monthly Return", description: "Sample average" }
  ];

  return (
    <>
      <Helmet>
        <title>ChartLord AI Review | Institutional-Grade Automated Trading</title>
        <meta name="description" content="ChartLord AI delivers institutional-grade automated trading using Smart Money Concepts. Read verified reviews from Kenyan traders and see real results." />
        <meta name="keywords" content="ChartLord AI, automated trading, forex robot, trading software, smart money concepts, algorithmic trading" />
        <meta property="og:title" content="ChartLord AI - Institutional-Grade Automated Trading" />
        <meta property="og:description" content="Let AI handle your trading with institutional-grade algorithms. Join 1000+ Kenyan traders." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://chartlordai.com/?ref=mrxw4yhbhrco"/>
      </Helmet>

      <div className="blog-wrapper">
        {/* Hero Section - Full Screen Impact with Parallax */}
        <section className="hero-section">
          <div className="hero-pattern"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          <div className="container">
            <div className="hero-content" data-aos="fade-up" data-aos-duration="1200">
              <div className="hero-badge" data-aos="fade-down" data-aos-delay="200">INSTITUTIONAL-GRADE AUTOMATION</div>
              <h1 className="hero-title" data-aos="fade-up" data-aos-delay="400">
                Why Hustle?<br />
                <span className="gradient-text">Let ChartLord AI Grow Your Money</span>
              </h1>
              <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="600">
                Algorithmic trading software designed for systematic trade execution based on predefined Smart Money Concept conditions ,removing emotion from every decision.
              </p>
              
              <div className="hero-stats-grid" data-aos="fade-up" data-aos-delay="800">
                <div className="hero-stat-card">
                  <div className="hero-stat-value">10+</div>
                  <div className="hero-stat-label">Confluence Layers</div>
                </div>
                <div className="hero-stat-card">
                  <div className="hero-stat-value">24/7</div>
                  <div className="hero-stat-label">Market Scanning</div>
                </div>
                <div className="hero-stat-card">
                  <div className="hero-stat-value">365</div>
                  <div className="hero-stat-label">Days Active</div>
                </div>
              </div>

              <div className="hero-cta" data-aos="fade-up" data-aos-delay="1000">
                <a href={affiliateLink} className="btn-primary pulse" target="_blank" rel="noopener noreferrer">
                  Get ChartLord AI Now
                </a>
                <a href="#reviews" className="btn-outline">
                  See Trader Reviews
                </a>
              </div>

              <div className="hero-trust-badges" data-aos="fade-up" data-aos-delay="1200">
                <span>✓ 1000+ Kenyan Traders</span>
                <span>✓ 24/7 Support</span>
                <span>✓ Instant Activation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Stats Bar */}
        <div className="floating-stats-bar">
          <div className="container">
            <div className="floating-stats-content">
              <div className="floating-stat">
                <span className="floating-stat-value">10,000+</span>
                <span className="floating-stat-label">Global Users</span>
              </div>
              <div className="floating-stat">
                <span className="floating-stat-value">4.9/5</span>
                <span className="floating-stat-label">User Rating</span>
              </div>
              <div className="floating-stat">
                <span className="floating-stat-value">2023</span>
                <span className="floating-stat-label">Founded</span>
              </div>
              <div className="floating-stat">
                <span className="floating-stat-value">24/7</span>
                <span className="floating-stat-label">Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* What is ChartLord AI */}
        <section className="about-section" data-aos="fade-up">
          <div className="container">
            <div className="about-grid">
              <div className="about-content" data-aos="fade-right">
                <h2 className="section-title">What is <span className="gradient-text">ChartLord AI?</span></h2>
                <p className="about-text">
                  ChartLord AI is a cutting-edge trading platform that uses advanced AI and machine learning to analyze market data and identify opportunities for automated trading.
                </p>
                <div className="about-features">
                  <div className="about-feature" data-aos="fade-up" data-aos-delay="200">
                    <span className="about-feature-icon">✓</span>
                    <span>Institutional-grade algorithms</span>
                  </div>
                  <div className="about-feature" data-aos="fade-up" data-aos-delay="400">
                    <span className="about-feature-icon">✓</span>
                    <span>Smart Money Concept core</span>
                  </div>
                  <div className="about-feature" data-aos="fade-up" data-aos-delay="600">
                    <span className="about-feature-icon">✓</span>
                    <span>24/7 fully automated</span>
                  </div>
                </div>
              </div>
              <div className="about-stats" data-aos="fade-left">
                <a href={affiliateLink} className="about-stat-card" data-aos="zoom-in" data-aos-delay="200" target="_blank" rel="noopener noreferrer">
                  <div className="about-stat-value">10,000+</div>
                  <div className="about-stat-label">Global Users</div>
                </a>
                <a href={affiliateLink} className="about-stat-card" data-aos="zoom-in" data-aos-delay="400" target="_blank" rel="noopener noreferrer">
                  <div className="about-stat-value">4.9/5</div>
                  <div className="about-stat-label">User Rating</div>
                </a>
                <a href={affiliateLink} className="about-stat-card" data-aos="zoom-in" data-aos-delay="600" target="_blank" rel="noopener noreferrer">
                  <div className="about-stat-value">2023</div>
                  <div className="about-stat-label">Founded</div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Steps Section */}
        <section className="steps-section">
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">Up and Trading <span className="gradient-text">in 3 Simple Steps</span></h2>
            <div className="steps-animated">
              <a href={affiliateLink} className="step-animated" data-aos="flip-left" data-aos-delay="200" target="_blank" rel="noopener noreferrer">
                <div className="step-icon">01</div>
                <h3>Sign Up & Subscribe</h3>
                <p>Click to get access to Chartload AI and purchase their software.</p>
                <div className="step-time">Click to get started →</div>
              </a>
              <div className="step-connector-animated" data-aos="fade-in" data-aos-delay="400">→</div>
              <a href={affiliateLink} className="step-animated" data-aos="flip-left" data-aos-delay="600" target="_blank" rel="noopener noreferrer">
                <div className="step-icon">02</div>
                <h3>Activate Software</h3>
                <p>Install ChartLord AI, connect your broker, and activate your licence key in minutes.</p>
                <div className="step-time">Click to activate →</div>
              </a>
              <div className="step-connector-animated" data-aos="fade-in" data-aos-delay="800">→</div>
              <a href={affiliateLink} className="step-animated" data-aos="flip-left" data-aos-delay="1000" target="_blank" rel="noopener noreferrer">
                <div className="step-icon">03</div>
                <h3>AI-Assisted Trading</h3>
                <p>ChartLord AI continuously scans markets, identifies confluences, and executes trades 24/7 automatically.</p>
                <div className="step-time">Start trading now →</div>
              </a>
            </div>
          </div>
        </section>

        {/* Features Grid with Parallax */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">Institutional-Grade <span className="gradient-text">Technology</span></h2>
            <div className="features-grid-parallax">
              {features.map((feature, index) => (
                <a href={affiliateLink} className="feature-card-enhanced-link" key={index} target="_blank" rel="noopener noreferrer">
                  <ParallaxFeature feature={feature} index={index} />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Dashboard with Animated Counters */}
        <section className="stats-dashboard">
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">Performance <span className="gradient-text">Metrics</span></h2>
            <div className="stats-dashboard-grid">
              {stats.map((stat, index) => (
                <a href={affiliateLink} key={index} target="_blank" rel="noopener noreferrer">
                  <AnimatedCounter {...stat} />
                </a>
              ))}
            </div>
            <p className="stats-disclaimer" data-aos="fade-up">Metrics from historical simulations. Past performance ≠ future results.</p>
          </div>
        </section>

        {/* Auto-scrolling Reviews */}
        <section id="reviews" className="reviews-section-enhanced">
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">What Kenyan <span className="gradient-text">Traders Say</span></h2>
            <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
              <ScrollingReviews reviews={reviews} />
            </a>
            <p className="reviews-disclaimer" data-aos="fade-up">Testimonials reflect individual user opinions and do not represent typical outcomes.</p>
          </div>
        </section>

        {/* Technology Stack with Reveal Effects */}
        <section className="tech-section-enhanced">
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">Core <span className="gradient-text">Technology Stack</span></h2>
            <div className="tech-showcase">
              <a href={affiliateLink} className="tech-main" data-aos="zoom-in" target="_blank" rel="noopener noreferrer">
                <div className="tech-main-card">
                  <h3>Smart Money Concepts Core</h3>
                  <p>Built on deep-structure modeling of institutional trading patterns , not retail indicators or basic TA.</p>
                </div>
              </a>
              <div className="tech-grid-enhanced">
                <a href={affiliateLink} className="tech-card" data-aos="fade-right" data-aos-delay="200" target="_blank" rel="noopener noreferrer">
                  <h4>Real-time OnTick Execution</h4>
                  <p>Operates on OnTick logic, evaluating incoming market data as it arrives.</p>
                </a>
                <a href={affiliateLink} className="tech-card" data-aos="fade-up" data-aos-delay="400" target="_blank" rel="noopener noreferrer">
                  <h4>Multi-Layer Confluence</h4>
                  <p>Requires 8–10 confluence factors including liquidity voids and order blocks.</p>
                </a>
                <a href={affiliateLink} className="tech-card" data-aos="fade-left" data-aos-delay="600" target="_blank" rel="noopener noreferrer">
                  <h4>Dynamic Trailing Engine™</h4>
                  <p>Proprietary technology that dynamically adjusts exit levels.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Timeline with Slide Effects */}
        <section className="vision-timeline">
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">Built for Retail.<br />Scaling to <span className="gradient-text">Institutional.</span></h2>
            <div className="timeline-slider">
              <div className="timeline-track">
                <a href={affiliateLink} className="timeline-card" data-aos="slide-right" target="_blank" rel="noopener noreferrer">
                  <div className="timeline-phase">Phase 1 · Now</div>
                  <h3>Empower the Retail Base</h3>
                  <p>Give early access to market analysis signals and semi-automated trading powered by ChartLord AI.</p>
                </a>
                <a href={affiliateLink} className="timeline-card" data-aos="slide-up" target="_blank" rel="noopener noreferrer">
                  <div className="timeline-phase">Phase 2 · Near Future</div>
                  <h3>Institutional Partnership</h3>
                  <p>Onboard corporates, SACCOs, investment groups, and private funds as enterprise trading technology.</p>
                </a>
                <a href={affiliateLink} className="timeline-card" data-aos="slide-left" target="_blank" rel="noopener noreferrer">
                  <div className="timeline-phase">Phase 3 · Long Term</div>
                  <h3>Advanced R&D</h3>
                  <p>Launch research and development of advanced algorithmic trading technologies.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Floating CTA */}
        <section className="cta-floating">
          <div className="container">
            <div className="cta-floating-card" data-aos="flip-up">
              <h2>Ready to Trade Smarter?</h2>
              <p>Join 1000+ Kenyan traders already using ChartLord AI to enhance their strategy with institutional-grade automation.</p>
              <div className="cta-benefits">
                <span>✓ Instant Access</span>
                <span>✓ 24/7 Support</span>
                <span>✓ 60-Day Guarantee</span>
              </div>
              <a href={affiliateLink} className="btn-primary btn-large pulse" target="_blank" rel="noopener noreferrer">
                Get ChartLord AI Now
              </a>
              <p className="cta-note">No credit card required to start</p>
            </div>
          </div>
        </section>

        {/* Modern Footer */}
        <footer className="footer-modern">
          <div className="container">
            <div className="footer-wave">
              <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                <path d="M0,0V15.81C13,21.25,27.93,25.45,44.5,28.76c69.24,17.87,140.68,11.34,209.86-6.33C322.31,6.74,388.57-8.76,454.77,6.45c63.46,14.55,121.85,39.55,185.67,48.82,73.69,10.7,147.62,4.51,217.9-14.94,33.88-9.36,66.08-22.45,99.44-35.66C996.34,5.09,1105.62,18.32,1200,31.63V0Z" opacity=".5"></path>
                <path d="M0,0V5.63C51.42,13.71,107,19.53,164.1,19.53c65.45,0,127.41-11.33,191.46-23.62,44.48-8.58,88.59-18.53,133.83-23.36C540.44-4.67,610.12,2.28,678,11.89c60.75,8.58,120.21,19.92,181.51,19.92,50.62,0,100.36-7.33,149-17.49C1036.41,8.55,1118.56,1.8,1200,0Z"></path>
              </svg>
            </div>
            <div className="footer-content-modern">
              <div className="footer-grid-modern">
                <div className="footer-info-modern">
                  <h4>ChartLord AI</h4>
                  <p>Institutional-grade automated trading for everyone.</p>
                  <div className="footer-social">
                    <a href={affiliateLink} className="social-link" target="_blank" rel="noopener noreferrer">𝕏</a>
                    <a href={affiliateLink} className="social-link" target="_blank" rel="noopener noreferrer">📘</a>
                    <a href={affiliateLink} className="social-link" target="_blank" rel="noopener noreferrer">📺</a>
                  </div>
                </div>
                <div className="footer-links-modern">
                  <div className="footer-links-column">
                    <h5>Product</h5>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">Features</a>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">Reviews</a>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">Pricing</a>
                  </div>
                  <div className="footer-links-column">
                    <h5>Company</h5>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">About</a>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">Blog</a>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">Careers</a>
                  </div>
                  <div className="footer-links-column">
                    <h5>Support</h5>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">Help Center</a>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">Contact</a>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">FAQ</a>
                  </div>
                </div>
              </div>
              <div className="footer-bottom-modern">
                <p className="disclaimer-modern">
                  Disclaimer: Trading involves substantial risk. Past performance does not guarantee future results. 
                  This information is for educational purposes only and does not constitute financial advice.
                </p>
                <div className="footer-legal">
                  <span>© 2026 ChartLord AI. All rights reserved.</span>
                  <div className="footer-legal-links">
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">Terms of Service</a>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer">Cookie Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BlogPage;