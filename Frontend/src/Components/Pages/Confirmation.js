import React , {useEffect, useState}  from 'react';
import  { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {ConfirmationUser} from '../../store/actions/Signin/Signin'
import Spinner from '../UI/LoadingSpinner';
import MessageBox from '../UI/Error';
const Confirm=(props)=>{

const[token , Settoken] = useState('');
const confirmation = useSelector((state)=>state.Confirmation);
const { token1, loading,error}  = confirmation;
const redirect = props.location.search
? '/confirmation' 
: props.location.search.split('=')[1];
console.log("REadirecr",redirect)

console.log("Token Confirmation" , token1)
const dispatch = useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(ConfirmationUser(token))
        console.log("Token" , token)
    } 
    useEffect(()=>{
        if(token1)
        {
        props.history.push(redirect);
        }
    },[props.history , redirect , token1])
    return (
        <div>
<Link to ='/'>Back to home </Link>

{
token1 &&
    <a href={`${token1}`} >Go there to Continue</a>
}
{loading && <Spinner/>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
<form className="form" onSubmit={submitHandler}>
<label>
    Token:
    <input type="text" name="token" onChange={(e)=> Settoken(e.target.value)} />
  </label>
  <input type="submit" value="Submit" />
{/* 
<button className="primary" type="submit">
              Register
            </button> */}
</form>
</div>
    )
       
    
}

export default Confirm;