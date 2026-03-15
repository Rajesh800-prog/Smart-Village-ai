import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, ShoppingCart, Search, RefreshCw } from 'lucide-react';
import './Marketplace.css';

const allCrops = [
  { name: "Tomato",       emoji: "🍅", price: 18, prev: 15, unit: "kg",     category: "Vegetables" },
  { name: "Rice",          emoji: "🌾", price: 35, prev: 37, unit: "kg",     category: "Grains" },
  { name: "Cotton",        emoji: "☁️", price: 72, prev: 65, unit: "kg",     category: "Cash Crops" },
  { name: "Wheat",         emoji: "🌿", price: 28, prev: 28, unit: "kg",     category: "Grains" },
  { name: "Onion",         emoji: "🧅", price: 22, prev: 30, unit: "kg",     category: "Vegetables" },
  { name: "Potato",        emoji: "🥔", price: 14, prev: 12, unit: "kg",     category: "Vegetables" },
  { name: "Soybean",       emoji: "🫘", price: 48, prev: 44, unit: "kg",     category: "Cash Crops" },
  { name: "Maize",         emoji: "🌽", price: 20, prev: 19, unit: "kg",     category: "Grains" },
  { name: "Mustard",       emoji: "🌼", price: 55, prev: 60, unit: "kg",     category: "Cash Crops" },
  { name: "Sugarcane",     emoji: "🎋", price: 3.5, prev: 3.5, unit: "kg",  category: "Cash Crops" },
  { name: "Groundnut",     emoji: "🥜", price: 65, prev: 58, unit: "kg",     category: "Cash Crops" },
  { name: "Green Chilli",  emoji: "🌶️", price: 40, prev: 55, unit: "kg",    category: "Vegetables" },
  { name: "Brinjal",       emoji: "🍆", price: 12, prev: 10, unit: "kg",     category: "Vegetables" },
  { name: "Chickpea",      emoji: "🫘", price: 70, prev: 68, unit: "kg",     category: "Grains" },
  { name: "Garlic",        emoji: "🧄", price: 80, prev: 75, unit: "kg",     category: "Vegetables" },
];

const listings = [
  { crop: "Premium Wheat (Sharbati)", qty: "500 kg", price: "₹28,000", seller: "Ramesh Singh", location: "Nashik" },
  { crop: "Organic Tomatoes",          qty: "50 kg",  price: "₹900",   seller: "Suresh Kumar", location: "Pune" },
  { crop: "Basmati Rice",              qty: "1000 kg", price: "₹35,000", seller: "Amit Patel",  location: "Nagpur" },
  { crop: "Fresh Potatoes",            qty: "200 kg", price: "₹2,800", seller: "Deepak Sharma", location: "Solapur" },
];

const categories = ["All", "Grains", "Vegetables", "Cash Crops"];

const getTrend = (price, prev) => {
  if (price > prev) return { icon: <TrendingUp size={16} />, color: "#2e7d32", bg: "#e8f5e9", label: `▲ ₹${(price - prev).toFixed(1)}` };
  if (price < prev) return { icon: <TrendingDown size={16} />, color: "#c62828", bg: "#ffebee", label: `▼ ₹${(prev - price).toFixed(1)}` };
  return { icon: <Minus size={16} />, color: "#757575", bg: "#f5f5f5", label: "Stable" };
};

const Marketplace = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = allCrops.filter(c =>
    (category === 'All' || c.category === category) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const lastUpdated = "Today, 9:00 AM";

  return (
    <div className="market-page">
      {/* Page Header */}
      <div className="market-header mb-4">
        <div>
          <h1>Crop Market Price Dashboard</h1>
          <p className="text-muted">Live mandi prices from your local market · <span className="refresh-tag"><RefreshCw size={12} /> {lastUpdated}</span></p>
        </div>
        <button className="btn btn-primary">
          <ShoppingCart size={20} /> Sell My Crop
        </button>
      </div>

      {/* Summary Strip */}
      <div className="summary-strip mb-4">
        <div className="summary-item up">
          <TrendingUp size={20} />
          <div>
            <p>Price Rise</p>
            <h3>{allCrops.filter(c => c.price > c.prev).length} Crops</h3>
          </div>
        </div>
        <div className="summary-item down">
          <TrendingDown size={20} />
          <div>
            <p>Price Fall</p>
            <h3>{allCrops.filter(c => c.price < c.prev).length} Crops</h3>
          </div>
        </div>
        <div className="summary-item stable">
          <Minus size={20} />
          <div>
            <p>Stable</p>
            <h3>{allCrops.filter(c => c.price === c.prev).length} Crops</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="market-filters mb-4">
        <div className="search-wrap">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search crop..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="cat-tabs">
          {categories.map(c => (
            <button
              key={c}
              className={`cat-tab ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price Cards Grid */}
      <div className="price-grid mb-4">
        {filtered.map((crop, i) => {
          const trend = getTrend(crop.price, crop.prev);
          return (
            <div key={i} className="price-card card">
              <div className="price-card-top">
                <span className="crop-emoji-sm">{crop.emoji}</span>
                <span className="crop-badge">{crop.category}</span>
              </div>
              <h3 className="crop-name">{crop.name}</h3>
              <div className="price-main">
                <span className="price-value">₹{crop.price}</span>
                <span className="price-unit">/{crop.unit}</span>
              </div>
              <div className="trend-pill" style={{ color: trend.color, backgroundColor: trend.bg }}>
                {trend.icon} {trend.label}
              </div>
              <p className="prev-price">Prev: ₹{crop.prev}/{crop.unit}</p>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="no-results text-center text-muted">
            <p>No crops found for "{search}"</p>
          </div>
        )}
      </div>

      {/* Farmer Listings */}
      <h2 className="mb-2" style={{ color: 'var(--primary-dark)' }}>🏪 Farmer Marketplace Listings</h2>
      <p className="text-muted mb-4">Buy directly from local farmers at best prices</p>
      <div className="listings-grid">
        {listings.map((item, i) => (
          <div key={i} className="listing-card card">
            <div>
              <h3 style={{ color: 'var(--primary-dark)' }}>{item.crop}</h3>
              <p className="text-muted mt-1">👤 {item.seller} · 📍 {item.location}</p>
              <span className="listing-qty">{item.qty} available</span>
            </div>
            <div className="listing-right">
              <h2 style={{ color: 'var(--secondary)', margin: 0 }}>{item.price}</h2>
              <button className="btn btn-outline mt-2" style={{ padding: '0.5rem 1rem', minHeight: 'auto', fontSize: '0.9rem' }}>
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
