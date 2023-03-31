import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  User,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import store from '../store/store';
import { getData } from '../store/user/userSlice';
import { Bookmark, History, User as UserApp } from './types';

const firebaseConfig = {
  apiKey: 'AIzaSyCFeiNeyeqG7c57QQe6T8FeLIxDVsYOWEo',
  authDomain: 'the-act-movie.firebaseapp.com',
  projectId: 'the-act-movie',
  storageBucket: 'the-act-movie.appspot.com',
  messagingSenderId: '263723469772',
  appId: '1:263723469772:web:f44f0f383d01c205c6eb69',
  measurementId: 'G-R06GY06HM3',
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});
fbProvider.setCustomParameters({
  display: 'popup',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithFacebookPopup = () => {
  signInWithPopup(auth, fbProvider);
};

export const db = getFirestore();

type UserData = {
  createAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (userAuth: User) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const bookmarks = [] as Bookmark[];
    const history = [] as History[];

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        bookmarks,
        history,
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userSnapshot.data() as UserApp;
};

export const signOutUser = async (): Promise<void> => await signOut(auth);

export const updateUserBookmarkDocument = async (
  uid: string,
  data: Bookmark[]
) => {
  const docRef = doc(db, 'users', uid);

  try {
    await updateDoc(docRef, { bookmarks: data });
    store.dispatch(getData(uid));
  } catch (error) {
    console.log('error updating the user', error);
  }
};

export const updateUserHistoryDocument = async (
  uid: string,
  data: History[]
) => {
  const docRef = doc(db, 'users', uid);

  try {
    await updateDoc(docRef, { history: data });
    store.dispatch(getData(uid));
  } catch (error) {
    console.log('error updating the user', error);
  }
};

export const getUserData = async (uid: string) => {
  // const q = query(collection(db, 'users'), where('uid', '==', uid));
  const docRef = doc(db, 'users', uid);

  try {
    const querySnapshot = await getDoc(docRef);

    return querySnapshot.data() as UserApp;
  } catch (error) {
    console.error('Error getting user data:', error);
  }
};
