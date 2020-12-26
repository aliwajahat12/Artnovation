import React, { Component } from 'react';
import Signin from './Components/Pages/Signin';
import ProductScreen from './Components/Pages/ProductScreen';
import LandingPage from './Components/Pages/Landing';
import CartPage from './Components/Pages/Cart';
import './index.css';
import { BrowserRouter, Route ,Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {SignOut} from './store/actions/Signin/Signin'
import Signup from './Components/Pages/Signup';
import Shipping from './Components/Pages/Sipping';
import Payment from './Components/Pages/Payment';
import PlaceOrder from './Components/Pages/PlaceOrder';
import OrderDetail from './Components/Pages/OrderDetails';
import OrderMine from './Components/Pages/Ordered';
import Profile from './Components/Pages/Profile';
import PrivateRoute from './Components/Pages/PrivateRoute';
import CreateProduct from './Components/Pages/CreateProduct';
import Confirmation from './Components/Pages/Confirmation' 
const App =()=> {
  const Cart = useSelector( (state) => state.Cart)
  const {CartItems}= Cart;
  const SignIn= useSelector((state)=> state.Signin);
      const {userInfo}  = SignIn;  //userInfo name should be same as in the reducer
    
  const dispatch  = useDispatch();

  const SignOutHandler=()=>{
    dispatch(SignOut());
  }
console.log("userinfo", userInfo)
    return (
      <BrowserRouter>
      <div className = 'grid-container'>
    <header className = 'row'>
        <div>
            <Link to ="/">Art Gallery</Link>
        </div>
        <div>
        <Link to ="/cart"> Cart
        {
          CartItems.length  > 0 &&(
            <span className='badge'>{CartItems.length}</span>
          )
        } </Link>
          {userInfo ? (
             
                  
                    <Link to="#signout" onClick={SignOutHandler}>
                      Sign Out
                    </Link>
                  
             ) : (
              <Link to="/signin">Sign In</Link>
            )}</div>
            {
              <div>
                   <Link to = '/ordermine'> Order History</Link>
                   <Link to = '/profile'> Profile</Link>
                   <Link to = '/upload'> Upload Product</Link>
                   </div>
            }
            <div>
   
        </div>
    </header>
    <main>
  <Route path='/' exact component={LandingPage}/>
  <Route path='/cart/:id?'component={CartPage}/>
  <Route path='/product/:id' component={ProductScreen}/>
  <Route path='/signin' component={Signin}/>
  <Route path ='/signup' component={Signup}/>
  <Route path ='/shipping' component={Shipping}/>
  <Route path ='/payment' component={Payment}/>
  <Route path ='/placeorder' component={PlaceOrder}/>
  <Route path = '/order/:id' component={OrderDetail}/>
  <Route path = '/ordermine' component={OrderMine}/>
  <Route path = '/upload' component={CreateProduct}/>
  <Route path = '/confirmation' component={Confirmation}/>
  <PrivateRoute path = '/profile' component={Profile}/>
    </main>
    <footer className = 'row center'>
<p>All rights are reserved.</p>
    </footer>
</div>
</BrowserRouter>
    );
  }


export default App;
