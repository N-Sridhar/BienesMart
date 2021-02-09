import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDmD46hdku5pfhS0KRNGCDWhpKO547neME',
  authDomain: 'bienesmart.in',
  databaseURL: 'https://bienes-mart.firebaseio.com',
  projectId: 'bienes-mart',
  storageBucket: 'bienes-mart.appspot.com',
  messagingSenderId: '511210839316',
  appId: '1:511210839316:web:cc303acd22b26420a33601',
  measurementId: 'G-VM6QFLL1ZX',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const cCustomers = 'customers';
const cProducts = 'products';
const fieldValue = firebase.firestore.FieldValue;
const storage = firebase.storage();
const ga = firebase.analytics();
const auth = firebase.auth();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

export {cCustomers, cProducts, fieldValue, storage, ga, auth, providerGoogle};
export default db;
