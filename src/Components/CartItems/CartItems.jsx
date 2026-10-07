import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross.png'
import { useNavigate } from 'react-router-dom'


const CartItems = () => {

    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext)
    const navigate = useNavigate();


  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Size</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {Object.keys(cartItems).map((key)=>{
            if (cartItems[key] > 0) {
                const [itemId, size] = key.split('-');
                const product = all_product.find(p => Number(p.id) === Number(itemId));
                if (product) {
                    return (
                        <div key={key}>
                            <div className="cartitems-format cartitems-format-main ">
                                <img src={product.image} alt="" className='carticon-product-icon' />
                                <p className='cartitems-product-name'>{product.name}</p>
                                <p>₹{product.new_price}</p>
                                <span className='cartitems-size'>{size}</span>
                                <button className='cartitems-quantity'>{cartItems[key]}</button>
                                <p>₹{product.new_price*cartItems[key]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(itemId, size)}} alt="" />
                            </div>
                            <hr />
                        </div>
                    )
                }
            }
            return null;
        })}
        
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>₹{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>₹{getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button onClick={() => {
                  if (localStorage.getItem('auth-token')) {
                    navigate('/checkout');
                  } else {
                    navigate('/login');
                  }
                }}>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitem-promobox">
                    <input type="text" placeholder='Promo Code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default CartItems
