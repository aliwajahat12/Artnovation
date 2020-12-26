import React , {useState}  from 'react';
import  { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {ConfirmationUser} from '../../store/actions/Signin/Signin'
const Confirm=(props)=>{

const[token , Settoken] = useState('');
const dispatch = useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(ConfirmationUser(token))
        console.log("Token" , token)
    } 
    return (
        <div>
<Link to ='/'>Back to home </Link>
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