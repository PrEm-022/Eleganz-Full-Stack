import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-navbox">Description</div>
        <div className="descriptionbox-navbox fade">Reviews (198)</div>
      </div>
      <div className="descriptionbox-description">
        <p>An e-commerce website is an online destination where buyers shop for goods and sellers offer products 
            and services. It’s the hub of information about a company and what they sell. On an eCommerce website, 
            you’ll find product listings, eCommerce blog content, company history, and contact information.</p>
            <p>
            E-Commerce websites can be created by a specialized agency, web developer, or your own skills. The 
            size and needs of your site play a major part in which choice is best. 
            </p>
      </div>
    </div>
  )
}

export default DescriptionBox
