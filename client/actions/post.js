import axios from 'axios';
import qs from 'qs';
import { AsyncStorage } from 'react-native';
import { Config } from '../config';
import NavigationService from '../navigation_service';

export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export function fetchPosts() {
  return dispatch => {
    axios.get(`${Config.server}/posts`).then( response => {
      dispatch({type: 'FETCHED_POSTS', payload: response.data});
    }).catch(err => {
      console.log('fetchPosts err'+err.response);
    })
  };
}

export function fetchPost(id) {
  return dispatch => {
    axios.get(`${Config.server}/posts/${id}`).then( response => {
      dispatch({type: 'FETCHED_POST', payload: response.data});
    }).catch(err => {
      console.log('fetchPost err'+err.response);
    })   
  };
}


export function fetchMyPost() {
  return async(dispatch,getState) => {
    const idd=await getState().loginUser.id;
    await axios.get(`${Config.server}/posts/mypost/${idd}`).then( response => {
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



export function createPost(title, content) {
  return (dispatch,getState) => {
    Promise.all([
      
      axios.get('https://picsum.photos/400/200/?random'),
      getState().loginUser
    ]).then(([response,loginUser]) => {
      var posting = {
        title,
        content,
        name: loginUser.id,
        image: response.request.responseURL,
        likes: 0,
      };
      axios.post(`${Config.server}/posts`,posting);
      NavigationService.navigate('Home');
      alert('성공적으로 게시물을 등록하였습니다. ');
    })
    .catch(err => {
      console.log(err.response);
    });
  }
}

export function deletePost(id) {

  return dispatch => {
    axios.delete(`${Config.server}/posts/${id}`).then( response => {
    NavigationService.navigate('Home');
    alert('성공적으로 게시물을 삭제하였습니다. ');
  }).catch(err => {
    console.log(err.response);
  })
};
}
