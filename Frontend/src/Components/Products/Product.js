import React from 'react';
import Rating from '../Rating/Rating';
import {Link} from 'react-router-dom'
const Product=(props)=>{
    const {product}= props
    return(
        <div>
     <div key = {product._id} className ='card'>
      <Link to={`/products/${product._id}`}>
      
        <img 
        className = 'medium'
        src={product.image} 
        alt={product.name}/>
    </Link>
     <div className = 'card-body'>
     <Link to={`/products/${product._id}`}>
            <h2>{product.name} </h2>  </Link>
        <Rating rating={product.rating}  numReviews={product.numReviews} />

     <div className = 'price'>{product.price}pkr</div>
        </div>
     </div>
        </div>
    )
}

export default Product;