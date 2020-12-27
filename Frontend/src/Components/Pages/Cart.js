import React, { useEffect } from 'react';
import { CartAddItem, CartRemoveItem } from '../../store/actions/CartActions/Cart';
import {useDispatch, UseDispatch, useSelector} from 'react-redux';
import MessageError from '../UI/Error';
import { Link } from 'react-router-dom';


const Cart = (props)=>{
    const dispatch=useDispatch();
    const productId = props.match.params.id;
    const Qty   =   props.location.search  //This will search for the qty in the url
     ?   Number(props.location.search.split('=')[1])  //this will get the value of qty which is after = sign in the url
     :   1;
     //We want to check if the productu id exist then add to cart that product
    
     const redirect = props.location.search
     ? props.location.search.split('=')[1]
     : '/';
    
     const Cart= useSelector((state)=>state.Cart)
     const {CartItems}= Cart; 
     useEffect(()=>{
         if(productId)
         {
         dispatch(CartAddItem(productId,Qty))
     }},[dispatch,productId,Qty])

     const removeCartHandler=(id)=>{
         dispatch(CartRemoveItem(id))
         console.log('Deleted',id)
     }
     const CheckoutHandler=()=>{
      props.history.push('/signin?redirect=shipping');
     }


    return (
        <div className='row top'>
            <div className='col-2'>
                <h1>Shopping Cart</h1>
                {
                    CartItems.length === 0 
                 ? (<MessageError> Cart is Empty
                 <Link to = '/'>  Go To Shopping </Link>
                 </MessageError>
                 ): 
                 (
                     <ul>
                       {CartItems.map((item)=> 
                       <li key={item.product}>
                           <div className='row'>
                               <div>
                                   <img 
                                   src={item.image}
                                   alt={item.name}
                                   className='small'>

                                   </img>
                               </div>
                               <div className='min-30'>
                                   <Link to={`/product/${item.product}`}>{item.name}</Link>
                               </div>
                               <div>
                                   <select value={item.Qty} onChange={(e)=>dispatch(CartAddItem(item.product, Number(e.target.value)))}>

                                {[...Array(item.countInStock).keys()].map( //This function will return an array from 0-4 if the countinStock=5
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                                    </select>
                               </div>
                               <div>
                                   {item.price}pkr
                               </div>
                               <div>
                                   <button type='button'
                                   onClick={()=>removeCartHandler(item.product)}
                                   > 
                                    Delete
                                   </button>
                               </div>
                           </div>

                       </li>
                       )}  
                     </ul>
                 )
                }
            </div>
            <div className="col-1">
        <div className="card card-bodyb">
          <ul>
            <li>
              <h2>
                Subtotal ({CartItems.reduce((a, c) => a + c.Qty, 0)} items) : $  
                {CartItems.reduce((a, c) => a + c.price * c.Qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={CheckoutHandler}
                className="primary block"
                disabled={CartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    
      
        </div>
    )
}
export default Cart;