import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img
              src="/images/logo/logo_4.png"
              alt="SSI Educational Services"
              className="footer-logo-img"
            />
          </div>
          <p>
            Empowering learners worldwide with quality education and innovative
            learning experiences.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Learn</h4>
          <ul>
            <li>
              <Link to="/programs">All Programs</Link>
            </li>
            {/* <li>
              <a href="#">Free Programs</a>
            </li>
            <li>
              <Link to="/certificates">Certificates</Link>
            </li>
            <li>
              <Link to="/paths">Learning Paths</Link>
            </li> */}
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <Link to="/faq">faq</Link>
            </li>
            <li>
              <Link to="/help">Help Center</Link>
            </li>
            {/* <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
            <li>
              <Link to="/resources">Student Resources</Link>
            </li> */}
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            {/* <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li> */}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} SSI Educational Services. All rights reserved.</p>
        <p>
          Made with <i className="fas fa-heart" style={{ color: '#e74c3c' }}></i>{' '}
          for learners everywhere
        </p>
      </div>
    </footer>
  );
}
