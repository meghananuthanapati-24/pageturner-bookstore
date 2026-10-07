import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp, Grid3x3, List } from "lucide-react";
import BookCard from "../../components/BookCard/BookCard";
import { books, categories } from "../../data/books";
import "./BookListing.css";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Top Rated" },
  { value: "title-asc", label: "Title: A–Z" },
];

const PRICE_RANGES = [
  { label: "Under $10", min: 0, max: 10 },
  { label: "$10 – $20", min: 10, max: 20 },
  { label: "$20 – $35", min: 20, max: 35 },
  { label: "Over $35", min: 35, max: Infinity },
];

const RATING_OPTIONS = [4.5, 4, 3.5, 3];

export default function BookListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeSearch, setActiveSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [sort, setSort] = useState("relevance");
  const [priceRange, setPriceRange] = useState(null);
  const [minRating, setMinRating] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  // Sync URL params on mount
  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("search");
    if (cat) setCategory(cat);
    if (q) { setSearch(q); setActiveSearch(q); }
  }, []); // eslint-disable-line

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(search);
    const p = new URLSearchParams(searchParams);
    if (search) p.set("search", search); else p.delete("search");
    setSearchParams(p);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const p = new URLSearchParams(searchParams);
    if (cat !== "All") p.set("category", cat); else p.delete("category");
    setSearchParams(p);
    setSidebarOpen(false);
  };

  const clearFilters = () => {
    setCategory("All"); setPriceRange(null); setMinRating(0);
    setSort("relevance"); setSearch(""); setActiveSearch("");
    setSearchParams({});
  };

  const filtered = useMemo(() => {
    let result = [...books];
    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      result = result.filter(
        (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)
      );
    }
    if (category !== "All") result = result.filter((b) => b.category === category);
    if (priceRange) result = result.filter((b) => b.price >= priceRange.min && b.price < priceRange.max);
    if (minRating > 0) result = result.filter((b) => b.rating >= minRating);
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating-desc": result.sort((a, b) => b.rating - a.rating); break;
      case "title-asc": result.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: break;
    }
    return result;
  }, [activeSearch, category, sort, priceRange, minRating]);

  const activeFilterCount = [category !== "All", priceRange, minRating > 0].filter(Boolean).length;

  return (
    <div className="book-listing page-enter">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="container breadcrumb__inner">
          <Link to="/">Home</Link> <span>/</span>
          <span>Books{category !== "All" ? ` / ${category}` : ""}</span>
        </div>
      </div>

      <div className="container book-listing__layout">
        {/* ===== Sidebar ===== */}
        <aside className={`book-listing__sidebar${sidebarOpen ? " open" : ""}`} aria-label="Filters">
          <div className="sidebar__header">
            <h2>Filters</h2>
            <button className="show-mobile sidebar__close" onClick={() => setSidebarOpen(false)} aria-label="Close filters">
              <X size={20} />
            </button>
          </div>

          {activeFilterCount > 0 && (
            <button className="sidebar__clear btn btn-ghost btn-sm" onClick={clearFilters}>
              Clear all filters ({activeFilterCount})
            </button>
          )}

          {/* Category */}
          <FilterSection title="Category">
            {categories.map((c) => (
              <button
                key={c}
                className={`sidebar__option${category === c ? " active" : ""}`}
                onClick={() => handleCategoryChange(c)}
                aria-pressed={category === c}
              >
                {c}
                <span className="sidebar__count">
                  {c === "All" ? books.length : books.filter((b) => b.category === c).length}
                </span>
              </button>
            ))}
          </FilterSection>

          {/* Price */}
          <FilterSection title="Price Range">
            <button
              className={`sidebar__option${!priceRange ? " active" : ""}`}
              onClick={() => setPriceRange(null)}
            >Any Price</button>
            {PRICE_RANGES.map((r) => (
              <button
                key={r.label}
                className={`sidebar__option${priceRange?.label === r.label ? " active" : ""}`}
                onClick={() => setPriceRange(r)}
                aria-pressed={priceRange?.label === r.label}
              >
                {r.label}
              </button>
            ))}
          </FilterSection>

          {/* Rating */}
          <FilterSection title="Minimum Rating">
            <button
              className={`sidebar__option${minRating === 0 ? " active" : ""}`}
              onClick={() => setMinRating(0)}
            >Any Rating</button>
            {RATING_OPTIONS.map((r) => (
              <button
                key={r}
                className={`sidebar__option${minRating === r ? " active" : ""}`}
                onClick={() => setMinRating(r)}
                aria-pressed={minRating === r}
              >
                {"★".repeat(Math.floor(r))} {r}+
              </button>
            ))}
          </FilterSection>
        </aside>

        {/* ===== Main ===== */}
        <main className="book-listing__main">
          {/* Toolbar */}
          <div className="listing-toolbar">
            <div className="listing-toolbar__left">
              <button
                className="btn btn-outline btn-sm listing-toolbar__filter-btn"
                onClick={() => setSidebarOpen(true)}
                aria-expanded={sidebarOpen}
                aria-label="Open filters"
              >
                <SlidersHorizontal size={15} />
                Filters
                {activeFilterCount > 0 && <span className="listing-toolbar__filter-count">{activeFilterCount}</span>}
              </button>
              <p className="listing-toolbar__count">
                <strong>{filtered.length}</strong> {filtered.length === 1 ? "book" : "books"} found
                {activeSearch && <> for "<em>{activeSearch}</em>"</>}
              </p>
            </div>
            <div className="listing-toolbar__right">
              <form onSubmit={handleSearch} className="listing-search" role="search">
                <Search size={15} aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search books…"
                  aria-label="Search books"
                />
              </form>
              <select
                className="listing-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort books"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <div className="listing-view-toggle hide-mobile">
                <button
                  className={`btn btn-ghost btn-sm${viewMode === "grid" ? " active-view" : ""}`}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                >
                  <Grid3x3 size={16} />
                </button>
                <button
                  className={`btn btn-ghost btn-sm${viewMode === "list" ? " active-view" : ""}`}
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {(category !== "All" || priceRange || minRating > 0 || activeSearch) && (
            <div className="filter-chips">
              {activeSearch && (
                <span className="filter-chip">
                  Search: {activeSearch}
                  <button onClick={() => { setSearch(""); setActiveSearch(""); setSearchParams({}); }} aria-label="Remove search filter"><X size={12} /></button>
                </span>
              )}
              {category !== "All" && (
                <span className="filter-chip">
                  {category}
                  <button onClick={() => handleCategoryChange("All")} aria-label={`Remove ${category} filter`}><X size={12} /></button>
                </span>
              )}
              {priceRange && (
                <span className="filter-chip">
                  {priceRange.label}
                  <button onClick={() => setPriceRange(null)} aria-label="Remove price filter"><X size={12} /></button>
                </span>
              )}
              {minRating > 0 && (
                <span className="filter-chip">
                  {minRating}+ Stars
                  <button onClick={() => setMinRating(0)} aria-label="Remove rating filter"><X size={12} /></button>
                </span>
              )}
            </div>
          )}

          {/* Books */}
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="icon">📚</div>
              <h3>No books found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className={`books-grid${viewMode === "list" ? " books-grid--list" : ""}`}>
              {filtered.map((b) => <BookCard key={b.id} book={b} />)}
            </div>
          )}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay show-mobile" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}
    </div>
  );
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="filter-section">
      <button className="filter-section__header" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="filter-section__body">{children}</div>}
    </div>
  );
}
