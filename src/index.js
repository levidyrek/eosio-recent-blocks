import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { polyfill } from 'es6-promise';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Polyfill ES6 Promise
polyfill();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
