import React, { useEffect, useState } from 'react';
import Product from '../Products/Product';
import Spinner from '../UI/LoadingSpinner';
import MessageError from '../UI/Error';
import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating';
import { useDispatch, useSelector } from 'react-redux';
import {ProductDetails} from '../../store/actions/ProductActions/products';
const ProductScreen =(props)=>{
    const [Qty ,SetQty ]    =   useState(1)
    const productId =  props.match.params.id
 const productDetails =useSelector((state)=> state.productDetails);
 const dispatch =useDispatch();
 const {product ,Error , loading} = productDetails;
    
 useEffect(()=>{
     dispatch( ProductDetails(productId))
 },[productId,dispatch])
 console.log(productId,product)
    //console.log(props.params.match.id)
    // if(!product)
    // {
    //     <div>Product not found</div>
    // }
    const AddtoCartHandler=()=>{
        props.history.push(`/cart/${productId}?Qty=${Qty}`)
    }
    console.log("image",productDetails.description)
       return (
        <div>
        { loading ? (<Spinner asOverlay/> 
        )
        : 
        Error ? (  <MessageError variant ="danger" >{Error}</MessageError>):
        <div>
           {/* <Link to ='/'> Home </Link> */}
    <div className='row top'>
        <div className = 'col-2'>
            <img className='large'
             src={product.image} 
             alt={product.name}/>
        </div>
        <div className="col-1">
        <ul>
            <li>
                <h1>{product.name}</h1>
            </li>
            <li>
                <Rating 
                rating ={product.rating} 
                numReviews={product.numReviews}/>
            </li>
            
            <li> Price : {product.price}</li>
            
            <li>
                Description : {product.description}
            </li>

        </ul>
        </div>
        <div    className='col-1'>
            <div    className="card card-body">
        <ul>
            <li>
                <div className='row'>
                    <div>Price</div>
                    <div   className="price">
                        {product.price} Rs.
                    </div>
                </div>
            </li>
            <li>
                <div className='row'>
            <div >Status  </div>
            <div>
                {
                    product.countInStock    > 0?(
                        <span className='success'> In Stock</span>
                    ) :(
                        <span className='danger'> Out of Stock</span>
                    )
                }
            </div>
            </div>
            </li>
            {
                product.countInStock > 0    &&  (
                    <div>
                        <li>
                            <div className = 'row'>
                                <div>Quantity</div>
                                <div>
                                    <select className='select' value={Qty} onChange={e =>  SetQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map( //This function will return an array from 0-4 if the countinStock=5
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                                    </select>
                                </div>
                            </div>
                        </li>
                     <li>
                    <button
                    onClick={AddtoCartHandler}
                     className="primary block">Add to Cart</button>
                   </li>
                   </div>
                   
                ) 
            }
           
        </ul>
</div>
</div>
</div>  
</div>  
}</div>)}
    
    export default ProductScreen;