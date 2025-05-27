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

// Get Products
export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_REQUEST });
  try {
    const res = await fetch("http://localhost:3001/products");
    const data = await res.json();
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_PRODUCTS_FAILURE, payload: err.message });
  }
};

// Get Cart Items
export const getCartItems = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const res = await fetch("http://localhost:3001/cartItems");
    const data = await res.json();
    dispatch({ type: GET_CART_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_CART_FAILURE, payload: err.message });
  }
};

// Add to Cart
export const addToCart = (item) => async (dispatch) => {
  dispatch({ type: ADD_CART_REQUEST });
  try {
    const res = await fetch("http://localhost:3001/cartItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    dispatch({ type: ADD_CART_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ADD_CART_FAILURE, payload: err.message });
  }
};

// Update Cart
export const updateCart = (id, changes) => async (dispatch) => {
  dispatch({ type: UPDATE_CART_REQUEST });
  try {
    const res = await fetch(`http://localhost:3001/cartItems/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });
    const data = await res.json();
    dispatch({ type: UPDATE_CART_SUCCESS, payload: { id, changes: data } });
  } catch (err) {
    dispatch({ type: UPDATE_CART_FAILURE, payload: err.message });
  }
};

// Delete from Cart
export const deleteFromCart = (id) => async (dispatch) => {
  dispatch({ type: DELETE_CART_REQUEST });
  try {
    await fetch(`http://localhost:3001/cartItems/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: DELETE_CART_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_CART_FAILURE, payload: err.message });
  }
};
