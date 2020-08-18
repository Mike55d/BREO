import Axios from 'axios';
import {routePanel} from './routePanel';
import {loaderOn,loaderOff} from './loader';
import {refreshOn,refreshOff} from './refresh';

const setRubros = (payload) =>({
  type:'SET_RUBROS',
  payload:payload
})

export const getRubros = (refresh= false) =>(
  (dispatch) =>{
    const loadOn = refresh ? refreshOn : loaderOn;
    const loadOff = refresh ? refreshOff : loaderOff;
    dispatch(loadOn());
    Axios.get(routePanel+'rubros/')
    .then(res =>{
      dispatch(loadOff());
      dispatch(setRubros(res.data));
    })
    .catch(error =>{
      console.log('rubros',error);
      dispatch(loadOff());
    })
  }
);

