import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProduct, DeleteProduct } from '../../store/actions/ProductActions/products';
import { UserProduct } from '../../store/actions/ProductActions/products';
import { Link } from 'react-router-dom';

const obj = {
    name:"burhan"
}


const UserProductz = (props)=>{
    console.log(props.params)
    const userId= props.match.params.id;
    const dispatch = useDispatch();
    console.log("userId",userId)
const signin = useSelector((state)=>state.Signin)
const createproduct = useSelector((state)=>state.UserProducts);
const { userInfo} = signin;
const {product ,loading , error} = createproduct;
console.log("P ",product )

// console.log("obj", obj.map((p)=>p.name))

const Delete = (e,id)=>{
  e.preventDefault()
  console.log("Deleting")
  dispatch(DeleteProduct(id));
  // props.history.push('/')
}
// console.log("Keys",Object.keys(product))
console.log("userinfo", userInfo)
useEffect(()=>{
    dispatch(UserProduct(userId))
},[dispatch,userId])
    return (
        <div>
  

    
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {product.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                 //src={product.image}
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                {/* <Rating 
                rating ={product.rating} 
                numReviews={product.numReviews}/> */}
                  
                </div>
              </div>
              <button
                      type="button"
                      onClick={Delete(product._id)}
                      className="primary block">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    )
}
     

export default UserProductz;