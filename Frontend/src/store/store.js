import {createStore , compose , applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import  { productDetailsReducer, productListReducer ,CreateProductReducer} from './reducers/Productreducer';
import {CartReducer} from './reducers/CartReducer';
import { SigninReducer, SignUpReducer, userDetailsReducer , userUpdateProfileReducer , userConfirmationReducer} from './reducers/SigninReducer';
import {OrderReducer , OrderDetailsReducer,orderMineListReducer} from './reducers/OrderReducer';


const initialState={
  Signin:{
  userInfo : localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  :null
  },
  
    Cart:{
        CartItems: localStorage.getItem('CartItems')    
        ?   JSON.parse(localStorage.getItem('CartItems')) //Converting the cartItems into an array
        : []
    ,
        Shippinginfo: localStorage.getItem('Shippinginfo')    
        ?   JSON.parse(localStorage.getItem('Shippinginfo')) //Converting the cartItems into an array
        : {}
    },
    // Payment: 'Cash On Delivery'
}
const reducer = combineReducers ({
    productList:productListReducer,
    productDetails: productDetailsReducer,
    Cart : CartReducer,
    Signin: SigninReducer,
    Signup:SignUpReducer,
    Order : OrderReducer,
    OrderDetails: OrderDetailsReducer,
    OrderMine : orderMineListReducer,
    UserDetails:  userDetailsReducer,
    Update : userUpdateProfileReducer,
    CreateProduct: CreateProductReducer,
    Confirmation : userConfirmationReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store= createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
)

export default store;