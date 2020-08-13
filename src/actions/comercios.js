import Axios from 'axios';
import {route} from './routePanel';
import {loaderOn,loaderOff} from './loader';

const setComercios = (payload) =>({
  type:'SET_COMERCIOS',
  payload:payload
})

export const getComercios = (type,param) =>(
  (dispatch) =>{
    const endpoint = type == 'palabras' ? `comercios/search` : `comercios/${param}/all`;
    dispatch(loaderOn());
    Axios.post(route+endpoint,{words:param})
    .then(res =>{
      dispatch(loaderOff());
      dispatch(setComercios(res.data));
    })
    .catch(error =>{
      console.log('comercios',error);
      dispatch(loaderOff());
    })
  }
);

