import Axios from 'axios';
import {route} from './routePanel';
import {loaderOn,loaderOff} from './loader';

const setProductos = (payload) =>({
  type:'SET_PRODUCTOS',
  payload:payload
})

export const getProductos = (comercio,palabras) =>(
  (dispatch) =>{
    const endpoint = palabras ? `productos/${comercio}/search` : `productos/${comercio}/all`;
    dispatch(loaderOn());
    Axios.post(route+endpoint,{words:palabras})
    .then(res =>{
      dispatch(loaderOff());
      dispatch(setProductos(res.data));
    })
    .catch(error =>{
      console.log('productos',error);
      dispatch(loaderOff());
    })
  }
);

