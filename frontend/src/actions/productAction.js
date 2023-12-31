import axios from 'axios';

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_ERRORS
} from '../constants/productConstant';

export const getProduct = (keyword, currentPage, price, category, rating) => async (dispatch) => {
  try {
    let fetchURL = '/api/v1/product';
    dispatch({ type: ALL_PRODUCT_REQUEST });
    const query = [];
    if (keyword) {
      query.push(`keyword=${keyword}`);
    }
    if (currentPage) {
      query.push(`page=${currentPage}`);
    }
    if (price) {
      query.push(`price[gte]=${price[0]}&price[lte]=${price[1]}`);
    }
    if (category) {
      query.push(`category=${category}`);
    }
    if (rating) {
      query.push(`rating[gte]=${rating}`);
    }

    if (query.length > 0) {
      fetchURL += `?${query.join('&')}`;
    }

    const { data } = await axios.get(fetchURL);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data
    });
  } catch(error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message
    });
  }
}

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product
    });
  } catch(error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message
    });
  }
}

export const createNewReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.patch(
        '/api/v1/product/review',
        review,
        config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success
    });
  } catch(error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message
    });
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
}