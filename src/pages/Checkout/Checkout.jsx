import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Truck, CheckCircle, Lock, ChevronRight, AlertCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

const INITIAL_FORM = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", city: "", state: "", zip: "", country: "United Kingdom",
  paymentMethod: "card",
  cardNumber: "", cardName: "", cardExpiry: "", cardCvv: "",
};

function validate(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.lastName.trim()) errors.lastName = "Last name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Enter a valid email";
  if (!form.phone.trim()) errors.phone = "Phone number is required";
  if (!form.address.trim()) errors.address = "Address is required";
  if (!form.city.trim()) errors.city = "City is required";
  if (!form.zip.trim()) errors.zip = "Postcode is required";
  if (form.paymentMethod === "card") {
    if (!form.cardNumber.trim()) errors.cardNumber = "Card number is required";
    else if (form.cardNumber.replace(/\s/g, "").length < 16) errors.cardNumber = "Enter a valid 16-digit card number";
    if (!form.cardName.trim()) errors.cardName = "Name on card is required";
    if (!form.cardExpiry.trim()) errors.cardExpiry = "Expiry date is required";
    else if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) errors.cardExpiry = "Use MM/YY format";
    if (!form.cardCvv.trim()) errors.cardCvv = "CVV is required";
    else if (form.cardCvv.length < 3) errors.cardCvv = "CVV must be 3–4 digits";
  }
  return errors;
}

function formatCardNumber(val) {
  return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(val) {
  const v = val.replace(/\D/g, "").slice(0, 4);
  return v.length >= 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v;
}

export default function Checkout() {
  const { items, subtotal, discount, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1=info+shipping, 2=payment, 3=confirmation
  const [loading, setLoading] = useState(false);
  const [orderId] = useState(() => "PT-" + Math.floor(100000 + Math.random() * 900000));

  const shipping = subtotal >= 35 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shipping;

  if (items.length === 0 && step !== 3) {
    return (
      <div className="empty-state" style={{ marginTop: "4rem" }}>
        <div className="icon">🛒</div>
        <h3>No items to checkout</h3>
        <p>Add some books to your cart first.</p>
        <Link to="/books" className="btn btn-primary">Browse Books</Link>
      </div>
    );
  }

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  const handleStep1 = (e) => {
    e.preventDefault();
    const errs = {};
    ["firstName","lastName","email","phone","address","city","zip"].forEach((k) => {
      if (!form[k].trim()) errs[k] = `${k.replace(/([A-Z])/g, " $1")} is required`;
    });
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      clearCart();
      window.scrollTo(0, 0);
    }, 1800);
  };

  if (step === 3) {
    return (
      <main className="checkout-page page-enter">
        <div className="container checkout-confirmation">
          <CheckCircle size={72} className="checkout-confirmation__icon" />
          <h1>Order Confirmed! 🎉</h1>
          <p className="checkout-confirmation__order-id">Order ID: <strong>{orderId}</strong></p>
          <p className="checkout-confirmation__msg">
            Thank you, <strong>{form.firstName}</strong>! Your books are on their way to{" "}
            <strong>{form.city}</strong>. A confirmation has been sent to <strong>{form.email}</strong>.
          </p>
          <div className="checkout-confirmation__details">
            <div className="checkout-confirmation__detail">
              <Truck size={20} /> Estimated delivery: 3–5 business days
            </div>
            <div className="checkout-confirmation__detail">
              <Lock size={20} /> Payment secured with 256-bit encryption
            </div>
          </div>
          <div className="checkout-confirmation__actions">
            <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
            <Link to="/books" className="btn btn-outline btn-lg">Continue Shopping</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page page-enter">
      <div className="container checkout-layout">
        {/* ===== Left: Form ===== */}
        <div className="checkout-form-area">
          {/* Steps indicator */}
          <div className="checkout-steps" aria-label="Checkout progress">
            {[
              { num: 1, label: "Information & Shipping" },
              { num: 2, label: "Payment" },
            ].map((s, i, arr) => (
              <div key={s.num} className="checkout-steps__step-wrap">
                <div className={`checkout-steps__step${step >= s.num ? " done" : ""}${step === s.num ? " active" : ""}`}>
                  <span className="checkout-steps__num">{step > s.num ? "✓" : s.num}</span>
                  <span className="checkout-steps__label">{s.label}</span>
                </div>
                {i < arr.length - 1 && <div className={`checkout-steps__line${step > s.num ? " done" : ""}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Info + Shipping */}
          {step === 1 && (
            <form className="checkout-form" onSubmit={handleStep1} noValidate>
              <section className="checkout-section">
                <h2 className="checkout-section__title">Customer Information</h2>
                <div className="form-row">
                  <FormField label="First Name" id="firstName" value={form.firstName} onChange={(v) => setField("firstName", v)} error={errors.firstName} required />
                  <FormField label="Last Name" id="lastName" value={form.lastName} onChange={(v) => setField("lastName", v)} error={errors.lastName} required />
                </div>
                <FormField label="Email Address" id="email" type="email" value={form.email} onChange={(v) => setField("email", v)} error={errors.email} required />
                <FormField label="Phone Number" id="phone" type="tel" value={form.phone} onChange={(v) => setField("phone", v)} error={errors.phone} required />
              </section>

              <section className="checkout-section">
                <h2 className="checkout-section__title"><Truck size={18} /> Shipping Address</h2>
                <FormField label="Street Address" id="address" value={form.address} onChange={(v) => setField("address", v)} error={errors.address} required />
                <div className="form-row">
                  <FormField label="City" id="city" value={form.city} onChange={(v) => setField("city", v)} error={errors.city} required />
                  <FormField label="State / County" id="state" value={form.state} onChange={(v) => setField("state", v)} error={errors.state} />
                </div>
                <div className="form-row">
                  <FormField label="Postcode / ZIP" id="zip" value={form.zip} onChange={(v) => setField("zip", v)} error={errors.zip} required />
                  <div className="form-field">
                    <label htmlFor="country" className="form-label">Country <span>*</span></label>
                    <select id="country" className="form-input" value={form.country} onChange={(e) => setField("country", e.target.value)}>
                      {["United Kingdom","United States","Canada","Australia","Germany","France","India"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <button type="submit" className="btn btn-primary btn-lg btn-full">
                Continue to Payment <ChevronRight size={18} />
              </button>
            </form>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <form className="checkout-form" onSubmit={handlePlaceOrder} noValidate>
              <section className="checkout-section">
                <h2 className="checkout-section__title"><CreditCard size={18} /> Payment Method</h2>
                <div className="payment-methods">
                  {[
                    { value: "card", label: "Credit / Debit Card" },
                    { value: "paypal", label: "PayPal" },
                    { value: "apple", label: "Apple Pay" },
                  ].map((m) => (
                    <label key={m.value} className={`payment-method${form.paymentMethod === m.value ? " selected" : ""}`}>
                      <input
                        type="radio" name="paymentMethod" value={m.value}
                        checked={form.paymentMethod === m.value}
                        onChange={() => setField("paymentMethod", m.value)}
                      />
                      <span>{m.label}</span>
                    </label>
                  ))}
                </div>

                {form.paymentMethod === "card" && (
                  <div className="card-fields">
                    <div className="card-fields__demo-note">
                      <AlertCircle size={14} /> Demo mode — no real payment is processed
                    </div>
                    <FormField
                      label="Card Number" id="cardNumber"
                      value={form.cardNumber}
                      onChange={(v) => setField("cardNumber", formatCardNumber(v))}
                      error={errors.cardNumber} placeholder="1234 5678 9012 3456" required
                    />
                    <FormField
                      label="Name on Card" id="cardName"
                      value={form.cardName}
                      onChange={(v) => setField("cardName", v)}
                      error={errors.cardName} required
                    />
                    <div className="form-row">
                      <FormField
                        label="Expiry Date" id="cardExpiry"
                        value={form.cardExpiry}
                        onChange={(v) => setField("cardExpiry", formatExpiry(v))}
                        error={errors.cardExpiry} placeholder="MM/YY" required
                      />
                      <FormField
                        label="CVV" id="cardCvv"
                        value={form.cardCvv}
                        onChange={(v) => setField("cardCvv", v.replace(/\D/g, "").slice(0, 4))}
                        error={errors.cardCvv} placeholder="123" required
                      />
                    </div>
                  </div>
                )}
                {form.paymentMethod !== "card" && (
                  <div className="payment-redirect-note">
                    You will be redirected to {form.paymentMethod === "paypal" ? "PayPal" : "Apple Pay"} to complete your payment. (Demo mode)
                  </div>
                )}
              </section>

              <div className="checkout-form__nav">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                <button type="submit" className="btn btn-accent btn-lg" disabled={loading}>
                  {loading ? "Processing…" : <>Place Order <Lock size={16} /></>}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ===== Right: Order Summary ===== */}
        <aside className="checkout-summary" aria-label="Order summary">
          <h2 className="checkout-summary__title">Order Summary</h2>
          <div className="checkout-summary__items">
            {items.map((item) => (
              <div key={item.id} className="checkout-summary__item">
                <div className="checkout-summary__item-img-wrap">
                  <img src={item.cover} alt={item.title} />
                  <span className="checkout-summary__item-qty">{item.quantity}</span>
                </div>
                <div className="checkout-summary__item-info">
                  <p className="checkout-summary__item-title">{item.title}</p>
                  <p className="checkout-summary__item-author">{item.author}</p>
                </div>
                <span className="checkout-summary__item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="checkout-summary__rows">
            <div className="checkout-summary__row">
              <span>Subtotal</span><span>${(subtotal + discount).toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="checkout-summary__row checkout-summary__row--green">
                <span>Discount</span><span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="checkout-summary__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? <strong style={{color:"var(--success)"}}>FREE</strong> : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="checkout-summary__divider" />
            <div className="checkout-summary__row checkout-summary__row--total">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="checkout-summary__secure">
            <Lock size={14} /> Secure 256-bit SSL encryption
          </div>
        </aside>
      </div>
    </main>
  );
}

function FormField({ label, id, value, onChange, error, type = "text", placeholder, required }) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id} type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`form-input${error ? " form-input--error" : ""}`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
      />
      {error && <p id={`${id}-error`} className="form-error" role="alert"><AlertCircle size={12} /> {error}</p>}
    </div>
  );
}
