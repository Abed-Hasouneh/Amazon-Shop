import axios from "axios";
import { getError } from "../utilites";

import {
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_ADMIN_FAIL,
  PRODUCT_LIST_ADMIN_REQUEST,
  PRODUCT_LIST_ADMIN_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SEARCH_FAIL,
  PRODUCT_LIST_SEARCH_REQUEST,
  PRODUCT_LIST_SEARCH_SUCCESS,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";
import { toast } from "react-toastify";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: getError(error),
    });
  }
};

export const listProductsAdmin = (page) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_LIST_ADMIN_REQUEST });

  const {
    userLogin: { userInfo },
  } = getState();
  try {

    const { data } = await axios.get(`/api/products/admin?page=${page} `, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({
      type: PRODUCT_LIST_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_ADMIN_FAIL,
      payload: getError(error),
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: getError(error),
    });
  }
};

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    toast.error(getError(error));
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const listProductsSearch =
  ({ category, order, page, price, query, rating }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_SEARCH_REQUEST,
    });
    try {
      const { data } = await axios.get(
        `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
      );
      dispatch({ type: PRODUCT_LIST_SEARCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_SEARCH_FAIL, payload: error.message });
    }
  };
