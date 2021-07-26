import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import Nav from './components/Nav';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import { fbKey } from './config/firebaseKeys';


ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <App />
  </StrictMode>,
  document.getElementById('root')
);


const firebaseConfig = {
  apiKey: fbKey.API_KEY,
  authDomain: fbKey.PROJECT_ID + '.firebaseapp.com',
  databaseURL: "https://" + fbKey.PROJECT_ID + '.firebaseio.com',
  projectId: fbKey.PROJECT_ID,
  storageBucket: fbKey.PROJECT_ID + '.appspot.com',
  messagingSenderId: fbKey.SENDER_ID,
  appId: fbKey.APP_ID,
  measurementId: "G-" + fbKey.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
