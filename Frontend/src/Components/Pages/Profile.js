import React, { useEffect ,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {UserDetails , UpdateUser } from '../../store/actions/Signin/Signin';
import {UPDATE_RESET} from '../../store/actions/Signin/actions';
import Spinner from '../UI/LoadingSpinner';
import MessageBox from '../UI/Error';

const UserForm = (props)=>{

  const [name , Setname]= useState('');
  const [email , Setemail]= useState('');
  const [password , Setpassword]= useState('');
  const [Confirmpassword , SetConfirmpassword]= useState('');

  const UpdateProfile = useSelector((state) => state.Update);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = UpdateProfile;



 const signin = useSelector((state)=>state.Signin);
 const { userInfo } = signin
 const userdetails=useSelector((state)=>state.UserDetails)
 const {loading , user , error} = userdetails;
 console.log("userinfo" , userInfo);   
const dispatch = useDispatch();

const submitHandler=(e)=>{
  e.preventDefault()
  if(password !== Confirmpassword)
  {
    alert("Passwords do not match")
  }
  else{
    dispatch(UpdateUser({userid:userInfo._id , name,email,password}))
  }
  console.log("updated")
}

useEffect(()=>{
  if(!user)
  {
    dispatch({ type: UPDATE_RESET });
    dispatch(UserDetails(userInfo._id))
  }
  else{
    Setname(user.name)
    Setemail(user.email);
  }
},[user,userInfo._id , dispatch])

return (
  <div>
    <form className="form" onSubmit={submitHandler}>
      <div>
        <h1>Profile </h1>
      </div>
      {loading ? (<Spinner/>) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ):(

     <React.Fragment>
          {loadingUpdate && <Spinner/>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          value = {name}
          onChange={(e) => Setname(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
           value= {email}
           onChange={(e)=> Setemail(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          onChange={(e)=> Setpassword(e.target.value)}
    
        ></input>
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Enter confirm password"
          onChange={(e)=> SetConfirmpassword(e.target.value)}
       
        ></input>
      </div>
      <div>
        <label />
        <button className="primary" type="submit">
        Update
              </button>
      </div>
      </React.Fragment>
      )}
    </form>
  </div>
);
}

export default UserForm;