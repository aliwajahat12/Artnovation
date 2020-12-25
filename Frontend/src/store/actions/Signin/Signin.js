import Axios from 'axios';
import    {
    SIGN_IN_REQUEST,
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS,
    SIGN_OUT,
    SIGN_UP_SUCCESS,
    SIGN_UP_REQUEST,
    SIGN_UP_FAIL,
    USER_DETAILS_REQUEST ,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_REQUEST,
    UPDATE_SUCCESS
} from './actions';

export const SignIn=(email,password)=>async(dispatch)=>{
dispatch({
    type:SIGN_IN_REQUEST,
    payload: {email,password}
})
  try{
      const {data}= await Axios.post("/api/user/signin", {email,password}); // data contain the id token email and password of the user
dispatch({
    type:SIGN_IN_SUCCESS,
    payload: data
})
localStorage.setItem("userInfo", JSON.stringify(data));
}catch(error)
{
    dispatch({
        type:SIGN_IN_FAIL,
         payload:
        error.response && error.response.data.message  //payload is checking if the err.response exist if it does then show that else display err.message
          ? error.response.data.message
          : error.message

    })
}


}


export const SignOut = ()=>async(dispatch)=>{
localStorage.removeItem('userInfo')
localStorage.removeItem('CartItems')
dispatch({

    type: SIGN_OUT

})}


export const SignUp =   (name,email,password)=> async(dispatch)=>{
    dispatch({
        type: SIGN_UP_REQUEST,
        payload:{name,email,password}
        // payload:{email,password}
    })
    try{
    const {data}= await Axios.post("/api/user/signup",{name,email,password})
    dispatch({
        type:SIGN_UP_SUCCESS,
        payload:data
    })
    // dispatch({  //as we are using userInfo in the Signin page to authenticate the user
    //     type:SIGN_IN_SUCCESS,
    //     payload:data
    // })
    }catch(error)
    {
        dispatch({
            type:SIGN_UP_FAIL,
             payload:
            error.response && error.response.data.message  //payload is checking if the err.response exist if it does then show that else display err.message
              ? error.response.data.message
              : error.message
    
        }) 
    }

}

export  const UserDetails = (id)=> async(dispatch , getState)=>{
    dispatch({
        type:USER_DETAILS_REQUEST,
        payload : id
    })
    const {
       Signin: { userInfo },
      } = getState();
    try{
        const {data} = await Axios.get(`/api/user/${id}` , {
            headers:{
                Authorization: 'Bearer ' + userInfo.token
              }
        })
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type:USER_DETAILS_FAIL,
             payload:
            error.response && error.response.data.message  //payload is checking if the err.response exist if it does then show that else display err.message
              ? error.response.data.message
              : error.message
    
        }) 
    }
}

export const UpdateUser=(user)=>async(dispatch,getState)=>{
    dispatch({
        type:UPDATE_REQUEST,
        payload:user
    })
    const {
        Signin: { userInfo },
       } = getState();
       try{
           const {data} = await Axios.put(`/api/user/profile` , user,
           {
               headers:{
                Authorization: 'Bearer ' + userInfo.token
               }
           })
           dispatch({type:UPDATE_SUCCESS , payload: data})
           dispatch({type:SIGN_IN_SUCCESS , payload: data})  //Sign in after updating the profile in order to shwo the user name on top
           localStorage.setItem('userInfo' , JSON.stringify(data))
       }catch(error)
       {
        dispatch({
            type:USER_DETAILS_FAIL,
             payload:
            error.response && error.response.data.message  //payload is checking if the err.response exist if it does then show that else display err.message
              ? error.response.data.message
              : error.message
    
        }) 
       }
}