import Axios from 'axios';
import { SignIn } from '../Signin/Signin';
import { ORDER_DETAILS_REQUEST,ORDER_DETAILS_FAIL, ORDER_FAIL,ORDER_DETAILS_SUCCESS, ORDER_REQUEST, ORDER_SUCCESS, ORDER_USER_REQUEST, ORDER_USER_SUCCESS } from './actions';
import {CART_EMPTY} from '../CartActions/actions';
// import {SignIn} from '../Signin/Signin';

export const OrderRequest = (order)=> async(dispatch, getState)=>{
    dispatch({ type: ORDER_REQUEST, payload: order });
    try {
      const {
        Signin: { userInfo },
      } = getState();
      console.log("order", order);
      console.log("Orderid", order.id)
      const { data } = await Axios.post('/api/orders', order, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        },
      });
      console.log("DATA", data)
      dispatch({ type: ORDER_SUCCESS, payload: data.order });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem('cartItems');
    } catch (error) {
      dispatch({
        type: ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }

}

export const OrderDetailsAction = (orderId)=> async(dispatch,getState)=>{
 dispatch({
   type:ORDER_DETAILS_REQUEST,
   payload:orderId
 })
 console.log("payload" , orderId)
 
  try{
    const {
      Signin: { userInfo },
    } = getState();
    const {data} = await  Axios.get(`/api/orders/${orderId}`,{
    headers: {
      Authorization: 'Bearer ' + userInfo.token
    }})
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload:data
    })
  }catch(error)
  {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}


export const UserOrders = ()=>async(dispatch,getState)=>{
  dispatch({
    type: ORDER_USER_REQUEST
  })
  try{
    const {
      Signin: { userInfo },
    } = getState();
  const {data } = await Axios.get('/api/orders/mine',
  {
    headers:{
      Authorization: 'Bearer ' + userInfo.token
    }
  }
  )
  dispatch({type:ORDER_USER_SUCCESS , payload:data})
}catch(error)
{
  dispatch({
    type: ORDER_DETAILS_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
}

}