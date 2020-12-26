import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import { Link } from 'react-router-dom';
import { OrderDetailsAction } from '../../store/actions/Order/Order';
import Spinner from '../UI/LoadingSpinner';
import MessageBox from '../UI/Error';


const OrderDetail =(props)=>{

const orderId =  props.match.params.id;
const dispatch = useDispatch();
const Order= useSelector((state)=>state.OrderDetails);
const{error,loading,order}  = Order;
  useEffect(() => {
   dispatch(OrderDetailsAction(orderId))
  }, [dispatch, orderId]);
    return loading ? (<Spinner/>):
    error ?(<MessageBox variant = 'danger'>{error}</MessageBox>)
    :
    (
        <div>
       <h1>Order : {order._id}</h1>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong> {order.Shippinginfo.fullname} <br />
                      <strong>Address: </strong> {order.Shippinginfo.Address},
                      {order.Shippinginfo.City}, {order.Shippinginfo.PostalCode}
                      ,{order.Shippinginfo.Country}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong> {order. paymentMethod}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {order.orderItems.map((item) => (
                        <li key={item.product}>
                          <div className="row">
                            <div>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="small"
                              ></img>
                            </div>
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
                      <div>{order.itemsPrice.toFixed(0)}rs.</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>{order.shippingPrice.toFixed(0)}rs.</div>
                    </div>
                  </li>
                
                  <li>
                    <div className="row">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>{order.totalPrice.toFixed(0)}rs.</strong>
                      </div>
                    </div>
                  </li>
               
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
}

export default OrderDetail;