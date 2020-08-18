import Axios from 'axios';
import {routePanel} from './routePanel';
import {loaderOn,loaderOff} from './loader';
import {refreshOn,refreshOff} from './refresh';

const setComercios = (payload) =>({
  type:'SET_COMERCIOS',
  payload:payload
})

export const getComercios = (type,param,refresh = false) =>(
  (dispatch) =>{
    const loadOn = refresh ? refreshOn : loaderOn;
    const loadOff = refresh ? refreshOff : loaderOff;
    const endpoint = type == 'palabras' ? `comercios/search` : `comercios/${param}/all`;
    dispatch(loadOn());
    Axios.post(routePanel+endpoint,{words:param})
    .then(res =>{
      dispatch(loadOff());
      dispatch(setComercios(res.data));
    })
    .catch(error =>{
      console.log('comercios',error);
      dispatch(loadOff());
    })
  }
);

