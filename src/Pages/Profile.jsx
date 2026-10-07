import React, { useContext, useEffect, useState } from 'react';
import './CSS/Profile.css';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, orders, all_product, customers } = useContext(ShopContext);
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState('overview');

  // Address State (saved/loaded from localStorage)
  const [addressData, setAddressData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Mock Notification preferences state
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    weeklyNewsletter: false,
    smsAlerts: true,
    recommendations: true
  });

  // Load address from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/login');
    }

    const savedAddress = localStorage.getItem('eleganz-saved-address');
    if (savedAddress) {
      try {
        setAddressData(JSON.parse(savedAddress));
      } catch (e) {
        console.error("Error parsing saved address", e);
      }
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  const isAdmin = user.email === 'admin123@elegence.com';

  // Admin calculations
  const totalSales = orders.reduce((sum, order) => order.status !== 'Cancelled' ? sum + order.totalAmount : sum, 0);
  const totalOrdersCount = orders.length;
  const activeProductsCount = all_product.length;
  const customerCount = customers.length;

  // Filter orders for current logged-in user
  const userOrders = orders.filter(order => order.email === user.email);

  // Determine loyalty status tier
  let points = userOrders.length * 150;
  let tier = 'Bronze';
  let tierColor = '#cd7f32';
  if (userOrders.length >= 5) {
    tier = 'Gold';
    tierColor = '#d4af37';
  } else if (userOrders.length >= 2) {
    tier = 'Silver';
    tierColor = '#c0c0c0';
  }

  const handleSaveAddress = (e) => {
    e.preventDefault();
    localStorage.setItem('eleganz-saved-address', JSON.stringify(addressData));
    alert('Shipping Address saved successfully! This will pre-fill your checkout forms.');
  };

  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="profile-container">
      {/* Sidebar Section */}
      <div className="profile-sidebar shadow-sm">
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
          <span className="online-indicator"></span>
        </div>
        <h2>{user.displayName || (isAdmin ? 'Store Admin' : 'Valued Customer')}</h2>
        <p className="profile-email">{user.email}</p>
        <span className={`role-badge ${isAdmin ? 'admin' : 'customer'}`}>
          {isAdmin ? 'Administrator' : 'VIP Member'}
        </span>
        <hr />
        
        <div className="profile-navigation-tabs">
          <button 
            className={`tab-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          {!isAdmin && (
            <>
              <button 
                className={`tab-link ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                Order History ({userOrders.length})
              </button>
              <button 
                className={`tab-link ${activeTab === 'address' ? 'active' : ''}`}
                onClick={() => setActiveTab('address')}
              >
                Saved Address
              </button>
            </>
          )}
          <button 
            className={`tab-link ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Account Settings
          </button>
        </div>

        {isAdmin && (
          <>
            <hr />
            <Link to="/admin" className="admin-shortcut-btn">
              Open Admin Control Panel
            </Link>
          </>
        )}
      </div>

      {/* Main Content Area */}
      <div className="profile-content">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="tab-pane animate-fade">
            {isAdmin ? (
              <div className="admin-overview">
                <h1>Welcome Back, Administrator</h1>
                <p className="subtitle">Real-time overview of your e-commerce operations.</p>
                
                <div className="metrics-grid">
                  <div className="metric-card shadow-sm border-accent">
                    <h3>Total Sales Revenue</h3>
                    <span className="metric-value text-success">₹{totalSales.toLocaleString()}</span>
                    <p>Gross revenue from orders</p>
                  </div>
                  <div className="metric-card shadow-sm">
                    <h3>Orders Received</h3>
                    <span className="metric-value">{totalOrdersCount}</span>
                    <p>Processed orders count</p>
                  </div>
                  <div className="metric-card shadow-sm">
                    <h3>Catalog Items</h3>
                    <span className="metric-value">{activeProductsCount}</span>
                    <p>Products in store inventory</p>
                  </div>
                  <div className="metric-card shadow-sm">
                    <h3>Customers Count</h3>
                    <span className="metric-value">{customerCount}</span>
                    <p>Registered customer users</p>
                  </div>
                </div>
                
                <div className="quick-actions-box shadow-sm">
                  <h2>Admin Quick Actions</h2>
                  <div className="actions-buttons">
                    <Link to="/admin" className="btn-primary">Manage Products Catalog</Link>
                    <Link to="/admin" className="btn-secondary">Orders Fulfillment Dashboard</Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="user-overview">
                <h1>Hello, {user.displayName || 'Friend'}!</h1>
                <p className="subtitle">Welcome to your personal dashboard. Track and configure your shopping preferences.</p>
                
                {/* VIP Club loyalty Card */}
                <div className="vip-loyalty-card" style={{ borderColor: tierColor }}>
                  <div className="vip-card-glow"></div>
                  <div className="vip-card-header">
                    <span className="vip-brand-name">ELEGANZ CLUB</span>
                    <span className="vip-tier-badge" style={{ backgroundColor: tierColor }}>{tier} Tier</span>
                  </div>
                  <div className="vip-card-body">
                    <span className="vip-card-label">LOYALTY MEMBER</span>
                    <span className="vip-member-name">{user.displayName || user.email}</span>
                  </div>
                  <div className="vip-card-footer">
                    <div>
                      <span className="vip-footer-label">ACCUMULATED POINTS</span>
                      <span className="vip-footer-value">{points} Points</span>
                    </div>
                    <div>
                      <span className="vip-footer-label">MEMBER SINCE</span>
                      <span className="vip-footer-value">07 / 2026</span>
                    </div>
                  </div>
                </div>

                <div className="overview-summary-cards">
                  <div className="summary-stat-card shadow-sm">
                    <div className="card-icon">📦</div>
                    <div className="card-info">
                      <h4>Orders Placed</h4>
                      <p className="stat">{userOrders.length} Completed</p>
                      <button className="text-btn" onClick={() => setActiveTab('orders')}>View History</button>
                    </div>
                  </div>
                  <div className="summary-stat-card shadow-sm">
                    <div className="card-icon">📍</div>
                    <div className="card-info">
                      <h4>Saved Address</h4>
                      <p className="stat">{addressData.fullName ? 'Configured' : 'No address saved'}</p>
                      <button className="text-btn" onClick={() => setActiveTab('address')}>
                        {addressData.fullName ? 'Edit Address' : 'Configure Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ORDER HISTORY TAB */}
        {activeTab === 'orders' && !isAdmin && (
          <div className="tab-pane animate-fade">
            <h1>Purchase History</h1>
            <p className="subtitle">Details and tracking links for your store purchases.</p>
            
            {userOrders.length === 0 ? (
              <div className="empty-orders shadow-sm">
                <div className="empty-icon">📦</div>
                <h3>No Orders Recorded</h3>
                <p>You haven't placed any orders yet. Visit our store and start shopping!</p>
                <Link to="/" className="shop-now-btn">Explore Collections</Link>
              </div>
            ) : (
              <div className="orders-list">
                {userOrders.map((order) => (
                  <div className="order-card shadow-sm" key={order.id}>
                    <div className="order-header">
                      <div>
                        <span className="label">Order ID</span>
                        <span className="value font-bold">{order.id}</span>
                      </div>
                      <div>
                        <span className="label">Order Date</span>
                        <span className="value">{order.date}</span>
                      </div>
                      <div>
                        <span className="label">Gross Total</span>
                        <span className="value price font-bold text-success">₹{order.totalAmount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className={`status-pill ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="order-details">
                      <h4>Purchased Items</h4>
                      <div className="order-items-container">
                        {order.items.map((item, idx) => {
                          const productInfo = all_product.find(p => Number(p.id) === Number(item.id));
                          const itemImage = productInfo ? productInfo.image : '';
                          
                          return (
                            <div className="order-item" key={idx}>
                              {itemImage && (
                                <img src={itemImage} alt={item.name} className="item-thumbnail" />
                              )}
                              <div className="item-info">
                                <h5>{item.name}</h5>
                                <p>Size: <strong>{item.size}</strong> • Qty: <strong>{item.quantity}</strong></p>
                              </div>
                              <div className="item-price">
                                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="shipping-address-summary">
                        <p><strong>Shipping Details:</strong> {order.fullName}, {order.address}, {order.city}, {order.state} - {order.pincode} (Phone: {order.phone})</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED ADDRESS TAB */}
        {activeTab === 'address' && !isAdmin && (
          <div className="tab-pane animate-fade">
            <h1>Default Shipping Address</h1>
            <p className="subtitle">Configure your shipping details here. It will automatically pre-fill your checkout forms during shopping.</p>
            
            <div className="address-form-container shadow-sm">
              <form onSubmit={handleSaveAddress}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={addressData.fullName}
                    onChange={handleAddressChange}
                    placeholder="e.g. Prem Gupta" 
                    required 
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={addressData.phone}
                      onChange={handleAddressChange}
                      placeholder="e.g. +91 9876543210" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input 
                      type="text" 
                      name="pincode" 
                      value={addressData.pincode}
                      onChange={handleAddressChange}
                      placeholder="e.g. 400001" 
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Flat / House No. / Street Name</label>
                  <input 
                    type="text" 
                    name="address" 
                    value={addressData.address}
                    onChange={handleAddressChange}
                    placeholder="e.g. A-102, Silver Heights, Park Lane" 
                    required 
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City / District</label>
                    <input 
                      type="text" 
                      name="city" 
                      value={addressData.city}
                      onChange={handleAddressChange}
                      placeholder="e.g. Mumbai" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input 
                      type="text" 
                      name="state" 
                      value={addressData.state}
                      onChange={handleAddressChange}
                      placeholder="e.g. Maharashtra" 
                      required 
                    />
                  </div>
                </div>
                <button type="submit" className="save-address-btn">Save Address Details</button>
              </form>
            </div>
          </div>
        )}

        {/* SECURITY & PREFERENCES TAB */}
        {activeTab === 'security' && (
          <div className="tab-pane animate-fade">
            <h1>Account Settings</h1>
            <p className="subtitle">Manage email preferences, account logs, and notifications settings.</p>
            
            <div className="settings-module shadow-sm">
              <h2>Account Credentials</h2>
              <div className="account-details-grid">
                <div>
                  <span className="meta-label">Email Address</span>
                  <span className="meta-val">{user.email}</span>
                </div>
                <div>
                  <span className="meta-label">Provider Service</span>
                  <span className="meta-val provider-badge">Firebase Authentication</span>
                </div>
                <div>
                  <span className="meta-label">Account Verified</span>
                  <span className="meta-val verified-status">Yes (Logged In)</span>
                </div>
              </div>
            </div>

            <div className="settings-module shadow-sm">
              <h2>Subscription Notifications Preferences</h2>
              <div className="toggles-list">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Order Delivery Updates</h4>
                    <p>Get instant email alerts about your order shipping and delivery status.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifications.orderUpdates} 
                    onChange={() => handleNotificationToggle('orderUpdates')} 
                  />
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>SMS Delivery Alerts</h4>
                    <p>Receive SMS text alerts on your registered phone number when order departs.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifications.smsAlerts} 
                    onChange={() => handleNotificationToggle('smsAlerts')} 
                  />
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Weekly Product Newsletter</h4>
                    <p>Stay up to date with new product collections drop every Thursday.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifications.weeklyNewsletter} 
                    onChange={() => handleNotificationToggle('weeklyNewsletter')} 
                  />
                </div>
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Personalized Recommendations</h4>
                    <p>Let AI suggest sizing and design matching based on purchase behavior.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifications.recommendations} 
                    onChange={() => handleNotificationToggle('recommendations')} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
