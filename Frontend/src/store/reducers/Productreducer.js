import data from "../../data";


const {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    USER_PRODUCT_REQUEST,
    USER_PRODUCT_SUCCESS,
    USER_PRODUCT_FAIL
  } = require('../actions/ProductActions/actions');

export const productListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};




export const productDetailsReducer = (
  state = { loading: true, product: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const UserProductsReducer = (
  state = { loading: true, product: [] },
  action
) => {
  switch (action.type) {
    case USER_PRODUCT_REQUEST:
      return { loading: true };
    case USER_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case USER_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const CreateProductReducer=(state={}, action)=>{
  switch(action.type)
  {
      case CREATE_PRODUCT_REQUEST:
          return {loading:true};
      
      case CREATE_PRODUCT_SUCCESS :
          return{loading:false, product:action.payload };

      case CREATE_PRODUCT_FAIL:
          return{ loading:false , error : action.payload };

    

      default:
          return state;
  }
}