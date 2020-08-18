import Axios from 'axios';
import { loaderOn, loaderOff } from './loader';
import {routePanel} from './routePanel';

export const loginSuccess = (user) =>({
  type:'LOGIN_SUCCESS',
  payload:user
})

export const logout = () =>({
  type:'LOGOUT',
})

export const login = (user) => (
  (dispatch) => {
    Axios.post(routePanel+'users/saveUser',user)
    .then(response =>{
      dispatch(loginSuccess(user));
      dispatch(loaderOff());
    })
    .catch(error => {
      alert('error'+error);
      dispatch(loaderOff());
    });
    
  }
)
