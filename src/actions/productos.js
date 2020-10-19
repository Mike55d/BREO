import Axios from 'axios';
import {routePanel} from './routePanel';
import {loaderOn,loaderOff} from './loader';
import {refreshOn,refreshOff} from './refresh';
import {ToastAndroid} from 'react-native';

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
    Axios.post(routePanel+endpoint,{words:palabras})
    .then(res =>{
      dispatch(loadOff());
      if(!res.data.length){
        ToastAndroid.show('No existen productos disponibles',ToastAndroid.SHORT);
      }
      dispatch(setProductos(res.data));
    })
    .catch(error =>{
      console.log('productos',error);
      dispatch(loadOff());
    })
  }
);

