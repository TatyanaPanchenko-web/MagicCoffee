import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig.js";
import { getDatabase, ref, onValue, update, set } from "firebase/database";
import { UserType } from "@/types.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const auth = getAuth(app);

export function getDataFromBD<T>(path: string): Promise<T> {
  const dataRef = ref(database, "/" + path);
  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => reject(error),
    );
  });
}

export function setUserDataBase(data: UserType, uid: string) {
  const dataRef = ref(database, `/user/${uid}`);
  return set(dataRef, {
    name: data.name,
    password: data.password,
    email: data.email,
    phone: data.phone,
  });
}

export function editUserDataBase(place: string, info: string, uid: string) {
  const dataRef = ref(database, `/user/${uid}`);
  return update(dataRef, {
    [place]: info,
  });
}
