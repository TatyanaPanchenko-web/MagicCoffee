import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig.js";
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  remove,
  set,
} from "firebase/database";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const auth = getAuth(app);

export function getData(path) {
  const dataRef = ref(database, "/" + path);
  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => reject(error)
    );
  });
}

export function setUser(data, uid) {
  const dataRef = ref(database, `/user/${uid}`);
  return set(dataRef, {
    name: data.name,
    phone: data.phone,
    email: data.mail,
  });
  // const refKey = push(dataRef).key;
  // push(dataRef, { ...data, key: refKey });
}
