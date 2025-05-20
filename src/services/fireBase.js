import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  remove,
} from "firebase/database";
import { firebaseConfig } from "../firebaseConfig.js";
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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

export function setUser(data) {
  const dataRef = ref(database, "/user");
  const refKey = push(dataRef).key;
  return push(dataRef, { ...data, key: refKey });
}
