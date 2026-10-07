import React, { useState, useContext, useEffect } from 'react';
import './CSS/Admin.css';
import { ShopContext } from '../Context/ShopContext';
import remove_icon from '../Components/Assets/cart_cross.png';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { 
    all_product, 
    orders, 
    customers, 
    addProduct, 
    removeProductFromCatalog, 
    updateOrderStatus,
    user
  } = useContext(ShopContext);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (user && user.email !== 'admin123@elegence.com') {
      navigate('/');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState('dashboard');

  // Add Product Form State
  const [productData, setProductData] = useState({
    name: '',
    category: 'Men',
    image: '',
    new_price: '',
    old_price: '',
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productData.name || !productData.new_price || !productData.old_price) {
      alert('Please fill out all required fields');
      return;
    }

    const imgPath = productData.image.trim() || '/src/Components/Assets/product_1.png';

    addProduct({
      name: productData.name,
      category: productData.category,
      image: imgPath,
      new_price: Number(productData.new_price),
      old_price: Number(productData.old_price),
    });

    alert('Product added successfully!');
    setProductData({
      name: '',
      category: 'Men',
      image: '',
      new_price: '',
      old_price: '',
    });
    setActiveTab('list-products');
  };

  // Calculations for dashboard
  const totalSales = orders.reduce((sum, order) => order.status !== 'Cancelled' ? sum + order.totalAmount : sum, 0);
  const totalOrdersCount = orders.length;
  const activeProductsCount = all_product.length;
  const customerCount = customers.length;
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalSales / totalOrdersCount) : 0;

  return (
    <div className='admin-panel'>
      <div className="admin-sidebar">
        <h2>Admin Portal</h2>
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard Overview
        </button>
        <button 
          className={activeTab === 'add-product' ? 'active' : ''} 
          onClick={() => setActiveTab('add-product')}
        >
          Add Product
        </button>
        <button 
          className={activeTab === 'list-products' ? 'active' : ''} 
          onClick={() => setActiveTab('list-products')}
        >
          List Products
        </button>
        <button 
          className={activeTab === 'manage-orders' ? 'active' : ''} 
          onClick={() => setActiveTab('manage-orders')}
        >
          Manage Orders ({orders.length})
        </button>
        <button 
          className={activeTab === 'customers' ? 'active' : ''} 
          onClick={() => setActiveTab('customers')}
        >
          Customers ({customers.length})
        </button>
      </div>

      <div className="admin-content">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-view">
            <h1>Business Dashboard</h1>
            <div className="metrics-grid">
              <div className="metric-card shadow-sm">
                <span className="metric-title">Total Revenue</span>
                <span className="metric-value text-success">₹{totalSales.toLocaleString()}</span>
                <span className="metric-sub">Online Sales</span>
              </div>
              <div className="metric-card shadow-sm">
                <span className="metric-title">Orders Received</span>
                <span className="metric-value">{totalOrdersCount}</span>
                <span className="metric-sub">Pending & Completed</span>
              </div>
              <div className="metric-card shadow-sm">
                <span className="metric-title">Average Order Value</span>
                <span className="metric-value">₹{averageOrderValue.toLocaleString()}</span>
                <span className="metric-sub">Per Basket Spent</span>
              </div>
              <div className="metric-card shadow-sm">
                <span className="metric-title">Catalog Size</span>
                <span className="metric-value">{activeProductsCount}</span>
                <span className="metric-sub">Active Items</span>
              </div>
            </div>

            <div className="dashboard-row">
              <div className="dashboard-chart-card">
                <h3>Monthly Sales Performance (INR)</h3>
                <div className="bar-chart">
                  <div className="chart-bar-group">
                    <div className="chart-bar" style={{ height: '35%' }}><span>₹35k</span></div>
                    <span className="chart-label">Feb</span>
                  </div>
                  <div className="chart-bar-group">
                    <div className="chart-bar" style={{ height: '48%' }}><span>₹48k</span></div>
                    <span className="chart-label">Mar</span>
                  </div>
                  <div className="chart-bar-group">
                    <div className="chart-bar" style={{ height: '65%' }}><span>₹65k</span></div>
                    <span className="chart-label">Apr</span>
                  </div>
                  <div className="chart-bar-group">
                    <div className="chart-bar" style={{ height: '58%' }}><span>₹58k</span></div>
                    <span className="chart-label">May</span>
                  </div>
                  <div className="chart-bar-group">
                    <div className="chart-bar active" style={{ height: '80%' }}><span>₹80k</span></div>
                    <span className="chart-label">Jun</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-orders-card">
                <h3>Recent Orders Activity</h3>
                <div className="activity-list">
                  {orders.slice(0, 3).map((order) => (
                    <div className="activity-item" key={order.id}>
                      <div className="activity-details">
                        <h4>{order.fullName}</h4>
                        <p>{order.date} • {order.items.length} items</p>
                      </div>
                      <div className="activity-price">
                        <span>₹{order.totalAmount}</span>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADD PRODUCT TAB */}
        {activeTab === 'add-product' && (
          <div className="admin-card add-product-card">
            <h1>Add New Product</h1>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Product Title</label>
                <input 
                  type="text" 
                  name="name" 
                  value={productData.name} 
                  onChange={handleChange} 
                  placeholder="e.g. Premium Wool Varsity Jacket" 
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={productData.category} onChange={handleChange}>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kid">Kid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Image Asset Path</label>
                  <input 
                    type="text" 
                    name="image" 
                    value={productData.image} 
                    onChange={handleChange} 
                    placeholder="e.g. /src/Components/Assets/product_1.png" 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Old Price (₹)</label>
                  <input 
                    type="number" 
                    name="old_price" 
                    value={productData.old_price} 
                    onChange={handleChange} 
                    placeholder="e.g. 120" 
                    required
                  />
                </div>

                <div className="form-group">
                  <label>New Price (₹)</label>
                  <input 
                    type="number" 
                    name="new_price" 
                    value={productData.new_price} 
                    onChange={handleChange} 
                    placeholder="e.g. 95" 
                    required
                  />
                </div>
              </div>

              <button type="submit" className="admin-submit-btn">Add Product to Store</button>
            </form>
          </div>
        )}

        {/* LIST PRODUCTS TAB */}
        {activeTab === 'list-products' && (
          <div className="admin-card list-products-card">
            <h1>Store Catalog</h1>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Old Price</th>
                    <th>New Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {all_product.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img className="table-thumbnail" src={item.image} alt={item.name} />
                      </td>
                      <td className="table-title">{item.name}</td>
                      <td>
                        <span className="table-category-badge">{item.category}</span>
                      </td>
                      <td className="old-price-column">₹{item.old_price}</td>
                      <td className="new-price-column">₹{item.new_price}</td>
                      <td>
                        <img 
                          className="table-delete-icon" 
                          src={remove_icon} 
                          alt="Delete" 
                          onClick={() => removeProductFromCatalog(item.id)} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MANAGE ORDERS TAB */}
        {activeTab === 'manage-orders' && (
          <div className="admin-card manage-orders-card">
            <h1>Order Manager</h1>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items Purchased</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="font-bold">{order.id}</td>
                      <td>
                        <div className="customer-info">
                          <span>{order.fullName}</span>
                          <span className="customer-sub">{order.phone}</span>
                        </div>
                      </td>
                      <td>
                        <div className="items-summary-list">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="order-summary-item-desc">
                              • {it.name} ({it.size}) x {it.quantity}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="new-price-column">₹{order.totalAmount.toLocaleString()}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div className="status-action-buttons">
                          {order.status === 'Pending' && (
                            <button 
                              className="action-btn ship-btn"
                              onClick={() => updateOrderStatus(order.id, 'Shipped')}
                            >
                              Ship
                            </button>
                          )}
                          {order.status === 'Shipped' && (
                            <button 
                              className="action-btn deliver-btn"
                              onClick={() => updateOrderStatus(order.id, 'Delivered')}
                            >
                              Deliver
                            </button>
                          )}
                          {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                            <button 
                              className="action-btn cancel-btn"
                              onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CUSTOMERS TAB */}
        {activeTab === 'customers' && (
          <div className="admin-card customers-card">
            <h1>Customer Logs ({customerCount})</h1>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Phone</th>
                    <th>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id}>
                      <td>#{c.id}</td>
                      <td className="font-bold">{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
