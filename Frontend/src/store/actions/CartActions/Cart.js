
import { CART_ADD_ITEMS ,CART_DELETE_ITEM , PAYMENT_METHOD, SHIPPING_ADDRESS} from './actions';
import Axios from 'axios';


export const CartAddItem=(productId,Qty)=>async(dispatch,getState)=>{   //we are getting getState to update the cart
    const {data}= await Axios(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEMS,
        payload:
        {
            name: data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            product:data._id,
            Qty
        }
    })
    localStorage.setItem('CartItems',JSON.stringify(getState().Cart.CartItems))
}



export const CartRemoveItem =   (productId)=> async(dispatch,getState)=>{
    dispatch({
        type:CART_DELETE_ITEM,
        payload:productId
    })
    localStorage.setItem('CartItems',JSON.stringify(getState().Cart.CartItems));
}

export const ShippingAddress = (data)=> async(dispatch)=>{
    dispatch({
        type : SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('Shippinginfo', JSON.stringify(data))
}

export const PaymentRequest =(data)=>async(dispatch)=>{
    dispatch({
        type: PAYMENT_METHOD,
        payload:data
    })

}