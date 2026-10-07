# PageTurner — eCommerce Bookstore

A modern, responsive eCommerce bookstore web application built with React and Vite. Developed as part of an Applied AI Specialist Learning Program to demonstrate agentic front-end development using IBM BOB.

---

## Overview

PageTurner is a full-featured bookstore UI covering browsing, searching, filtering, book details, cart management, and a multi-step checkout flow. All data is mocked — no backend is required.

---

## Features

| Page | Description |
|---|---|
| Home | Hero banner with search, featured books, bestsellers, category navigation, promotional section |
| Book Listing | Responsive grid/list view with search, category, price, and rating filters plus sort options |
| Book Details | Full book information, quantity selector, description and reviews tabs, related books |
| Shopping Cart | Add/remove items, quantity controls, discount and shipping calculation, empty-cart state |
| Checkout | Two-step form with validation, payment method selection, and order confirmation screen |

Additional: fully responsive layout (mobile, tablet, desktop), accessible semantic HTML with ARIA labels, and a sticky navigation bar with mobile hamburger menu.

---

## Technologies

| Technology | Role |
|---|---|
| React 19 | UI framework — hooks: useState, useReducer, useContext, useMemo, useEffect |
| Vite 8 | Build tool and development server |
| React Router DOM v7 | Client-side routing |
| lucide-react | Icon library |
| CSS Custom Properties | Design tokens for consistent theming |
| CSS Grid and Flexbox | Responsive layouts |
| React Context API | Global cart state management |

---

## Getting Started

**Prerequisites:** Node.js >= 18, npm >= 9

```bash
# Clone the repository
git clone https://github.com/meghananuthanapati-24/pageturner-bookstore.git
cd pageturner-bookstore/bookstore-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:5173** in your browser.

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## Project Structure

```
bookstore-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BookCard/        # Reusable book card component
│   │   ├── Navbar/          # Navigation bar (desktop + mobile)
│   │   └── Footer/          # Site footer
│   ├── context/
│   │   └── CartContext.jsx  # Global cart state via useReducer + Context
│   ├── data/
│   │   └── books.js         # Mock data: 16 books, categories, reviews
│   ├── pages/
│   │   ├── Home/
│   │   ├── BookListing/
│   │   ├── BookDetails/
│   │   ├── Cart/
│   │   └── Checkout/
│   ├── styles/
│   │   └── globals.css      # CSS variables, resets, utility classes
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/books` | Book Listing — supports `?search=` and `?category=` query parameters |
| `/books/:id` | Book Details |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout and Order Confirmation |

---

## IBM BOB — Agentic Development

This project was built end-to-end using **IBM BOB**, an agentic AI development tool. Key contributions:

- **Scaffolding** — set up the Vite + React project, configured `vite.config.js`, and installed dependencies.
- **Iterative implementation** — built each feature in order (data → components → pages) while maintaining consistent naming, imports, and style conventions across the codebase.
- **Error resolution** — when the build failed due to removed social icons in `lucide-react v1+`, BOB identified the root cause and replaced them with inline SVG implementations automatically.
- **Responsive design** — generated all CSS breakpoints, grid and flexbox layouts for mobile through desktop in a single pass.
- **Code quality** — kept components reusable and isolated, avoided duplication, and managed all unused imports before the final build.

---

## Notes

- Payment processing is fully simulated — no real transactions occur.
- Book cover images are sourced from Unsplash.
- All data lives in `src/data/books.js` and can be replaced with a real API.

