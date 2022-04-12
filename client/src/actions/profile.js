import axios from "axios";
import { BOARD_ERROR, GET_USER_CHECKLIST } from "./types";

// Get tasks
export const getTasks = () => async (dispatch) => {
  try {

    const res = await axios.get("/api/checklists");

    dispatch({
      type: GET_USER_CHECKLIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};