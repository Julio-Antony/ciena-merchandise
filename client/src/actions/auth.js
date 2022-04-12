import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_SINGLE_USER,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Get Single User
export const getBoard = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}`);

    if (res) {
      axios.defaults.headers.common['boardId'] = id;
    } else {
      delete axios.defaults.headers.common['boardId'];
    }

    dispatch({
      type: GET_SINGLE_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Change User's Profile
export const updateProfile = (id, name, email, avatar, level,) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({name, email, level, avatar });

  try {
    const res = await axios.patch(`/api/auth/${id}`, body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(res.data.msg, 'success'))

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: UPDATE_PROFILE_FAIL,
    });
  }
}

//Change Password
export const changePassword = (password, confirm) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ password, confirm });

  try {
    const res = await axios.patch('/api/auth', body, config);

    dispatch({
      type: CHANGE_PASSWORD,
      payload: res.data,
    });

    dispatch(setAlert(res.data.msg, 'success'))

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: CHANGE_PASSWORD_FAIL,
    });
  }
}
