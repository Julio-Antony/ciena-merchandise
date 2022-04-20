import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import board from './board';
import user from './user';

export default combineReducers({ alert, auth, board, user });
