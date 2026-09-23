import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <div className="hero">
        <p className="tag">WELCOME TO MY WEBSITE</p>

        <h1>
          Build. Create. <span>Inspire.</span>
        </h1>

        <p className="description">
          A modern React application built with reusable components,
          clean design and simple navigation.
        </p>

        <div className="buttons">
          <Link to="/about" className="btn primary">
            Explore More →
          </Link>

          <Link to="/contact" className="btn secondary">
            Contact Me
          </Link>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <div className="icon">⚡</div>
          <h2>Fast</h2>
          <p>
            Built with React for a fast and smooth user experience.
          </p>
        </div>

        <div className="card">
          <div className="icon">🎨</div>
          <h2>Modern</h2>
          <p>
            Clean and professional interface with a modern design.
          </p>
        </div>

        <div className="card">
          <div className="icon">🚀</div>
          <h2>Scalable</h2>
          <p>
            Simple structure that can easily grow into a bigger project.
          </p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <div className="about">
        <p className="tag">ABOUT ME</p>

        <h1>
          Turning Ideas Into <span>Reality.</span>
        </h1>

        <p className="description">
          I create modern and user-friendly web applications using
          React and modern web technologies. My focus is on clean
          design, performance and great user experience.
        </p>

        <div className="stats">
          <div>
            <h2>10+</h2>
            <p>Projects</p>
          </div>

          <div>
            <h2>5+</h2>
            <p>Technologies</p>
          </div>

          <div>
            <h2>100%</h2>
            <p>Passion</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <div className="contact">
        <p className="tag">GET IN TOUCH</p>

        <h1>
          Let's Work <span>Together.</span>
        </h1>

        <p className="description">
          Have an idea or project in mind? Feel free to get in touch.
        </p>

        <div className="contact-box">
          <p>📧 hello@example.com</p>
          <p>📱 +91 98765 43210</p>
          <p>📍 Tamil Nadu, India</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
          background: #08080c;
          color: white;
        }

        a {
          text-decoration: none;
        }

        .app {
          min-height: 100vh;
        }

        /* NAVBAR */

        .navbar {
          height: 80px;
          padding: 0 8%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(8, 8, 12, 0.95);
          border-bottom: 1px solid #24242c;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .logo {
          font-size: 25px;
          font-weight: bold;
          color: white;
        }

        .logo span {
          color: #a855f7;
        }

        .nav-links {
          display: flex;
          gap: 35px;
        }

        .nav-links a {
          color: #aaa;
          font-size: 16px;
          transition: 0.3s;
        }

        .nav-links a:hover {
          color: #a855f7;
        }

        .nav-btn {
          padding: 11px 20px;
          border: 1px solid #a855f7;
          border-radius: 8px;
          color: #c084fc;
          transition: 0.3s;
        }

        .nav-btn:hover {
          background: #a855f7;
          color: white;
        }

        /* PAGE */

        .page {
          min-height: calc(100vh - 140px);
          padding: 80px 8%;
        }

        .hero,
        .about,
        .contact {
          max-width: 1000px;
          margin: auto;
          text-align: center;
        }

        .tag {
          color: #a855f7;
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 4px;
          margin-bottom: 22px;
        }

        h1 {
          font-size: clamp(48px, 7vw, 82px);
          line-height: 1.05;
          margin-bottom: 28px;
        }

        h1 span {
          color: #a855f7;
        }

        .description {
          max-width: 700px;
          margin: auto;
          color: #999;
          font-size: 18px;
          line-height: 1.8;
        }

        /* BUTTONS */

        .buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 35px;
        }

        .btn {
          padding: 14px 25px;
          border-radius: 8px;
          font-weight: bold;
          transition: 0.3s;
        }

        .primary {
          background: #a855f7;
          color: white;
        }

        .primary:hover {
          background: #9333ea;
          transform: translateY(-2px);
        }

        .secondary {
          border: 1px solid #333;
          color: #ddd;
        }

        .secondary:hover {
          border-color: #a855f7;
          color: #c084fc;
        }

        /* CARDS */

        .cards {
          max-width: 1100px;
          margin: 90px auto 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .card {
          padding: 35px 25px;
          background: #111116;
          border: 1px solid #24242c;
          border-radius: 16px;
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-7px);
          border-color: #a855f7;
          box-shadow: 0 10px 35px rgba(168, 85, 247, 0.12);
        }

        .icon {
          font-size: 35px;
          margin-bottom: 15px;
        }

        .card h2 {
          margin-bottom: 12px;
        }

        .card p {
          color: #888;
          line-height: 1.6;
        }

        /* ABOUT */

        .stats {
          display: flex;
          justify-content: center;
          gap: 90px;
          margin-top: 55px;
        }

        .stats h2 {
          color: #a855f7;
          font-size: 38px;
        }

        .stats p {
          color: #888;
          margin-top: 5px;
        }

        /* CONTACT */

        .contact-box {
          max-width: 500px;
          margin: 40px auto;
          padding: 25px;
          background: #111116;
          border: 1px solid #24242c;
          border-radius: 14px;
          color: #bbb;
          line-height: 2.5;
        }

        /* FOOTER */

        footer {
          height: 60px;
          border-top: 1px solid #24242c;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
          font-size: 14px;
        }

        footer strong {
          color: #a855f7;
        }

        /* MOBILE */

        @media (max-width: 700px) {
          .navbar {
            padding: 0 5%;
          }

          .nav-links {
            gap: 15px;
          }

          .nav-btn {
            display: none;
          }

          .page {
            padding: 60px 5%;
          }

          .cards {
            grid-template-columns: 1fr;
          }

          .stats {
            gap: 35px;
          }

          .buttons {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="app">

        {/* NAVIGATION BAR */}
        <nav className="navbar">
          <Link to="/" className="logo">
            My<span>Portfolio.</span>
          </Link>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <Link to="/contact" className="nav-btn">
            Let's Talk
          </Link>
        </nav>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* FOOTER */}
        <footer>
          © 2026&nbsp; <strong>MyPortfolio</strong>.&nbsp; All rights reserved.
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;