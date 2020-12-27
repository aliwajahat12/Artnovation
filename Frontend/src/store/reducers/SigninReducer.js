import    {
    SIGN_IN_REQUEST,
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS,
    SIGN_OUT,
    SIGN_UP_FAIL,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
 USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
   USER_DETAILS_FAIL,
   UPDATE_SUCCESS,
   UPDATE_REQUEST,
   UPDATE_RESET,
   UPDATE_FAIL,
   CONFIRMATION_REQUEST,
   CONFIRMATION_SUCCESS,
   CONFIRMATION_FAIL
} from '../actions/Signin/actions';

export const SigninReducer=(state={}, action)=>{
    switch(action.type)
    {
        case SIGN_IN_REQUEST:
            return {loading:true};
        
        case SIGN_IN_SUCCESS:
            return{loading:false, userInfo:action.payload };

        case SIGN_IN_FAIL:
            return{ loading:false , error : action.payload };

        case SIGN_OUT:
            return{};

        default:
            return state;
    }
}

export const SignUpReducer=(state={}, action)=>{
    switch(action.type)
    {
        case SIGN_UP_REQUEST:
            return {loading:true};
        
        case SIGN_UP_SUCCESS:
            return{loading:false, userInfo:action.payload };

        case SIGN_UP_FAIL:
            return{ loading:false , error : action.payload };

      

        default:
            return state;
    }
}


export const userDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { loading: true };
      case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload };
      case USER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_REQUEST:
        return { loading: true };
      case UPDATE_SUCCESS:
        return { loading: false, success: true };
      case UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const userConfirmationReducer = (state = { loading: false ,token1:[]}, action) => {
    switch (action.type) {
      case CONFIRMATION_REQUEST:
        return { loading: true };
      case CONFIRMATION_SUCCESS:
        return { loading: false, token1: action.payload };
      case CONFIRMATION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };