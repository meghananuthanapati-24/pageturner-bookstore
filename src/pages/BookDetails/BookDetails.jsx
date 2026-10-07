import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart, BookOpen, Globe, Hash,
  Package, Plus, Minus, Share2, Heart
} from "lucide-react";
import { books, reviews } from "../../data/books";
import { useCart } from "../../context/CartContext";
import BookCard from "../../components/BookCard/BookCard";
import { StarRating } from "../../components/BookCard/BookCard";
import "./BookDetails.css";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedMsg, setAddedMsg] = useState(false);

  const book = books.find((b) => b.id === parseInt(id, 10));

  if (!book) {
    return (
      <div className="empty-state" style={{ marginTop: "4rem" }}>
        <div className="icon">📚</div>
        <h3>Book Not Found</h3>
        <p>The book you're looking for doesn't exist.</p>
        <Link to="/books" className="btn btn-primary">Browse Books</Link>
      </div>
    );
  }

  const bookReviews = reviews.filter((r) => r.bookId === book.id);
  const related = books.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 4);
  const inCart = items.find((i) => i.id === book.id);
  const savings = ((book.originalPrice - book.price) * quantity).toFixed(2);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(book);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2500);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addToCart(book);
    navigate("/cart");
  };

  return (
    <div className="book-details page-enter">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container breadcrumb__inner">
          <Link to="/">Home</Link> <span>/</span>
          <Link to="/books">Books</Link> <span>/</span>
          <Link to={`/books?category=${book.category}`}>{book.category}</Link> <span>/</span>
          <span>{book.title}</span>
        </div>
      </div>

      <div className="container book-details__layout">
        {/* ===== Left: Cover ===== */}
        <div className="book-details__gallery">
          <div className="book-details__cover-wrap">
            {book.discount > 0 && (
              <span className="badge badge-discount book-details__discount-badge">-{book.discount}%</span>
            )}
            <img src={book.cover} alt={`Cover of ${book.title}`} className="book-details__cover" />
          </div>
          <div className="book-details__gallery-actions hide-mobile">
            <button className="btn btn-ghost btn-sm"><Heart size={16} /> Wishlist</button>
            <button className="btn btn-ghost btn-sm"><Share2 size={16} /> Share</button>
          </div>
        </div>

        {/* ===== Right: Info ===== */}
        <div className="book-details__info">
          <span className="book-details__category">{book.category}</span>
          <h1 className="book-details__title">{book.title}</h1>
          <p className="book-details__author">by <strong>{book.author}</strong></p>

          <div className="book-details__rating-row">
            <StarRating rating={book.rating} count={book.reviews} />
            {book.bestseller && <span className="badge badge-bestseller">Bestseller</span>}
          </div>

          {/* Price */}
          <div className="book-details__price-block">
            <span className="book-details__price">${book.price.toFixed(2)}</span>
            {book.originalPrice !== book.price && (
              <>
                <span className="book-details__original">${book.originalPrice.toFixed(2)}</span>
                <span className="badge badge-discount">{book.discount}% off</span>
              </>
            )}
          </div>
          {savings > 0 && (
            <p className="book-details__savings">You save: <strong>${savings}</strong></p>
          )}

          {/* Availability */}
          <div className={`book-details__availability${book.availability === "In Stock" ? " in-stock" : " low-stock"}`}>
            <Package size={15} />
            {book.availability}
          </div>

          {/* Quantity */}
          <div className="book-details__quantity-row">
            <label className="book-details__qty-label" htmlFor="quantity">Quantity</label>
            <div className="qty-control">
              <button
                className="qty-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <input
                id="quantity" type="number" min="1" max="99"
                value={quantity} readOnly
                className="qty-input" aria-label="Quantity"
              />
              <button
                className="qty-btn" onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="book-details__cta">
            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
              <ShoppingCart size={18} />
              {addedMsg ? "✓ Added to Cart!" : inCart ? "Add More" : "Add to Cart"}
            </button>
            <button className="btn btn-accent btn-lg" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {/* Book meta */}
          <div className="book-details__meta">
            {[
              { icon: <BookOpen size={15} />, label: "Publisher", value: book.publisher },
              { icon: <Hash size={15} />, label: "Pages", value: book.pages },
              { icon: <Globe size={15} />, label: "Language", value: book.language },
              { icon: <Package size={15} />, label: "ISBN", value: book.isbn },
            ].map((m) => (
              <div key={m.label} className="book-details__meta-item">
                <span className="book-details__meta-icon">{m.icon}</span>
                <span className="book-details__meta-label">{m.label}:</span>
                <span className="book-details__meta-value">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Tabs: Description / Reviews ===== */}
      <div className="container book-details__tabs-section">
        <div className="book-details__tabs" role="tablist">
          {["description", "reviews"].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`book-details__tab${activeTab === tab ? " active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "description" ? "Description" : `Reviews (${bookReviews.length})`}
            </button>
          ))}
        </div>

        <div className="book-details__tab-content" role="tabpanel">
          {activeTab === "description" && (
            <p className="book-details__description">{book.description}</p>
          )}
          {activeTab === "reviews" && (
            <div className="book-details__reviews">
              {bookReviews.length === 0 ? (
                <p className="book-details__no-reviews">No written reviews yet. Be the first!</p>
              ) : (
                bookReviews.map((r) => (
                  <div key={r.id} className="review-card">
                    <div className="review-card__header">
                      <div className="review-card__avatar">{r.avatar}</div>
                      <div>
                        <p className="review-card__user">{r.user}</p>
                        <p className="review-card__date">{r.date}</p>
                      </div>
                      <StarRating rating={r.rating} />
                    </div>
                    <p className="review-card__comment">{r.comment}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* ===== Related Books ===== */}
      {related.length > 0 && (
        <section className="home-section container" aria-label="Related books">
          <div className="section-heading">
            <h2>You May Also Like</h2>
            <Link to={`/books?category=${book.category}`}>More in {book.category}</Link>
          </div>
          <div className="books-grid">
            {related.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </section>
      )}

      {/* Toast */}
      {addedMsg && (
        <div className="toast" role="alert" aria-live="polite">
          ✓ Added "{book.title}" to cart!
        </div>
      )}
    </div>
  );
}
