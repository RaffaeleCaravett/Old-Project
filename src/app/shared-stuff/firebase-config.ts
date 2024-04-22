import firebase from 'firebase/app';
import 'firebase/storage';

export const firebaseConfig ={
  apiKey: 'AIzaSyDjt9NYA0d0nc7cRQZ29kcBlsFeM3trwfQ',
  authDomain: 'nuovoprogetto-fe8d2.firebaseapp.com',
  projectId: 'nuovoprogetto-fe8d2',
  storageBucket: 'nuovoprogetto-fe8d2.appspot.com',
  appId: '1:937333261948:web:2b057b8de21351cb2a6bf9'
  }
  export const firebaseApp = firebase.initializeApp(firebaseConfig);
