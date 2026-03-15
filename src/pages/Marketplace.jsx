import { ShoppingCart } from 'lucide-react';

const Marketplace = () => {
  const listings = [
    { title: 'Premium Wheat (Sharbati)', quantity: '500 kg', price: '₹28,000', seller: 'Ramesh Singh', location: 'Village A' },
    { title: 'Organic Tomatoes', quantity: '50 kg', price: '₹1,500', seller: 'Suresh Kumar', location: 'Village B' },
    { title: 'Basmati Rice', quantity: '1000 kg', price: '₹35,000', seller: 'Amit Patel', location: 'Village C' },
    { title: 'Fresh Potatoes', quantity: '200 kg', price: '₹3,000', seller: 'Deepak Sharma', location: 'Village D' }
  ];

  return (
    <div className="marketplace">
      <div className="flex justify-between items-center flex-wrap mb-4 gap-4">
        <h2>Farmer Marketplace</h2>
        <button className="btn btn-primary">
          <ShoppingCart size={20} />
          Sell Your Crop
        </button>
      </div>

      <div className="grid grid-2">
        {listings.map((item, index) => (
          <div key={index} className="card flex justify-between items-center flex-wrap gap-4">
            <div>
              <h3 className="text-primary-dark">{item.title}</h3>
              <p className="text-muted mt-1">{item.seller} • {item.location}</p>
              <div className="flex gap-4 mt-2">
                <span style={{ backgroundColor: '#f5f5f5', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{item.quantity}</span>
              </div>
            </div>
            <div className="text-right">
              <h2 style={{ color: 'var(--secondary)' }}>{item.price}</h2>
              <button className="btn btn-outline mt-2" style={{ padding: '0.5rem 1rem', minHeight: 'auto' }}>Contact Buyer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
