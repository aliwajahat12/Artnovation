import React, { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { ShippingAddress } from '../../store/actions/CartActions/Cart';
import Checkout from './CheckoutSteps';

const Shipping = (props)=>{
   
    const cart= useSelector((state)=>state.Cart);
    const {Shippinginfo}= cart;
    console.log("Shippinginfo", Shippinginfo);
    const signin= useSelector((state)=>state.Signin);
    const{userInfo}= signin;
    if(!userInfo)
    {
        props.history.push('/signin')
    }


   const [fullname , Setfullname]   =   useState(Shippinginfo.fullname)
   const [Country , SetCountry]   =   useState(Shippinginfo.Country)
   const [City , SetCity]   =   useState(Shippinginfo.City)
   const [Address ,SetAddress]   =   useState(Shippinginfo.Address)
   const [PostalCode ,SetPostalCode]   =   useState(Shippinginfo.PostalCode)
   const dispatch= useDispatch();
   const submitHandler=(e)=>{
       e.preventDefault();
       dispatch(ShippingAddress({fullname,Address,Country,City,PostalCode}));
       props.history.push('/payment')
    }
  
    return (
        <div>
        <Checkout step1 step2/>
        <form className = 'form' onSubmit={submitHandler}>
        <div className='H1'>
            <h1>Shipping</h1>
        </div>
        <div>
        <label htmlFor='Full Name'> Full Name </label>
        <input 
        type='text'
         id='fullname'
          placeholder='Enter your Full name'
          value ={fullname} 
          onChange={(e)=>Setfullname(e.target.value)} 
          required>
        </input>
        </div>
        
        <div>
        <label htmlFor='Address'> Address </label>
        <input 
        type='text'
         id='Address'
          placeholder='Enter your Full Address'
          value ={Address} 
          onChange={(e)=>SetAddress(e.target.value)} 
          required>
        </input>
        </div>

        <div>
        <label htmlFor='Postal Code'> Postal Code </label>
        <input 
        type='text'
         id='PostalCode'
          placeholder='Enter your Postal Code'
          value ={PostalCode} 
          onChange={(e)=>SetPostalCode(e.target.value)} 
          required>
        </input>
        </div>

        <div>
        <label htmlFor='City'> City </label>
        <input 
        type='text'
         id='City'
          placeholder='Enter your City'
          value ={City} 
          onChange={(e)=>SetCity(e.target.value)} 
          required>
        </input>
        </div>

        <div>
        <label htmlFor='Country'> Country </label>
        <input 
        type='text'
         id='Country'
          placeholder='Enter your Country'
          value ={Country} 
          onChange={(e)=>SetCountry(e.target.value)} 
          required>
        </input>
        </div>

        <div>
            <label></label>
            <button className ='primary' type ='submit'> Continue</button>
        </div>

        </form>
        </div>
    )
}
export default Shipping;