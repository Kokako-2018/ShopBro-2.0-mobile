import request from '../../api/api'
import { saveUserToken, getUserTokenInfo } from '../../api/auth'


function requestLogin () {
    return {
      type: 'LOGIN_REQUEST',
      isFetching: true,
      isAuthenticated: false
    }
  }
  
  export function receiveLogin (user) {
    return {
      type: 'LOGIN_SUCCESS',
      isFetching: false,
      isAuthenticated: true,
      user
    }
  }
  
  function loginError (message) {
    return {
      type: 'LOGIN_FAILURE',
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }
  
  export function loginUser (creds) {
    return dispatch => {
      dispatch(requestLogin(creds))
      return request('post', 'auth/login', creds)
        .then((response) => {
          if (response.status === 403) {
            alert("Try Again!")
            dispatch(loginError(response.body.message))
            return Promise.reject(response.body.message)
          } else {
            saveUserToken(response.body.token).then(userInfo => {
              console.log('userInfo', userInfo) 
              dispatch(receiveLogin(userInfo))
            })
          }
        }).catch(err => {
          console.log(err)
          alert("Try Again!")
        })
    }
  }

  export function checkUserToken() {
    return dispatch => {
      return getUserTokenInfo().then((userInfo) => {
        console.log(userInfo)
        if (userInfo) dispatch(receiveLogin(userInfo))
      })
    }
  }