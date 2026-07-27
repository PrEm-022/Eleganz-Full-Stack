import React, { useContext } from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/data'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'

const RelatedProducts = () => {
  const { all_product } = useContext(ShopContext);

  const related = data_product.map(p => {
    const liveProduct = all_product.find(item => Number(item.id) === Number(p.id));
    return liveProduct || p;
  });

  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
