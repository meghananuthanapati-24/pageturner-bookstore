import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./BookCard.css";

export function StarRating({ rating, count }) {
  return (
    <div className="book-card__rating" aria-label={`Rating: ${rating} out of 5`}>
      <span className="stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`star${i <= Math.floor(rating) ? " filled" : i - 0.5 <= rating ? " half" : ""}`}>
            ★
          </span>
        ))}
      </span>
      {count != null && <span className="book-card__review-count">({count.toLocaleString()})</span>}
    </div>
  );
}

export default function BookCard({ book }) {
  const { addToCart, items } = useCart();
  const inCart = items.some((i) => i.id === book.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(book);
  };

  return (
    <article className="book-card" aria-label={`${book.title} by ${book.author}`}>
      <Link to={`/books/${book.id}`} className="book-card__img-wrap">
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="book-card__img"
          loading="lazy"
        />
        {book.discount > 0 && (
          <span className="book-card__badge badge badge-discount">-{book.discount}%</span>
        )}
        {book.bestseller && !book.discount && (
          <span className="book-card__badge badge badge-bestseller">Bestseller</span>
        )}
      </Link>
      <div className="book-card__body">
        <span className="book-card__category">{book.category}</span>
        <Link to={`/books/${book.id}`}>
          <h3 className="book-card__title">{book.title}</h3>
        </Link>
        <p className="book-card__author">{book.author}</p>
        <StarRating rating={book.rating} count={book.reviews} />
        <div className="book-card__price-row">
          <span className="book-card__price">${book.price.toFixed(2)}</span>
          {book.originalPrice && book.originalPrice !== book.price && (
            <span className="book-card__original-price">${book.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <button
          className={`btn btn-primary btn-sm book-card__add-btn${inCart ? " in-cart" : ""}`}
          onClick={handleAdd}
          aria-label={`Add ${book.title} to cart`}
        >
          <ShoppingCart size={14} />
          {inCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
