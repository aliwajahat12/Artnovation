import { CART_ADD_ITEMS, CART_DELETE_ITEM, CART_EMPTY, PAYMENT_METHOD, SHIPPING_ADDRESS } from "../actions/CartActions/actions"



export const CartReducer=(state = { CartItems: [] }, action)=>
{
    switch(action.type)  {
        case  CART_ADD_ITEMS:
        const item = action.payload;
        const existeditem= state.CartItems.find((x)=> x.product === item.product)
        if (existeditem) { 
            return {
                ...state,
                CartItems: state.CartItems.map((x)=>  x.product   === existeditem.product ?   item:   x)   //If the item exist then copy the state and in
                //cart update the existing product 
        }}
        else{
            return {
                ...state,
                CartItems:[...state.CartItems,item] //this will concatenate the two elements as it will add the elements to the existing elements in cart
            }
        }

        case CART_DELETE_ITEM:
            return{
                ...state,
                CartItems:state.CartItems.filter((x)=> x.product    !== action.payload)  //This will filter out that element which has the same product id 
            }
 

        case SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case PAYMENT_METHOD:
            return {
                ...state,
                Payment: action.payload
            }

            case CART_EMPTY:
                return{
                    ...state,
                    CartItems:[]
                }
            default:
                    return state;
                
    }
}


// export const cartReducer = (state = { cartItems: [] }, action) => {
//     switch (action.type) {
//       case CART_ADD_ITEM:
//         const item = action.payload;
//         const existItem = state.cartItems.find((x) => x.product === item.product);
//         if (existItem) {
//           return {
//             ...state,
//             cartItems: state.cartItems.map((x) =>
//               x.product === existItem.product ? item : x
//             ),
//           };
//         } else {
//           return { ...state, cartItems: [...state.cartItems, item] };
//         }
//       default:
//         return state;
//     }
//   };
