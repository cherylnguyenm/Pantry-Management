import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3VBUg0tzfmfLFZGUjyySHtVk6ThpEqUw",
  authDomain: "pantry-management-2c05c.firebaseapp.com",
  projectId: "pantry-management-2c05c",
  storageBucket: "pantry-management-2c05c.appspot.com",
  messagingSenderId: "742618239251",
  appId: "1:742618239251:web:e32571b2047dcc1d018ae6"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
