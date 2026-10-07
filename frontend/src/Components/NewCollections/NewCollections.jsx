import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import new_collections1 from '../Assets/NewCollections1';
import new_collections2 from '../Assets/NewCollections2';
import Item from '../Item/Item';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([...new_collections1, ...new_collections2]);

  useEffect(() => {
    fetch(`${API_URL}/newcollections`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNewCollection(data);
        }
      })
      .catch((err) => console.log("Using fallback new collections"));
  }, []);

  return (
    <div className='new-collections'>
      <h1>NEW ARRIVALS</h1>
      <hr />

      <div className="collections1">
        {newCollection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
