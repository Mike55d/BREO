import React from 'react';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import Navigation from './src/Navigation/Navigation';
import {createStore , applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reducers from './src/reducers';

let store = createStore(Reducers,composeWithDevTools(applyMiddleware(thunk)));

export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}
