import Axios from 'axios';
import { loaderOn, loaderOff } from './loader';
import {route} from './routePanel';

export const setAddress = (address) =>({
  type:'SET_ADDRESS',
  payload:address,
})

export const getAddress = (email) =>(
  (dispatch)=>{
    dispatch(loaderOn());
    Axios.post(route+'users/getAddress',{email:email})
    .then(response =>{
      dispatch(loaderOff());
      dispatch(setAddress(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(loaderOff());
    });
  }
);