import {
  ORDER_DETAILS_FAIL,
  ORDER_USER_FAIL,
  ORDER_USER_SUCCESS,
  ORDER_USER_REQUEST,
  ORDER_DETAILS_SUCCESS,
   ORDER_DETAILS_REQUEST,
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAIL,
    ORDER_RESET}
from '../actions/Order/actions';

export const OrderReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_REQUEST:
        return { loading: true };
      case ORDER_SUCCESS:
        return { loading: false, success: true, order: action.payload };
      case ORDER_FAIL:
        return { loading: false, error: action.payload };
      case ORDER_RESET:
        return {};
      default:
        return state;
    }
  };


  export const OrderDetailsReducer = (
    state = { loading: true, order: {} },
    action
  ) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return { loading: true };
      case ORDER_DETAILS_SUCCESS:
        return { loading: false, order: action.payload };
      case ORDER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const orderMineListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_USER_REQUEST:
        return { loading: true };
      case ORDER_USER_SUCCESS:
        return { loading: false, orders: action.payload };
      case ORDER_USER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };