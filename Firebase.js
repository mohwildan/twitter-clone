import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAks2UzfHBNk11jzzyAhP3L78qYs8p4Mkc",
  authDomain: "twitter-2776b.firebaseapp.com",
  projectId: "twitter-2776b",
  storageBucket: "twitter-2776b.appspot.com",
  messagingSenderId: "316303402334",
  appId: "1:316303402334:web:85cd2c275623657225dbcf",
};

const app = !getApps().length ? initializeApp(firebaseConfig): getApp()
const db = getFirestore(app)
const storage = getStorage(app)


export {db, storage, app}
