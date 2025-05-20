import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig.js";
const app = initializeApp(firebaseConfig);

export async function getCoffee() {
  try {
    const response = await fetch("http://localhost:3001/coffee");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
