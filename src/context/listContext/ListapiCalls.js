import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListStart,
  updateListSuccess,
  updateListFailure,
} from "./ListActions";
import {baseUrl} from "../../baseUrl";

export const getListsCall = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get(`${baseUrl}/lists`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

export const createListCall = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post(`${baseUrl}/lists`, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

export const updateListCall = async (list, dispatch) => {
  dispatch(updateListStart());
  try {
    const res = await axios.put(`${baseUrl}/lists/${list._id}`, list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateListSuccess(res.data));
  } catch (err) {
    dispatch(updateListFailure());
  }
};

export const deleteListCall = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete(`${baseUrl}/lists/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};
