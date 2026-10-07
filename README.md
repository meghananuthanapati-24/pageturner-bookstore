# 📚 PageTurner – eCommerce Bookstore

A complete, modern, responsive eCommerce bookstore web application built with **React + Vite**. Developed as a demonstration of agentic AI-assisted front-end development using **IBM BOB**.

---

## 🌟 Project Overview

PageTurner is a full-featured online bookstore UI featuring browsing, searching, filtering, book details, a shopping cart, and a multi-step checkout flow — all using mock data with no backend required.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Home Page** | Hero banner with search, featured & bestselling books, category grid, promo section, newsletter signup |
| **Book Listing** | Responsive grid/list view, search, category filter, price filter, rating filter, sort options |
| **Book Details** | Full book info, quantity selector, add-to-cart, buy-now, tabs for description & reviews, related books |
| **Shopping Cart** | Add/remove items, quantity controls, subtotal/discount/shipping/total, empty-cart state |
| **Checkout** | 2-step form (info + payment), full validation, order confirmation screen |
| **Responsive Design** | Desktop → Tablet → Mobile breakpoints, mobile hamburger menu |
| **Accessibility** | Semantic HTML, ARIA labels, keyboard navigation, role attributes |

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| **React 19** | UI framework, hooks (useState, useReducer, useContext, useMemo, useEffect) |
| **Vite 8** | Lightning-fast build tool and dev server |
| **React Router DOM v7** | Client-side routing (BrowserRouter, Routes, Route, useNavigate, useSearchParams) |
| **lucide-react** | Icon library |
| **CSS Custom Properties** | Design tokens (colors, spacing, shadows, radii) |
| **CSS Grid + Flexbox** | Responsive layouts |
| **Context API** | Global cart state management |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/pageturner-bookstore.git
cd pageturner-bookstore/bookstore-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 📁 Project Structure

```
bookstore-app/
├── public/
├── src/
│   ├── assets/                  # Static assets
│   ├── components/
│   │   ├── BookCard/            # Reusable book card component
│   │   │   ├── BookCard.jsx
│   │   │   └── BookCard.css
│   │   ├── Navbar/              # Navigation bar (desktop + mobile)
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   └── Footer/              # Site footer
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   ├── context/
│   │   └── CartContext.jsx      # Global cart state (useReducer + Context)
│   ├── data/
│   │   └── books.js             # Mock book data (16 books, categories, reviews)
│   ├── pages/
│   │   ├── Home/                # Landing page
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── BookListing/         # Book grid with filters
│   │   │   ├── BookListing.jsx
│   │   │   └── BookListing.css
│   │   ├── BookDetails/         # Single book detail view
│   │   │   ├── BookDetails.jsx
│   │   │   └── BookDetails.css
│   │   ├── Cart/                # Shopping cart
│   │   │   ├── Cart.jsx
│   │   │   └── Cart.css
│   │   └── Checkout/            # Multi-step checkout + confirmation
│   │       ├── Checkout.jsx
│   │       └── Checkout.css
│   ├── styles/
│   │   └── globals.css          # Global CSS variables, resets, utilities
│   ├── App.jsx                  # Root component with router setup
│   └── main.jsx                 # Entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🗺 Application Routes

| Route | Page |
|---|---|
| `/` | Home Page |
| `/books` | Book Listing (supports `?search=` and `?category=` query params) |
| `/books/:id` | Book Details |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout & Order Confirmation |

---

## 🤖 How IBM BOB Was Used in Development

This project was developed **iteratively and entirely with IBM BOB**, an agentic AI development tool. Here's how the tool accelerated development:

### 1. Project Scaffolding
BOB scaffolded the entire Vite + React project structure from scratch, configured `vite.config.js`, and installed the correct dependencies in one step.

### 2. Iterative Feature Development
Each major feature was implemented in logical order:
- **Mock data** → **Core components** (Navbar, Footer, BookCard) → **Pages** (Home → Listing → Details → Cart → Checkout)
- BOB maintained context across the entire codebase, ensuring consistent imports, naming, and style conventions throughout.

### 3. Build Error Detection and Fix
When the build failed due to renamed icons in `lucide-react v1+` (Facebook, Twitter, Instagram, Youtube icons were removed), BOB:
- Diagnosed the exact root cause by inspecting the installed package
- Replaced the missing icons with inline SVG implementations without any manual intervention

### 4. Responsive Design
BOB wrote all CSS breakpoints, flexbox, and grid layouts ensuring the app is fully responsive across mobile (480px), tablet (768px), laptop (900px), and desktop (1200px+) — all in a single pass.

### 5. Code Quality
- All components are reusable and isolated
- Global state is managed cleanly via React Context + useReducer
- CSS uses design tokens (custom properties) for consistency
- No code duplication — `StarRating` is exported from BookCard and reused in BookDetails

### 6. Whole-task Orchestration
BOB tracked all todos, caught unused imports before the final build, and ensured the entire application built successfully with zero errors.

---

## 📸 Key User Flows

1. **Browse books** → Home page → Book Listing
2. **Search** → Use the search bar in the navbar or hero section
3. **Filter** → Use sidebar filters (category, price, rating) on the Listing page
4. **Book details** → Click any book card
5. **Add to cart** → "Add to Cart" button on any card or detail page
6. **Manage cart** → `/cart` — adjust quantities, remove items
7. **Checkout** → Fill in shipping info → payment details → place order
8. **Confirmation** → Order confirmed screen with order ID

---

## 📌 Notes

- All payment processing is **simulated** — no real transactions occur
- Book cover images are sourced from Unsplash (public domain)
- No backend or database — all data is in `src/data/books.js`
- The app is ready to be connected to a real API by replacing the mock data imports

---

## 📄 License

MIT — free to use for learning and portfolio purposes.
