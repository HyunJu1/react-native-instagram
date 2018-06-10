import axios from 'axios';
import qs from 'qs';
import { AsyncStorage } from 'react-native';
import { Config } from '../config';
import NavigationService from '../navigation_service';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
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

      const loginUser = await axios.get(`${Config.server}/api/users/me`);
      dispatch({type: 'FETCHED_LOGIN_USER', payload: loginUser.data});
      NavigationService.navigate('App');
    } catch (err) {  
      console.log(err.response || err);
      alert('Invalid ID or Password');
    }  
  };}  





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

///////////////////////////////////////////////////////////////////

export function fetchPosts() {
  return dispatch => {
    axios.get(`${Config.server}/posts`).then( response => {
      dispatch({type: 'FETCHED_POSTS', payload: response.data});
    }).catch(err => {
      console.log(err.response);
    })
  };
}

export function fetchPost(id) {
  return {
    type: FETCH_POST,
    payload: axios.get(`/posts/${id}`)
  };
}
export function fetchMyPost() {
  return (dispatch,getState) => {
    axios.get(`${Config.server}/posts/mypost/${getState().loginUser.username}`).then( response => {
      dispatch({type: 'FETCHED_MY_POST', payload: response.data});
    }).catch(err => {
      console.log(err.response);
    })
  };
}


export function updatePost(id, values, callback) {
  return {
    type: UPDATE_POST,
    payload: axios.put(`/posts/${id}`, values).then(() => callback())
  };
}

export function signup(username, password) {
  return (dispatch,getState) => {

      axios.get('https://randomuser.me/api/').then(response => {
      var createUser = {
        username,
        password,
        image:response.data.results[0].picture.medium,     
      };
      return axios.post(`${Config.server}/api/users`,  
      createUser);
    }).catch(err => {
      console.log(err.response);
    });
  }
}


export function createPost(title, content) {
  return (dispatch,getState) => {
    Promise.all([
      
      axios.get('https://picsum.photos/400/200/?random'),
      getState().loginUser
    ]).then(([response,loginUser]) => {
      var posting = {
        title,
        content,
        name: loginUser.username,
        image: response.request.responseURL,
        likes: 0,
      };
      return axios.post(`${Config.server}/posts`,
        posting);
    }).catch(err => {
      console.log(err.response);
    });
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`/posts/${id}`).then(() => callback());
  return {
    type: DELETE_POST,
    payload: id
  }
}