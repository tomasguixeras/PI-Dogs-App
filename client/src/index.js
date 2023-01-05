import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './Redux/Store'
import { Provider } from 'react-redux'
import axios from 'axios'
import dotenv from "dotenv";
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
