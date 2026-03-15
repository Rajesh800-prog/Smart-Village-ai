import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Plus, Search, Phone, ShoppingBag, BarChart2, X, User, MapPin, Package, Loader2 } from 'lucide-react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import '../styles/Marketplace.css';

/* ─── Market Price Data ─── */
/* ─── Initial Market Price Data ─── */
const defaultCrops = [
  { name: "Tomato",       emoji: "🍅", price: 18,   prev: 15,   category: "Vegetables" },
  { name: "Rice",         emoji: "🌾", price: 35,   prev: 37,   category: "Grains" },
  { name: "Cotton",       emoji: "☁️", price: 72,   prev: 65,   category: "Cash Crops" },
  { name: "Wheat",        emoji: "🌿", price: 28,   prev: 28,   category: "Grains" },
  { name: "Onion",        emoji: "🧅", price: 22,   prev: 30,   category: "Vegetables" },
  { name: "Potato",       emoji: "🥔", price: 14,   prev: 12,   category: "Vegetables" },
  { name: "Soybean",      emoji: "🫘", price: 48,   prev: 44,   category: "Cash Crops" },
  { name: "Maize",        emoji: "🌽", price: 20,   prev: 19,   category: "Grains" },
  { name: "Mustard",      emoji: "🌼", price: 55,   prev: 60,   category: "Cash Crops" },
  { name: "Groundnut",    emoji: "🥜", price: 65,   prev: 58,   category: "Cash Crops" },
  { name: "Green Chilli", emoji: "🌶️", price: 40,  prev: 55,   category: "Vegetables" },
  { name: "Chickpea",     emoji: "🫘", price: 70,   prev: 68,   category: "Grains" },
];

const getTrend = (p, q) =>
  p > q ? { icon: <TrendingUp size={14} />, color: "#2e7d32", bg: "#e8f5e9", label: `▲ ₹${(p-q).toFixed(1)}` }
  : p < q ? { icon: <TrendingDown size={14} />, color: "#c62828", bg: "#ffebee", label: `▼ ₹${(q-p).toFixed(1)}` }
  : { icon: <Minus size={14} />, color: "#757575", bg: "#f5f5f5", label: "Stable" };

/* ─── Initial Marketplace Listings ─── */
const initialListings = [
  { id: 1, crop: "Tomatoes",      emoji: "🍅", qty: 200, price: 20, unit: "kg", seller: "Ramesh Singh",   location: "Nashik",  phone: "+91 98765 43210", category: "Vegetables" },
  { id: 2, crop: "Basmati Rice",  emoji: "🌾", qty: 500, price: 35, unit: "kg", seller: "Suresh Patel",    location: "Nagpur",  phone: "+91 87654 32109", category: "Grains" },
  { id: 3, crop: "Fresh Onions",  emoji: "🧅", qty: 300, price: 22, unit: "kg", seller: "Amit Kumar",      location: "Pune",    phone: "+91 76543 21098", category: "Vegetables" },
  { id: 4, crop: "Cotton Bales",  emoji: "☁️", qty: 100, price: 72, unit: "kg", seller: "Deepak Sharma",   location: "Solapur", phone: "+91 65432 10987", category: "Cash Crops" },
  { id: 5, crop: "Wheat",         emoji: "🌿", qty: 800, price: 28, unit: "kg", seller: "Vijay Desai",     location: "Latur",   phone: "+91 54321 09876", category: "Grains" },
  { id: 6, crop: "Green Chilli",  emoji: "🌶️", qty: 80, price: 40, unit: "kg",  seller: "Manoj Reddy",     location: "Aurangabad",phone: "+91 43210 98765",category: "Vegetables" },
];

const categories = ["All", "Vegetables", "Grains", "Cash Crops"];

const emptyForm = { crop: '', emoji: '', qty: '', price: '', unit: 'kg', seller: '', location: '', phone: '', category: 'Vegetables' };

const Marketplace = () => {
  const { currentUser, farmerProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('marketplace');
  const [listings, setListings] = useState([]);
  const [allCrops, setAllCrops] = useState(defaultCrops);
  const [loading, setLoading] = useState(true);
  const [pricesLoading, setPricesLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [contactId, setContactId] = useState(null);

  // ─── Fetch real-time Mandi Prices ───
  useEffect(() => {
    const q = query(collection(db, 'mandiPrices'));
    const unsubscribe = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setAllCrops(snap.docs.map(doc => doc.data()));
      }
      setPricesLoading(false);
    });
    return unsubscribe;
  }, []);

  // ─── Fetch real-time listings from Firestore ───
  useEffect(() => {
    const q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListings(docs);
      setLoading(false);
    }, (err) => {
      console.error("Firestore Marketplace Error:", err);
      toast.error("Marketplace Connection Error: " + err.message);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Pre-fill form with farmer profile if available
  useEffect(() => {
    if (showModal && farmerProfile) {
      setForm(prev => ({
        ...prev,
        seller: farmerProfile.name || '',
        location: farmerProfile.village || '',
        phone: farmerProfile.phone || ''
      }));
    }
  }, [showModal, farmerProfile]);

  const filtered = listings.filter(l =>
    (category === 'All' || l.category === category) &&
    l.crop.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddListing = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'listings'), {
        ...form,
        qty: parseInt(form.qty),
        price: parseFloat(form.price),
        emoji: form.emoji || '🌿',
        sellerId: currentUser?.uid || 'guest',
        createdAt: serverTimestamp(),
      });
      setForm(emptyForm);
      setShowModal(false);
    } catch (err) {
      console.error("Error adding listing:", err);
      alert("Failed to publish listing. Please try again.");
    }
  };

  return (
    <div className="market-page">
      {/* ─── Tab Bar ─── */}
      <div className="market-tab-bar mb-4">
        <button className={`market-tab ${activeTab === 'marketplace' ? 'active' : ''}`} onClick={() => setActiveTab('marketplace')}>
          <ShoppingBag size={18} /> Farmer Marketplace
        </button>
        <button className={`market-tab ${activeTab === 'prices' ? 'active' : ''}`} onClick={() => setActiveTab('prices')}>
          <BarChart2 size={18} /> Market Prices
        </button>
      </div>

      {/* ══════════════════════════════════════ MARKETPLACE TAB ══════ */}
      {activeTab === 'marketplace' && (
        <>
          <div className="market-header mb-4">
            <div>
              <h1>Farmer Marketplace</h1>
              <p className="text-muted">{listings.length} crop listings available from local farmers</p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              <Plus size={20} /> Add My Crop
            </button>
          </div>

          {/* Filters */}
          <div className="market-filters mb-4">
            <div className="search-wrap">
              <Search size={18} />
              <input placeholder="Search crops..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="cat-tabs">
              {categories.map(c => (
                <button key={c} className={`cat-tab ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
          </div>

          {/* Listing Cards */}
          <div className="listings-cards">
            {loading ? (
              <div className="flex items-center justify-center" style={{ gridColumn: '1/-1', padding: '4rem' }}>
                <Loader2 className="animate-spin" size={40} color="var(--primary)" />
                <p className="ml-2">Loading live market...</p>
              </div>
            ) : (
              filtered.map(item => (
                <div key={item.id} className="listing-product-card card">
                  {/* Crop Visual */}
                  <div className="crop-visual">
                    <span>{item.emoji}</span>
                  </div>
                  {/* Category tag */}
                  <span className="listing-cat-tag">{item.category}</span>
                  <h3 className="listing-crop-name">{item.crop}</h3>

                  <div className="listing-meta">
                    <div className="meta-row"><Package size={15} /><span><strong>{item.qty} {item.unit}</strong> available</span></div>
                    <div className="meta-row"><User size={15} /><span>{item.seller}</span></div>
                    <div className="meta-row"><MapPin size={15} /><span>{item.location}</span></div>
                  </div>

                  <div className="listing-footer">
                    <div className="listing-price">
                      <span className="price-big">₹{item.price}</span>
                      <span className="price-unit-sm">/{item.unit}</span>
                    </div>
                    <button
                      className="btn btn-primary contact-btn"
                      onClick={() => setContactId(contactId === item.id ? null : item.id)}
                    >
                      <Phone size={16} /> Contact Farmer
                    </button>
                  </div>

                  {contactId === item.id && (
                    <div className="contact-reveal">
                      <Phone size={16} /> <strong>{item.phone}</strong>
                      <span className="text-muted ml-1">— Call or WhatsApp</span>
                    </div>
                  )}
                </div>
              ))
            )}
            {!loading && filtered.length === 0 && (
              <div className="market-empty-state">
                <div className="empty-icon-wrap">
                  <ShoppingBag size={48} />
                </div>
                <h3>No crops found</h3>
                <p>We couldn't find any listings matching your search or category. Try clearing filters or search for something else.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ══════════════════════════════════════ PRICES TAB ═══════════ */}
      {activeTab === 'prices' && (
        <>
          <div className="market-header mb-4">
            <div>
              <h1>Market Price Dashboard</h1>
              <p className="text-muted">Today's live mandi prices for major crops</p>
            </div>
          </div>

          {/* Summary Strip */}
          <div className="summary-strip mb-4">
            <div className="summary-item up"><TrendingUp size={20} /><div><p>Price Rise</p><h3>{allCrops.filter(c => c.price > c.prev).length} Crops</h3></div></div>
            <div className="summary-item down"><TrendingDown size={20} /><div><p>Price Fall</p><h3>{allCrops.filter(c => c.price < c.prev).length} Crops</h3></div></div>
            <div className="summary-item stable"><Minus size={20} /><div><p>Stable</p><h3>{allCrops.filter(c => c.price === c.prev).length} Crops</h3></div></div>
          </div>

          <div className="price-grid">
            {allCrops.map((crop, i) => {
              const trend = getTrend(crop.price, crop.prev);
              return (
                <div key={i} className="price-card card">
                  <div className="price-card-top">
                    <span style={{ fontSize: '1.8rem' }}>{crop.emoji}</span>
                    <span className="crop-badge">{crop.category}</span>
                  </div>
                  <h3 className="crop-name">{crop.name}</h3>
                  <div className="price-main">
                    <span className="price-value">₹{crop.price}</span>
                    <span className="price-unit">/kg</span>
                  </div>
                  <div className="trend-pill" style={{ color: trend.color, backgroundColor: trend.bg }}>
                    {trend.icon} {trend.label}
                  </div>
                  <p className="prev-price">Prev: ₹{crop.prev}/kg</p>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ════════ ADD LISTING MODAL ════════ */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📦 Add Crop Listing</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={22} /></button>
            </div>
            <form onSubmit={handleAddListing}>
              <div className="grid grid-2" style={{ gap: '0.75rem' }}>
                <div className="form-group">
                  <label>Crop Name</label>
                  <input required placeholder="e.g., Tomatoes" value={form.crop} onChange={e => setForm({...form, crop: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Emoji Icon</label>
                  <input placeholder="e.g., 🍅" value={form.emoji} onChange={e => setForm({...form, emoji: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Quantity (kg)</label>
                  <input required type="number" placeholder="e.g., 200" value={form.qty} onChange={e => setForm({...form, qty: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Price per kg (₹)</label>
                  <input required type="number" placeholder="e.g., 20" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option>Vegetables</option><option>Grains</option><option>Cash Crops</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Your Name</label>
                  <input required placeholder="Farmer name" value={form.seller} onChange={e => setForm({...form, seller: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input required placeholder="Village / City" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <input required placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%' }}>
                <Plus size={18} /> Publish Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
