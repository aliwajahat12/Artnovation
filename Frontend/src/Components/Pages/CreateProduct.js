import React, { useEffect, useState , useCallback } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {SignIn ,SignUp} from '../../store/actions/Signin/Signin';
import {CreateProduct} from '../../store/actions/ProductActions/products';
import Spinner from '../UI/LoadingSpinner';
import MessageBox from '../UI/Error';
import ImageUpload from '../UI/Imageupload';
import  {useForm} from '../UI/form-hook';
import Input from '../UI/Input'
import Dropdown from '../UI/Dropdown'
import Axios from 'axios';
import { VALIDATOR_REQUIRE ,VALIDATOR_MINLENGTH } from '../UI/Validators';
import DropDown from '../UI/Dropdown';
// import {VALIDATOR_REQUIRE} from '../UI/Validators'; 
const CreateProducts=(props)=>{

    const [formstate, inputHandler] = useForm(
        {
          name: {
            value: '',
            isValid: false
          },
          description: {
            value: '',
            isValid: false
          },
          category:{
            elementtype: 'select',
            elementconfig:{
                options:[
                {Value:'physical' , DisplayValue:'Physical'},
                {Value :'digital', DisplayValue:'Digital'}],
                value:''
            },
            isValid:true
            },
          image:{
            value: null,
            isValid: false
          },
          price: {
            value: '',
            isValid: false
          },
          
        },
        false
      );

      

    // const [name, setName] = useState('');
    // const [description, Setdescription] = useState('');
    
    // const [price, Setprice] = useState('');
    // const [image, Setimage] = useState('');
    // const [category, Setcategory] = useState('');
    // const [countInStock, SetcountInStock] = useState('');
    // const [rating, Setrating] = useState('');
    // const [numReviews, SetnumReviews] = useState('');
 
  
    const redirect = props.location.search
      ? props.location.search.split('=')[1]
      : '/';
  
      const UserSignIn= useSelector((state)=> state.Signin);
    const{userInfo,loading ,error} = UserSignIn

    const products = useSelector((state) => state.CreateProduct);
    const { product, loading :SignLoading, error:SignError } = products;
  
//   console.log(product)
    // const dispatch = useDispatch();
    //  const submitHandler = (e) => {
    //    e.preventDefault();
    // console.log("Submitted") 
    // dispatch(CreateProduct({name, description , price, category, countInStock, rating ,numReviews}));
    // }//   if (password !== confirmPassword) {
    //     alert('Password and confirm password are not match');
    //   } else {
        
    //   }
    //  };
const history = useHistory();
// console.log("DATA",description,name,category,image)
console.log("DATA",formstate.inputs.description,formstate.inputs.name,formstate.inputs.category,formstate.inputs.image)
console.log("USERINFO", userInfo)
// console.log("userInfo id" ,userInfo._id , userInfo.token)

const SubmitFormHandler = async event => {
    event.preventDefault();
    console.log("submitting")
    try {
      const formData = new FormData();
      formData.append('name', formstate.inputs.name.value);
      formData.append('description',formstate.inputs.description.value);
      formData.append('category', formstate.inputs.category.value);
      formData.append('price', formstate.inputs.price.value);
    
      // formData.append('countInStock', formstate.inputs.countInStock.value);
     
     
      formData.append('image',formstate.inputs.image.value)
      formData.append('creator', userInfo._id);
    //  formData.append('image', formState.inputs.image.value);
      await Axios.post( '/api/products/upload', formData,{
      headers:{
        Authorization: 'Bearer ' + userInfo.token
      }
    }
    
      // JSON.stringify({
      //   title: formstate.inputs.title.value,
      //   description: formstate.inputs.description.value,
      //   address: formstate.inputs.address.value,
      //   creator: auth.userId
      );
      console.log("FormData" , formData.inputs)

    //   console.log(auth.userId)
      history.push('/');

    }catch (err) {
      console.log(err);
      console.log(err.message)}
  };
//   console.log("Form States" , formstate)


    
        // useEffect(()=>{
        //     dispatch(CreateProduct({name, description , price, category, countInStock, rating ,numReviews}));
        // }, [dispatch, name ,image,description,price , rating , numReviews , category]);
  
        
    return (
      <div>
        <form className="form" onSubmit={SubmitFormHandler}>
          <div>
            <h1>Upload  a Product</h1>
          </div>
          {loading && <Spinner/>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div>
        
            <Input
            id="name"
           // element='name'
              type="text"
              label = 'Name'
              placeholder="Enter name"
              errorMessage="Please Enter a valid Name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
        //  onChange = {(e)=>setName(e.target.value)}
            ></Input>
          </div>
          <Input 
            id='description'
            //element='textarea' 
            type='text' 
            label='Description'
            errorMessage="Please Enter a valid Description ( 5 characters minimum)"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            />
            <ImageUpload center id="image" onInput={inputHandler}/>
             
          <div>
            {<p> Category can only be Physical or Digital</p>}
           <Input 
            id='category'
            element='select' 
            type='select' 
            label='Category'
            errorMessage="Please Enter a valid Category"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            />
            <DropDown></DropDown>
          </div>
            

          <div>
          <Input 
            id='price'
           // element='price' 
            type='number' 
            label='Price'
            errorMessage="Please Enter a valid Price"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            />
          </div>
        {/* <Dropdown></Dropdown> */}

          {/* <ImageUpload center id="image" onInput={inputHandler}/> */}
          <div>
            <label />
            <button className="primary" type="submit">
              Register
            </button>
          </div>
          <div>
            <label />
           
          </div>
        </form>
      </div>
    );
  }


export default CreateProducts;