import { combineReducers } from 'redux';
import _ from 'lodash';
import {  FETCH_POST, DELETE_POST } from '../actions';

function users(state = [], action) {
  switch (action.type) {
    case 'FETCHED_USERS':
      return action.payload;
    default:
      return state;
  }
}
function loginUser(state = [], action) {
  switch (action.type) {
    case 'FETCHED_LOGIN_USER':
      return action.payload;
    default:
      return state;
  }
}
function posts(state = [], action) {
  switch (action.type) {
    case 'FETCHED_POSTS':
      return action.payload;
    case 'FETCHED_MY_POST':
      return action.payload;
    case DELETE_POST + '_FULFILLED':
      return _.omit(state, action.payload);
    case FETCH_POST + '_FULFILLED':
      return { ...state, [action.payload.data.id]: action.payload.data};

    default:
      return state;
  }
}
const rootReducer = combineReducers({
  users,
  posts,
  loginUser
});

export default rootReducer;