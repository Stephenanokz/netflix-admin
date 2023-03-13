import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import { baseUrl } from "../../baseUrl";

export const loginCall = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
