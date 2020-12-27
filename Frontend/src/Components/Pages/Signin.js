import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {SignIn} from '../../store/actions/Signin/Signin';
import Spinner from '../UI/LoadingSpinner';
import MessageBox from '../UI/Error';
const SigninScreen=(props)=> {
  const [email, setEmail] = useState('');
  const dispatch= useDispatch();
  const [password, setPassword] = useState('');
   const redirect = props.location.search
  ? props.location.search.split('=')[1]
  : '/';
  //console.log("Propssearch",props.search.location)
  const UserSignIn= useSelector((state)=> state.Signin);
  console.log(UserSignIn)
    const {userInfo ,loading , error}  = UserSignIn;


  const submitHandler = (e) => {
    e.preventDefault(); //Will not refresh the page after clicking the signing button
    dispatch(SignIn(email,password))  
  };

  useEffect(()=>{
    if(userInfo){
      props.history.push(redirect);
    }
  },[props.history,userInfo,redirect])
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className='H1'>SIGN IN</h1>
        </div>
        {loading && <Spinner/>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            onChange={(e) => setEmail(e.target.value)} //Wil set the value of email to the entered value
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            min="6"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?  <Link to={`/signup?redirect=${redirect}`}>Sign-Up</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;