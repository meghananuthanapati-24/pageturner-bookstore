import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, BookOpen, Truck, Shield, RefreshCw, Tag } from "lucide-react";
import BookCard from "../../components/BookCard/BookCard";
import { books, categories } from "../../data/books";
import "./Home.css";

const CATEGORY_ICONS = {
  Fiction: "📖",
  "Non-Fiction": "📚",
  Technology: "💻",
  Science: "🔬",
  Business: "📈",
  Romance: "💕",
  "Children's Books": "🎨",
};

const featuredBooks = books.filter((b) => b.featured).slice(0, 4);
const bestSellers = books.filter((b) => b.bestseller).slice(0, 4);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <main className="home page-enter">
      {/* ===== Hero ===== */}
      <section className="hero" aria-label="Hero banner">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="hero__tag">📚 New Arrivals Every Week</span>
            <h1 className="hero__title">
              Discover Your Next<br />
              <span className="hero__title--accent">Favourite Book</span>
            </h1>
            <p className="hero__subtitle">
              Explore thousands of titles across every genre. From timeless classics to the latest bestsellers — all at unbeatable prices.
            </p>
            <form className="hero__search" onSubmit={handleSearch} role="search">
              <Search size={18} className="hero__search-icon" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, or genre…"
                aria-label="Search books"
              />
              <button type="submit" className="btn btn-accent btn-lg">Search</button>
            </form>
            <div className="hero__tags">
              <span>Popular:</span>
              {["Fiction", "Technology", "Business", "Science"].map((c) => (
                <Link key={c} to={`/books?category=${c}`} className="hero__tag-link">{c}</Link>
              ))}
            </div>
          </div>
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__books-stack">
              {books.slice(0, 3).map((b, i) => (
                <div key={b.id} className={`hero__stack-book hero__stack-book--${i}`}>
                  <img src={b.cover} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Perks bar ===== */}
      <section className="perks" aria-label="Store benefits">
        <div className="container perks__grid">
          {[
            { icon: <Truck size={22} />, label: "Free Shipping", sub: "On orders over $35" },
            { icon: <Shield size={22} />, label: "Secure Payment", sub: "100% protected" },
            { icon: <RefreshCw size={22} />, label: "Easy Returns", sub: "30-day policy" },
            { icon: <Tag size={22} />, label: "Best Prices", sub: "Price match guarantee" },
          ].map((p) => (
            <div key={p.label} className="perks__item">
              <span className="perks__icon">{p.icon}</span>
              <div>
                <p className="perks__label">{p.label}</p>
                <p className="perks__sub">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Categories ===== */}
      <section className="home-section" aria-label="Book categories">
        <div className="container">
          <div className="section-heading">
            <h2>Browse Categories</h2>
            <Link to="/books">View All <ArrowRight size={15} /></Link>
          </div>
          <div className="categories-grid">
            {categories.filter((c) => c !== "All").map((cat) => (
              <Link key={cat} to={`/books?category=${encodeURIComponent(cat)}`} className="category-card">
                <span className="category-card__icon">{CATEGORY_ICONS[cat]}</span>
                <span className="category-card__name">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Books ===== */}
      <section className="home-section home-section--alt" aria-label="Featured books">
        <div className="container">
          <div className="section-heading">
            <h2>⭐ Featured Books</h2>
            <Link to="/books">See All <ArrowRight size={15} /></Link>
          </div>
          <div className="books-grid">
            {featuredBooks.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </div>
      </section>

      {/* ===== Promo Banner ===== */}
      <section className="promo-banner" aria-label="Promotional offer">
        <div className="container promo-banner__inner">
          <div className="promo-banner__content">
            <span className="promo-banner__tag">Limited Time Offer</span>
            <h2>Up to <strong>40% Off</strong> on Selected Titles</h2>
            <p>Stock up on your reading list this season. Discounts on hundreds of bestsellers, classics, and new releases.</p>
            <Link to="/books" className="btn btn-accent btn-lg">
              Shop the Sale <ArrowRight size={18} />
            </Link>
          </div>
          <div className="promo-banner__visual" aria-hidden="true">
            <div className="promo-banner__books">
              {books.slice(4, 7).map((b, i) => (
                <div key={b.id} className={`promo-book promo-book--${i}`}>
                  <img src={b.cover} alt="" />
                  {b.discount > 0 && <span className="badge badge-discount">-{b.discount}%</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bestsellers ===== */}
      <section className="home-section" aria-label="Bestselling books">
        <div className="container">
          <div className="section-heading">
            <h2>🔥 Bestsellers</h2>
            <Link to="/books">See All <ArrowRight size={15} /></Link>
          </div>
          <div className="books-grid">
            {bestSellers.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </div>
      </section>

      {/* ===== Newsletter ===== */}
      <section className="newsletter" aria-label="Newsletter signup">
        <div className="container newsletter__inner">
          <BookOpen size={40} className="newsletter__icon" aria-hidden="true" />
          <h2>Get Reading Recommendations</h2>
          <p>Subscribe and we'll send you personalised book picks, exclusive deals, and early access to new releases.</p>
          <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" aria-label="Email address" required />
            <button type="submit" className="btn btn-accent">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}
