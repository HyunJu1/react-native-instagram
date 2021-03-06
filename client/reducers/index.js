import { combineReducers } from 'redux';
import _ from 'lodash';
import {   DELETE_POST } from '../actions/post';

function users(state = [], action) {
  switch (action.type) {
    case 'FETCHED_USERS':
      return action.payload;
    case 'FETCHED_USER':
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

    case DELETE_POST + '_FULFILLED':
      console.log('delete post redux');
      return _.omit(state, action.payload);
    // case FETCH_POST + '_FULFILLED':
    //   return { ...state, [action.payload.data.id]: action.payload.data};

    default:
      return state;
  }
}
function post(state = [], action) {
  switch (action.type) {
    case 'FETCHED_POST':
      return action.payload;
      
    default:
      return state;
  }
}
function mypost(state = [], action) {
  switch (action.type) {
    case 'FETCHED_MY_POST':
      return action.payload;

    default:
      return state;
  }
}
const rootReducer = combineReducers({
  users,
  posts,
  post,
  loginUser,
  mypost
});

export default rootReducer;