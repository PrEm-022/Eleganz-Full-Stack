import React, { useContext } from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'

const Popular = () => {
  const { all_product } = useContext(ShopContext);

  const popular_products = data_product.map(p => {
    const liveProduct = all_product.find(item => Number(item.id) === Number(p.id));
    return liveProduct || p;
  });

  return (
    <div className='popular'>
      <h1>POPULAR STYLES FOR YOU</h1>
      <hr />
      <div className="popular-item">
        {popular_products.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Popular
