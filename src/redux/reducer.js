import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAILURE,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAILURE,
  DELETE_CART_REQUEST,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAILURE,
} from "./actionTypes";

const initialState = {
  products: [],
  cartItems: [],
  loadingProducts: false,
  loadingCart: false,
  loadingAddToCart: false,
  loadingUpdateCart: false,
  loadingDeleteCart: false,
  errorProducts: null,
  errorCart: null,
  errorAddToCart: null,
  errorUpdateCart: null,
  errorDeleteCart: null,
};

export const AppReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Products
    case GET_PRODUCTS_REQUEST:
      return { ...state, loadingProducts: true, errorProducts: null };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, loadingProducts: false, products: payload };
    case GET_PRODUCTS_FAILURE:
      return { ...state, loadingProducts: false, errorProducts: payload };

    // Cart Items
    case GET_CART_REQUEST:
      return { ...state, loadingCart: true, errorCart: null };
    case GET_CART_SUCCESS:
      return { ...state, loadingCart: false, cartItems: payload };
    case GET_CART_FAILURE:
      return { ...state, loadingCart: false, errorCart: payload };

    // Add to Cart
    case ADD_CART_REQUEST:
      return { ...state, loadingAddToCart: true, errorAddToCart: null };
    case ADD_CART_SUCCESS:
      return {
        ...state,
        loadingAddToCart: false,
        cartItems: [...state.cartItems, payload],
      };
    case ADD_CART_FAILURE:
      return {
        ...state,
        loadingAddToCart: false,
        errorAddToCart: payload,
      };

    // Update Cart
    case UPDATE_CART_REQUEST:
      return { ...state, loadingUpdateCart: true, errorUpdateCart: null };
    case UPDATE_CART_SUCCESS: {
      const updated = state.cartItems.map((item) =>
        item.id === payload.id ? { ...item, ...payload.changes } : item
      );
      return {
        ...state,
        loadingUpdateCart: false,
        cartItems: updated,
      };
    }
    case UPDATE_CART_FAILURE:
      return { ...state, loadingUpdateCart: false, errorUpdateCart: payload };

    // Delete from Cart
    case DELETE_CART_REQUEST:
      return { ...state, loadingDeleteCart: true, errorDeleteCart: null };
    case DELETE_CART_SUCCESS:
      return {
        ...state,
        loadingDeleteCart: false,
        cartItems: state.cartItems.filter((item) => item.id !== payload),
      };
    case DELETE_CART_FAILURE:
      return {
        ...state,
        loadingDeleteCart: false,
        errorDeleteCart: payload,
      };

    default:
      return state;
  }
};
