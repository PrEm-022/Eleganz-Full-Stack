import React, { useContext, useState, useEffect } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Default");

  // Reset filters when changing category pages
  useEffect(() => {
    setPriceFilter("All");
    setSortOption("Default");
  }, [props.category]);

  // Filter products by category and selected price range
  let displayedProducts = all_product
    .filter(item => props.category === item.category)
    .filter(item => {
      if (priceFilter === "All") return true;
      if (priceFilter === "Under ₹1000") return item.new_price < 1000;
      if (priceFilter === "₹1000 - ₹2000") return item.new_price >= 1000 && item.new_price <= 2000;
      if (priceFilter === "Over ₹2000") return item.new_price > 2000;
      return true;
    });

  // Sort products dynamically
  if (sortOption === "Price: Low to High") {
    displayedProducts.sort((a, b) => a.new_price - b.new_price);
  } else if (sortOption === "Price: High to Low") {
    displayedProducts.sort((a, b) => b.new_price - a.new_price);
  }

  return (
    <div className='shop-category'>
      <div className="shopcategory-banners">
        <img src={props.banner} alt="" />
      </div>
      
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {displayedProducts.length}</span> out of {all_product.filter(item => props.category === item.category).length} products
        </p>
        <div className="shopcategory-filters">
          <select 
            value={priceFilter} 
            onChange={(e) => setPriceFilter(e.target.value)} 
            className="shopcategory-filter-select"
          >
            <option value="All">All Prices</option>
            <option value="Under ₹1000">Under ₹1000</option>
            <option value="₹1000 - ₹2000">₹1000 - ₹2000</option>
            <option value="Over ₹2000">Over ₹2000</option>
          </select>
          <select 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)} 
            className="shopcategory-filter-select"
          >
            <option value="Default">Sort By: Default</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="shopcategory-products">
          {displayedProducts.map((item, i) => (
             <Item 
               key={i} 
               id={item.id} 
               name={item.name} 
               image={item.image} 
               new_price={item.new_price} 
               old_price={item.old_price} 
             />
          ))}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory
