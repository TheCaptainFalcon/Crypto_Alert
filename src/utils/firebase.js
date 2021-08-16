import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import { fbKey } from '../config/firebaseKeys';

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

export default firebase;