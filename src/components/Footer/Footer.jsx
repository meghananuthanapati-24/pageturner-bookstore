import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";

// SVG social icons since lucide-react v1+ removed branded icons
function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4l16 16M4 20 20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <text x="3" y="19" fontSize="13" fontWeight="bold" fill="currentColor">𝕏</text>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <BookOpen size={24} />
            <span>PageTurner</span>
          </Link>
          <p className="footer__tagline">
            Your favourite destination for books of every kind. Discover new worlds, one page at a time.
          </p>
          <div className="footer__social">
            <a href="#" aria-label="Facebook" className="footer__social-link"><FacebookIcon /></a>
            <a href="#" aria-label="Twitter / X" className="footer__social-link"><TwitterIcon /></a>
            <a href="#" aria-label="Instagram" className="footer__social-link"><InstagramIcon /></a>
            <a href="#" aria-label="YouTube" className="footer__social-link"><YoutubeIcon /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">All Books</Link></li>
            <li><Link to="/books?category=Fiction">Fiction</Link></li>
            <li><Link to="/books?category=Non-Fiction">Non-Fiction</Link></li>
            <li><Link to="/books?category=Technology">Technology</Link></li>
            <li><Link to="/books?category=Science">Science</Link></li>
          </ul>
        </div>

        {/* More Categories */}
        <div className="footer__col">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/books?category=Business">Business</Link></li>
            <li><Link to="/books?category=Romance">Romance</Link></li>
            <li><Link to="/books?category=Children%27s+Books">Children's Books</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h3>Contact Us</h3>
          <ul className="footer__contact">
            <li><MapPin size={15} /><span>123 Book Lane, London, UK</span></li>
            <li><Phone size={15} /><span>+44 20 1234 5678</span></li>
            <li><Mail size={15} /><span>hello@pageturner.com</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} PageTurner Bookstore. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
