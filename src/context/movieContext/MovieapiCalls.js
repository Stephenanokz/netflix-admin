import axios from "axios";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
} from "./MovieActions";
import {baseUrl} from "../../baseUrl";

export const getMoviesCall = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get(`${baseUrl}/movies`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

export const createMovieCall = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axios.post(`${baseUrl}/movies`, movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

export const updateMovieCall = async (movie, dispatch) => {
  dispatch(updateMovieStart());
  try {
    const res = await axios.put(`${baseUrl}/movies/${movie._id}`, movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateMovieSuccess(res.data));
  } catch (err) {
    dispatch(updateMovieFailure());
  }
};

export const deleteMovieCall = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete(`${baseUrl}/movies/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};
