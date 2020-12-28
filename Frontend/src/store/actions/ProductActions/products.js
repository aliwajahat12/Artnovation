import Axios from 'axios';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  USER_PRODUCT_REQUEST,
  USER_PRODUCT_SUCCESS,
  USER_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS
} from './actions.js';

export const listProducts = ( category = '',searchKeyword = '',sortOrder = '') =>
 async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await Axios.get(
      '/api/products?category=' +
        category +
        '&searchKeyword=' +
        searchKeyword +
        '&sortOrder=' +
        sortOrder
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    console.log("The Data of the product ", data);
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const ProductDetails =(productId)=> async(dispatch)=>{
  dispatch({
    type:PRODUCT_DETAILS_REQUEST,
    payload:productId
  })
  try{
    const {data}= await Axios.get(`/api/products/${productId}`)
    console.log('DATA',data)
    dispatch({
      type:PRODUCT_DETAILS_SUCCESS,
      payload:data
    })
  }catch(err)
  {
    dispatch({
      type:PRODUCT_DETAILS_FAIL,
      payload: err.response && err.response.data.messsage
      ? err.response.data.message
      : err.message
    })
  }
}


export const CreateProduct = (product)=>async(dispatch)=>{
  dispatch({
    type: CREATE_PRODUCT_REQUEST,
    payload:{product}
  })
  try{
    const {data}= await Axios.post('/api/products/upload' , product  )
    dispatch({type: CREATE_PRODUCT_SUCCESS , payload:data})

  }catch(err)
  {
    dispatch({
      type:CREATE_PRODUCT_FAIL,
      payload: err.response && err.response.data.messsage
      ? err.response.data.message
      : err.message
    })

  }
}


export const UserProduct =(userId)=> async(dispatch)=>{
  dispatch({
    type :  USER_PRODUCT_REQUEST,
    payload:userId
  })
  try{
    const {data}= await Axios.get(`/api/products/user/${userId}`)
    console.log('DATA',data)
   ;
    console.log("DATA 2" ,Object.keys(data))

   
   
    dispatch({
      type: USER_PRODUCT_SUCCESS,
      payload:data
    })
  }catch(err)
  {
    dispatch({
      type: USER_PRODUCT_FAIL,
      payload: err.response && err.response.data.messsage
      ? err.response.data.message
      : err.message
    })
  }
}



export const DeleteProduct = (id) => async(dispatch)=>{
  dispatch({
    type:DELETE_PRODUCT_REQUEST
  })
try{
  const {data} = await Axios.get(`/api/products/delete/${id}`)
console.log("data" , data)
dispatch({type: DELETE_PRODUCT_SUCCESS})
}catch(err)
{
  dispatch({
    type: DELETE_PRODUCT_FAIL,
    payload: err.response && err.response.data.messsage
    ? err.response.data.message
    : err.message
  })
}
}
