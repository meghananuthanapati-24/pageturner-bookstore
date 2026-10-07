# PageTurner — eCommerce Bookstore

A modern, responsive eCommerce bookstore built with React and Vite. Developed to demonstrate agentic front-end development using IBM BOB.

## Features

- **Home** — Hero search, featured books, bestsellers, category navigation, promotional section
- **Book Listing** — Grid/list view with search, category, price, and rating filters, and sort options
- **Book Details** — Full book info, quantity selector, description/reviews tabs, related books
- **Shopping Cart** — Add/remove items, quantity controls, discount and shipping calculation
- **Checkout** — Two-step form with validation, payment selection, and order confirmation
- Fully responsive (mobile, tablet, desktop) with accessible semantic HTML and ARIA labels

## Technologies

| Technology | Role |
|---|---|
| React 19 | UI framework with hooks |
| Vite 8 | Build tool and development server |
| React Router DOM v7 | Client-side routing |
| React Context API | Global cart state via useReducer |
| CSS Grid and Flexbox | Responsive layouts |
| lucide-react | Icon library |

## Getting Started

**Prerequisites:** Node.js >= 18, npm >= 9

```bash
git clone https://github.com/meghananuthanapati-24/pageturner-bookstore.git
cd pageturner-bookstore/bookstore-app
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

```bash
npm run build    # production build
npm run preview  # preview production build
```

## Project Structure

```
src/
├── components/        # Navbar, Footer, BookCard
├── context/           # CartContext.jsx
├── data/              # books.js — mock data
├── pages/             # Home, BookListing, BookDetails, Cart, Checkout
├── styles/            # globals.css
├── App.jsx
└── main.jsx
```

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/books` | Book Listing — supports `?search=` and `?category=` |
| `/books/:id` | Book Details |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout and Order Confirmation |

## IBM BOB — Agentic Development

Built end-to-end using **IBM BOB**. The tool handled project scaffolding, iterative feature implementation, automatic build error resolution, responsive CSS generation, and code quality checks — all without manual intervention.

## Notes

- Payment processing is simulated — no real transactions occur
- All data is in `src/data/books.js` and can be replaced with a real API

## License

MIT
