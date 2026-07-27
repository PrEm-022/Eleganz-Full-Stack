import React, { useContext } from 'react'
import './NewCollections.css'
import new_collections1 from '../Assets/NewCollections1'
import new_collections2 from '../Assets/NewCollections2'
import { ShopContext } from '../../Context/ShopContext'
import Item from '../Item/Item'

const NewCollections = () => {
  const { all_product } = useContext(ShopContext);

  const getLiveItems = (staticList) => {
    return staticList.map(p => {
      const liveProduct = all_product.find(item => Number(item.id) === Number(p.id));
      return liveProduct || p;
    });
  };

  const collections1 = getLiveItems(new_collections1);
  const collections2 = getLiveItems(new_collections2);

  return (
    <div className='new-collections'>
      <h1>NEW ARRIVALS</h1>
      <hr />

      <div className="collections1">
        {collections1.map((item,i)=>{
            return<Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
      <div className="collections2">
        {collections2.map((item,i)=>{
            return<Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>

    </div>
  )
}

export default NewCollections
