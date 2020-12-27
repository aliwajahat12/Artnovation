import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import { Link } from 'react-router-dom';
import { ORDER_RESET } from '../../store/actions/Order/actions';
import Spinner from '../UI/LoadingSpinner';
import MessageBox from '../UI/Error';
import {OrderRequest} from '../../store/actions/Order/Order';





const PlaceOrder =(props)=>{

const cart = useSelector((state)=>state.Cart);
const dispatch = useDispatch();
const placeOrderHandler=(e)=>{
    e.preventDefault()
    
   
    // dispatch(OrderRequest({shippingAddress:cart.Shippinginfo,
    //   itemsPrice:cart.itemsPrice,
    //   shippingPrice:cart.shippingPrice,
    //   totalPrice:cart.totalPrice,
    //    orderItems:cart.CartItems}))
    dispatch(OrderRequest({...cart,
       orderItems:cart.CartItems}))
    console.log("Proceed to delivery")
    
 }
const Order = useSelector((state)=> state.Order);

const {success,loading ,order,error} = Order;

const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
 
cart.itemsPrice = toPrice(    //The new variable is assigned in the cart
cart.CartItems.reduce((a, c) => a + c.Qty * c.price, 0)

  );

  console.log(cart.itemsPrice)
  console.log(cart)  

  cart.shippingPrice= cart.itemsPrice>1000 ? toPrice(0) : toPrice(100);
  cart.totalPrice= cart.itemsPrice + cart.shippingPrice;
  console.log("Total",cart.totalPrice)
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      console.log("ORder id ",order._id)
      dispatch({ type: ORDER_RESET });
    }
  }, [dispatch, order, props.history, success]);
    return (
        <div>
          <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong> {cart.Shippinginfo.fullname} <br />
                      <strong>Address: </strong> {cart.Shippinginfo.Address},
                      {cart.Shippinginfo.City}, {cart.Shippinginfo.PostalCode}
                      ,{cart.Shippinginfo.Country}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong> {cart.Payment}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {cart.CartItems.map((item) => (
                        <li key={item.product}>
                          <div className="row">
                            {/* <div>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="small"
                              ></img>
                            </div> */}
                            <div className='min-30' >
                              <Link to={`/products/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>
    
                            <div>
                              {item.Qty} x {item.price}rs = {item.Qty * item.price}rs
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>{cart.itemsPrice.toFixed(0)}rs.</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>{cart.shippingPrice.toFixed(0)}rs.</div>
                    </div>
                  </li>
                
                  <li>
                    <div className="row">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>{cart.totalPrice.toFixed(0)}rs.</strong>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={placeOrderHandler}
                      className="primary block"
                      disabled={cart.CartItems.length === 0}
                    >
                      Place Order
                    </button>
                  </li>
                  {loading && <Spinner/>}
                  {error && <MessageBox variant='danger'>{error}</MessageBox>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
}

export default PlaceOrder