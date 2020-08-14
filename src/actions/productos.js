import Axios from 'axios';
import {route} from './routePanel';
import {loaderOn,loaderOff} from './loader';
import {refreshOn,refreshOff} from './refresh';

const setProductos = (payload) =>({
  type:'SET_PRODUCTOS',
  payload:payload
})

export const getProductos = (comercio,palabras,refresh = false) =>(
  (dispatch) =>{
    const loadOn = refresh ? refreshOn : loaderOn;
    const loadOff = refresh ? refreshOff : loaderOff;
    const endpoint = palabras ? `productos/${comercio}/search` : `productos/${comercio}/all`;
    dispatch(loadOn());
    Axios.post(route+endpoint,{words:palabras})
    .then(res =>{
      dispatch(loadOff());
      dispatch(setProductos(res.data));
    })
    .catch(error =>{
      console.log('productos',error);
      dispatch(loadOff());
    })
  }
);

