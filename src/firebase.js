import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getAuth,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXtzs8ekLHYU9VwfCXTPf6o2pfo-xMozQ",
  authDomain: "todo-246fd.firebaseapp.com",
  projectId: "todo-246fd",
  storageBucket: "todo-246fd.appspot.com",
  messagingSenderId: "630832577959",
  appId: "1:630832577959:web:6959640028e2016044ca82",
  measurementId: "G-4N3Z35KXR5"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const initializeUserData = async (uid) => {
  const newDocRef = doc(db, "Users", uid);
  await setDoc(newDocRef, {
    tasks: [
      {
        title: "Add a new task",
        date: new Date,
      }
    ]
  });
}

const getUserData = async (uid) => {
  const docRef = doc(db, "Users", uid);
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()) {
    return docSnap.data();
  } else {
    initializeUserData(uid);
    getUserData(uid);
  }
}

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithRedirect(auth, provider);
    const { user } = result;
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const signOutUser = () => {
  signOut(auth);
}

export {
  firebaseApp,
  db,
  auth,
  signInWithGoogle,
  signOutUser,
  getUserData,
};
