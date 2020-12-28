import React, { useEffect, useState } from 'react';
import Product from '../Products/Product';
import Rating from '../Rating/Rating';
import data from '../../data';
import MessageError from '../UI/Error';
import Spinner from '../UI/LoadingSpinner';
import '../../index.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../store/actions/ProductActions/products';

const Home =(props)=>{

  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';

   const dispatch = useDispatch();
   const productList = useSelector((state) => state.productList);
 
   const { loading, error, products } = productList;
  
   useEffect(()=>{
      dispatch(listProducts(category));
  }, [dispatch, category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
//    const {product}=props
  console.log("Products",products)
  return (
    <div>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
    
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home