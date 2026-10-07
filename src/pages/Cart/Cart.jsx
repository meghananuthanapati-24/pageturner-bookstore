import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, discount } = useCart();
  const shipping = subtotal >= 35 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="cart-page page-enter">
        <div className="container cart-page__inner">
          <h1 className="cart-page__title">Shopping Cart</h1>
          <div className="empty-state">
            <div className="icon"><ShoppingBag size={64} strokeWidth={1.2} /></div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any books yet. Discover something great!</p>
            <Link to="/books" className="btn btn-primary btn-lg">
              Browse Books <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page page-enter">
      <div className="container cart-page__inner">
        <h1 className="cart-page__title">
          Shopping Cart <span className="cart-page__count">({items.length} {items.length === 1 ? "item" : "items"})</span>
        </h1>

        <div className="cart-layout">
          {/* ===== Cart Items ===== */}
          <section className="cart-items" aria-label="Cart items">
            {items.map((item) => (
              <article key={item.id} className="cart-item" aria-label={`${item.title} in cart`}>
                <Link to={`/books/${item.id}`} className="cart-item__img-wrap">
                  <img src={item.cover} alt={`Cover of ${item.title}`} />
                </Link>
                <div className="cart-item__info">
                  <Link to={`/books/${item.id}`}>
                    <h3 className="cart-item__title">{item.title}</h3>
                  </Link>
                  <p className="cart-item__author">{item.author}</p>
                  <p className="cart-item__category">{item.category}</p>
                  {item.discount > 0 && (
                    <span className="badge badge-discount">-{item.discount}% off</span>
                  )}
                </div>
                <div className="cart-item__controls">
                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="number" min="1" max="99"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="qty-input"
                      aria-label={`Quantity of ${item.title}`}
                    />
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="cart-item__price-col">
                    <span className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</span>
                    {item.quantity > 1 && (
                      <span className="cart-item__unit">${item.price.toFixed(2)} each</span>
                    )}
                  </div>
                  <button
                    className="btn btn-ghost btn-sm cart-item__remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </section>

          {/* ===== Order Summary ===== */}
          <aside className="cart-summary" aria-label="Order summary">
            <h2 className="cart-summary__heading">Order Summary</h2>

            <div className="cart-summary__rows">
              <div className="cart-summary__row">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>${(subtotal + discount).toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="cart-summary__row cart-summary__row--discount">
                  <span><Tag size={14} /> Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="cart-summary__row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong className="free-shipping">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="cart-summary__free-shipping-note">
                  Add ${(35 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="cart-summary__divider" />
              <div className="cart-summary__row cart-summary__row--total">
                <span>Estimated Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {discount > 0 && (
              <div className="cart-summary__savings">
                🎉 You're saving <strong>${discount.toFixed(2)}</strong> on this order!
              </div>
            )}

            <Link to="/checkout" className="btn btn-primary btn-lg btn-full cart-summary__checkout">
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
            <Link to="/books" className="btn btn-ghost btn-sm btn-full cart-summary__continue">
              ← Continue Shopping
            </Link>

            <div className="cart-summary__secure">
              🔒 Secure checkout — your data is safe
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
