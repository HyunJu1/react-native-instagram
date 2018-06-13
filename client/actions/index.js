import axios from 'axios';
import qs from 'qs';
import { AsyncStorage } from 'react-native';
import { Config } from '../config';
import NavigationService from '../navigation_service';
import {fetchPost, fetchPosts, fetchMyPost, fetchCreatePost} from './index';
export const DELETE_POST = 'delete_post';
export const UPDATE_POST = 'update_post';

export function signin(username, password) {
  return async dispatch => {
    try {
      
      const response = await axios.post(`${Config.server}/api/oauth/token`,
        qs.stringify({
          username: username,
          password: password,
          client_secret: Config.clientSecret,
          client_id: Config.clientId,
          grant_type: 'password'
        }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      await AsyncStorage.setItem('accessToken', response.data.access_token);

      dispatch(fetchMyProfile());
      NavigationService.navigate('App');
     
    } catch (err) {  
      console.log(err.response || err);
      alert('Invalid ID or Password');
    }  
  };}  

export function fetchMyProfile() {
  return async dispatch => {
    const loginUser = await axios.get(`${Config.server}/api/users/me`);
    dispatch({type: 'FETCHED_LOGIN_USER', payload: loginUser.data});
  }
}
export function signup(username, password) {
  return (dispatch,getState) => {
try{
      axios.get('https://randomuser.me/api/').then(response => {
      var createUser = {
        username,
        password,
        image:response.data.results[0].picture.medium,     
      };
       axios.post(`${Config.server}/api/users`, createUser);
       NavigationService.navigate('Sign');
       alert('성공적으로 가입 완료 되었습니다. ');
       
    })
  }catch(err) {
      console.log(err.response);
      alert('ID가 이미 존재합니다.');
    };
  }
}



export function signout() {
  console.log("SIGNOUT!!");
  return async dispatch => {
    console.log("DELETE authorization header!");
    delete axios.defaults.headers.common['Authorization'];
    await AsyncStorage.clear();
    NavigationService.navigate('Auth');
  };
}



export function fetchUsers() {
  return dispatch => {
    axios.get(`${Config.server}/api/users`).then( response => {
      dispatch({type: 'FETCHED_USERS', payload: response.data});
    }).catch(err => {
      console.log(err.response);
      if (err.response.status == 401) {
        dispatch(signout());
      } else {
        alert('Network Error');
      }
    });
  };
}
