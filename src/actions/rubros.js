import Axios from 'axios';
import {route} from './routePanel';
import {loaderOn,loaderOff} from './loader';

const setRubros = (payload) =>({
  type:'SET_RUBROS',
  payload:payload
})

export const getRubros = () =>(
  (dispatch) =>{
    dispatch(loaderOn());
    Axios.get(route+'rubros/')
    .then(res =>{
      dispatch(loaderOff());
      dispatch(setRubros(res.data));
    })
    .catch(error =>{
      console.log('rubros',error);
      dispatch(loaderOff());
    })
  }
);

