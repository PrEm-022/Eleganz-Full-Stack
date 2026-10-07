import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star.png'
import star_dull_icon from '../Assets/dull_star.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('M');
    
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
         <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
         </div>
         <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" />
         </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(198)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-old-price">₹{product.old_price}</div>
            <div className="productdisplay-right-new-price">₹{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
        Stay stylishly with our Chic Denim Fur Jacket, perfect fusion of edgy denim and comfort. A 
        classic medium-wash denim complemented by a plush faux fur lining extending to collar and cuffs.
        </div>
        <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <div 
                    key={size} 
                    className={selectedSize === size ? 'active' : ''} 
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
            </div>
            <button onClick={()=>{addToCart(product.id, selectedSize)}}>ADD TO CART</button>
            <p className="productdisplay-right-category"><span>Category: </span>Men, Shirt, Denim, Furry </p>
            <p className="productdisplay-right-category"><span>Tags: </span>Modern, Latest, Stylish </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay
