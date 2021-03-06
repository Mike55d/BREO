import { combineReducers } from 'redux'
import auth from './auth';
import loader from './loader';
import rubros from './rubros';
import comercios from './comercios';
import productos from './productos';
import direccion from './direccion';
import refresh from './refresh';

export default combineReducers({
  auth,
  loader,
  rubros,
  comercios,
  productos,
  direccion,
  refresh,
})