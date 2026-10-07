import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, BookOpen, Search, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Books", path: "/books" },
];

const categoryLinks = [
  "Fiction", "Non-Fiction", "Technology", "Science", "Business", "Romance", "Children's Books"
];

export default function Navbar() {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setCatOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  const handleCategoryNav = (cat) => {
    navigate(`/books?category=${encodeURIComponent(cat)}`);
    setCatOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <BookOpen size={26} />
          <span>PageTurner</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links hide-mobile" aria-label="Primary navigation">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`navbar__link${location.pathname === l.path ? " active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          {/* Categories dropdown */}
          <div
            className="navbar__dropdown"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="navbar__link navbar__link--dropdown" aria-haspopup="true" aria-expanded={catOpen}>
              Categories <ChevronDown size={14} />
            </button>
            {catOpen && (
              <div className="navbar__dropdown-menu" role="menu">
                {categoryLinks.map((c) => (
                  <button key={c} className="navbar__dropdown-item" role="menuitem" onClick={() => handleCategoryNav(c)}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Search */}
        <form className="navbar__search hide-mobile" onSubmit={handleSearch} role="search">
          <Search size={16} className="navbar__search-icon" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books, authors…"
            aria-label="Search books"
          />
          <button type="submit" className="btn btn-primary btn-sm">Search</button>
        </form>

        {/* Cart icon */}
        <Link to="/cart" className="navbar__cart" aria-label={`Shopping cart, ${itemCount} items`}>
          <ShoppingCart size={22} />
          {itemCount > 0 && <span className="navbar__cart-badge">{itemCount}</span>}
        </Link>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger show-mobile"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu show-mobile" role="dialog" aria-label="Mobile navigation">
          <form className="navbar__mobile-search" onSubmit={handleSearch} role="search">
            <Search size={16} aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors…"
              aria-label="Search books"
              autoFocus
            />
          </form>
          {navLinks.map((l) => (
            <Link key={l.path} to={l.path} className="navbar__mobile-link">
              {l.label}
            </Link>
          ))}
          <div className="navbar__mobile-section">
            <p className="navbar__mobile-label">Categories</p>
            {categoryLinks.map((c) => (
              <button key={c} className="navbar__mobile-link navbar__mobile-link--cat" onClick={() => handleCategoryNav(c)}>
                {c}
              </button>
            ))}
          </div>
          <Link to="/cart" className="navbar__mobile-link navbar__mobile-link--cart">
            <ShoppingCart size={18} /> Cart {itemCount > 0 && <span className="navbar__cart-badge">{itemCount}</span>}
          </Link>
        </div>
      )}
    </header>
  );
}
