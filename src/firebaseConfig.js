// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { doc, setDoc, getDoc } from 'firebase/firestore';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // eslint-disable-next-line
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import moment from 'moment';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

const provider = new GoogleAuthProvider();

export const signInWithGooglePopUp = async () => {
  const registeredDateByUserLocalTime = new Date();
  const { user } = await signInWithPopup(auth, provider);

  return user;
};

export const replaceToDoWithNewToDo = async (newToDos, uid) => {
  await setDoc(
    doc(db, 'toDos', uid),
    {
      todo: newToDos,
      uid,
    },
    { merge: true }
  );
};

export const addToDo = async (todo, uid, timestamp, storeToDos) => {
  const newToDos = [{ todo: todo, status: true, timestamp }];
  if (storeToDos.length !== 0) {
    newToDos.push(...storeToDos);
  }
  try {
    await setDoc(
      doc(db, 'toDos', uid),
      {
        todo: newToDos,
        uid,
      },
      { merge: true }
    );
    getToDos(uid);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getToDos = async (uid) => {
  try {
    const docRef = doc(db, 'toDos', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.get) {
      const data = docSnap.data();
      console.log('get toDos Successful!');
      return data;
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  } catch (error) {
    const data = undefined;
    console.log('failed to get toDos');
    return data;
  }
};

export const logout = async () => {
  signOut(auth);
  toast.success('Logged Out');
};

export const register = async (email, password) => {
  const registeredDateByUserLocalTime = new Date();
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, 'toDos', user.uid), {
      todo: [],
      uid: user.uid,
      registeredDateByUserLocalTime: moment(
        registeredDateByUserLocalTime
      ).format('YYYY-MM-DD-HH-mm-ss'),
    });
    return user;
  } catch (error) {
    switch (error.code) {
      case 'auth/weak-password':
        toast.error('Weak Password');
        break;
      case 'auth/email-already-in-use':
        toast.error('Mail in Use');
        break;

      default:
        break;
    }
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    switch (error.code) {
      case 'auth/wrong-password':
        toast.error('Wrong Password');
        break;
      case 'auth/too-many-requests':
        toast.error('Too Many Request');
        break;
      case 'auth/user-not-found':
        toast.error('User Not Found');
        break;

      default:
        toast.error('Something vent wrong');
        break;
    }
  }
};
