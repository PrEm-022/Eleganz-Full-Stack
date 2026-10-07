import React, { useContext, useState, useEffect } from 'react';
import './CSS/Checkout.css';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, all_product, getTotalCartAmount, clearCart, addOrder, user } = useContext(ShopContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'UPI'
  });

  useEffect(() => {
    // 1. Pre-fill email from logged in user if available
    if (user && user.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }

    // 2. Pre-fill shipping address from saved profile details if available
    const savedAddress = localStorage.getItem('eleganz-saved-address');
    if (savedAddress) {
      try {
        const parsed = JSON.parse(savedAddress);
        setFormData(prev => ({
          ...prev,
          fullName: prev.fullName || parsed.fullName || '',
          phone: prev.phone || parsed.phone || '',
          address: prev.address || parsed.address || '',
          city: prev.city || parsed.city || '',
          state: prev.state || parsed.state || '',
          pincode: prev.pincode || parsed.pincode || '',
        }));
      } catch (e) {
        console.error("Error loading saved address inside checkout", e);
      }
    }
  }, [user]);

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      alert('Please fill out all required shipping details.');
      return;
    }
    if (getTotalCartAmount() === 0) {
      alert('Your cart is empty.');
      return;
    }

    // Build dynamic order items list
    const orderItems = [];
    Object.keys(cartItems).forEach((key) => {
      if (cartItems[key] > 0) {
        const [itemId, size] = key.split('-');
        const product = all_product.find(p => Number(p.id) === Number(itemId));
        if (product) {
          orderItems.push({
            id: product.id,
            name: product.name,
            size: size,
            quantity: cartItems[key],
            price: product.new_price
          });
        }
      }
    });

    addOrder({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod,
      items: orderItems,
      totalAmount: getTotalCartAmount()
    });

    setIsOrderPlaced(true);
  };

  const handleContinueShopping = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className='checkout-page'>
      {isOrderPlaced && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h1>Order Placed Successfully!</h1>
            <p className="order-message">Thank you for shopping with Eleganz. Your order has been registered.</p>
            
            <div className="shipping-summary">
              <h3>Shipping Summary</h3>
              <p><strong>Deliver To:</strong> {formData.fullName}</p>
              <p><strong>Address:</strong> {formData.address}, {formData.city} - {formData.pincode}</p>
              <p><strong>Estimated Delivery:</strong> 3-5 Working Days</p>
            </div>
            
            <button className="continue-btn" onClick={handleContinueShopping}>Continue Shopping</button>
          </div>
        </div>
      )}

      <div className="checkout-container">
        <div className="checkout-left">
          <div className="checkout-card">
            <h2>Shipping Details</h2>
            <form onSubmit={handlePlaceOrder}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  placeholder="" 
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="" 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Street Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="" 
                  required 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={formData.city} 
                    onChange={handleChange} 
                    placeholder="" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input 
                    type="text" 
                    name="state" 
                    value={formData.state} 
                    onChange={handleChange} 
                    placeholder="" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Pincode / ZIP</label>
                  <input 
                    type="text" 
                    name="pincode" 
                    value={formData.pincode} 
                    onChange={handleChange} 
                    placeholder="6 digit [0-9] PIN code" 
                    required 
                  />
                </div>
              </div>

              <h2 className="payment-heading">Payment Method</h2>
              <div className="payment-options">
                <label className={`payment-option ${formData.paymentMethod === 'UPI' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="UPI" 
                    checked={formData.paymentMethod === 'UPI'} 
                    onChange={handleChange} 
                  />
                  <span>UPI / QR Code</span>
                </label>
                <label className={`payment-option ${formData.paymentMethod === 'Card' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Card" 
                    checked={formData.paymentMethod === 'Card'} 
                    onChange={handleChange} 
                  />
                  <span>Credit / Debit Card</span>
                </label>
                <label className={`payment-option ${formData.paymentMethod === 'COD' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="COD" 
                    checked={formData.paymentMethod === 'COD'} 
                    onChange={handleChange} 
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
              </div>

              <button type="submit" className="place-order-btn">Place Order (₹{getTotalCartAmount()})</button>
            </form>
          </div>
        </div>

        <div className="checkout-right">
          <div className="checkout-card order-summary-card">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {Object.keys(cartItems).map((key) => {
                if (cartItems[key] > 0) {
                  const [itemId, size] = key.split('-');
                  const product = all_product.find(p => p.id === Number(itemId));
                  if (product) {
                    return (
                      <div className="summary-item" key={key}>
                        <img src={product.image} alt={product.name} />
                        <div className="summary-item-info">
                          <h4>{product.name}</h4>
                          <p className="summary-item-meta">Size: <span>{size}</span> | Qty: <span>{cartItems[key]}</span></p>
                        </div>
                        <p className="summary-item-price">₹{product.new_price * cartItems[key]}</p>
                      </div>
                    );
                  }
                }
                return null;
              })}
            </div>
            
            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{getTotalCartAmount()}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span className="free-shipping">Free</span>
              </div>
              <hr />
              <div className="total-row grand-total">
                <span>Total</span>
                <span>₹{getTotalCartAmount()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
