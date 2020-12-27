import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Checkout from './CheckoutSteps';
import {PaymentRequest} from '../../store/actions/CartActions/Cart';


const Payment=(props)=>{

    const dispatch= useDispatch();
    const [Payment , SetPayment]=useState('Cash On Delivery')

    const SubmitHandler=(e)=>{
        e.preventDefault();
        dispatch(PaymentRequest(Payment))
        props.history.push('/placeorder')
    }
    return(
    <div>
    <Checkout step1 step2 step3/>
    <form className="form" onSubmit={SubmitHandler}>
      <div>
        <h1>Payment Method</h1>
      </div>
     
      <div>
        <div>
          <input
            type="radio"
            id="cod"
            value="Cash on Delivery"
            name="paymentMethod"
            required
            checked
            onChange={(e) => SetPayment(e.target.value)}
          ></input>
          <label htmlFor="cod">Cash on Delivery</label>
        </div>
      </div>
     
     
      <div>
        <div>
          <input
            type="radio"
            id="paypal"
            value="PayPal"
            name="paymentMethod"
            required
         
            onChange={(e) => SetPayment(e.target.value)}
          ></input>
          <label htmlFor="paypal">PayPal</label>
        </div>
      </div>
     
      <div>
        <label />
        <button className="primary" type="submit">
          Continue
        </button>
      </div>
    </form>
  </div>
);
}

export default Payment;