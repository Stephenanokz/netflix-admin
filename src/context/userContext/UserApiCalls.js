import axios from "axios";
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  // getUserFailure,
  // getUserStart,
  // getUserSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./UserActions";
import {baseUrl} from "../../baseUrl";

export const getUsersCall = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get(`${baseUrl}/users`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

// export const getUserCall = async (id, dispatch) => {
//   dispatch(getUserStart());
//   try {
//     const res = await axios.get(`/users/find/${id}` , {
//       headers: {
//         token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
//       },
//     });
//     dispatch(getUserSuccess(res.data));
//   } catch (err) {
//     dispatch(getUserFailure());
//   }
// };

export const createUserCall = async (user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axios.post(`${baseUrl}/users`, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    dispatch(createUserFailure());
  }
};

export const updateUserCall = async (user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`${baseUrl}/users/${user._id}`, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const deleteUserCall = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(`${baseUrl}/users/${id}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
